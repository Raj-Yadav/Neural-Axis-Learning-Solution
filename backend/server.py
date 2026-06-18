from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import asyncio

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_ALGORITHM = "HS256"

def get_jwt_secret():
    return os.environ.get("JWT_SECRET", "fallback-secret-change-in-production")

# Password helpers
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# JWT helpers
def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

# Auth dependency
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return {
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user.get("name", ""),
            "role": user.get("role", "")
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Pydantic Models
class LoginRequest(BaseModel):
    email: str
    password: str

class LeadCreate(BaseModel):
    name: str
    role: str
    institution: str
    email: EmailStr
    phone: Optional[str] = None
    message: Optional[str] = None
    preferred_date: Optional[str] = None

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

# Create the app and router
app = FastAPI()
api_router = APIRouter(prefix="/api")

# ========== AUTH ENDPOINTS ==========

@api_router.post("/auth/login")
async def login(request_body: LoginRequest, response: Response):
    email = request_body.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(request_body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)

    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=86400, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")

    return {"id": user_id, "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "")}

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

@api_router.post("/auth/refresh")
async def refresh_token_endpoint(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user_id = str(user["_id"])
        access_token = create_access_token(user_id, user["email"])
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=86400, path="/")
        return {"message": "Token refreshed"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# ========== LEAD ENDPOINTS ==========

@api_router.post("/leads")
async def create_lead(lead: LeadCreate):
    lead_dict = lead.model_dump()
    lead_dict["id"] = str(uuid.uuid4())
    lead_dict["status"] = "new"
    lead_dict["notes"] = ""
    lead_dict["created_at"] = datetime.now(timezone.utc).isoformat()

    await db.leads.insert_one(lead_dict)
    # MongoDB mutates dict and adds _id
    lead_dict.pop("_id", None)

    # Try to send email notification (non-blocking)
    try:
        await send_lead_notification(lead_dict)
    except Exception as e:
        logger.warning(f"Email notification failed: {e}")

    return lead_dict

@api_router.get("/leads")
async def list_leads(request: Request, status: Optional[str] = None):
    await get_current_user(request)
    query = {}
    if status and status != "all":
        query["status"] = status
    leads = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return leads

@api_router.get("/leads/stats")
async def get_lead_stats(request: Request):
    await get_current_user(request)
    total = await db.leads.count_documents({})
    new_count = await db.leads.count_documents({"status": "new"})
    contacted = await db.leads.count_documents({"status": "contacted"})
    qualified = await db.leads.count_documents({"status": "qualified"})
    closed = await db.leads.count_documents({"status": "closed"})

    week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    this_week = await db.leads.count_documents({"created_at": {"$gte": week_ago}})

    return {
        "total": total,
        "new": new_count,
        "contacted": contacted,
        "qualified": qualified,
        "closed": closed,
        "this_week": this_week
    }

@api_router.get("/leads/{lead_id}")
async def get_lead(lead_id: str, request: Request):
    await get_current_user(request)
    lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@api_router.patch("/leads/{lead_id}")
async def update_lead(lead_id: str, update: LeadUpdate, request: Request):
    await get_current_user(request)
    update_dict = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields to update")
    update_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.leads.update_one({"id": lead_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    updated = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    return updated

@api_router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str, request: Request):
    await get_current_user(request)
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}

# ========== EMAIL NOTIFICATION (RESEND - ready when key provided) ==========

async def send_lead_notification(lead: dict):
    resend_key = os.environ.get("RESEND_API_KEY")
    if not resend_key:
        logger.info("RESEND_API_KEY not set, skipping email notification")
        return

    import resend
    resend.api_key = resend_key

    sender_email = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
    notification_email = os.environ.get("NOTIFICATION_EMAIL")

    if not notification_email:
        logger.info("NOTIFICATION_EMAIL not set, skipping email notification")
        return

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B1B3D;">New Lead from Neural Axis Website</h2>
        <hr style="border: 1px solid #EBF7EC;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Name:</td><td style="padding: 8px 0;">{lead['name']}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Role:</td><td style="padding: 8px 0;">{lead['role']}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Institution:</td><td style="padding: 8px 0;">{lead['institution']}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px 0;">{lead['email']}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td><td style="padding: 8px 0;">{lead.get('phone', 'N/A')}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Message:</td><td style="padding: 8px 0;">{lead.get('message', 'N/A')}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Date:</td><td style="padding: 8px 0;">{lead.get('preferred_date', 'N/A')}</td></tr>
        </table>
        <hr style="border: 1px solid #EBF7EC;">
        <p style="color: #475569; font-size: 12px;">Automated notification from Neural Axis Lead Management System.</p>
    </div>
    """

    params = {
        "from": sender_email,
        "to": [notification_email],
        "subject": f"New Lead: {lead['name']} from {lead['institution']}",
        "html": html
    }

    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent for lead {lead['id']}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")

# ========== ADMIN SEEDING ==========

async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@neuralaxis.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "NeuralAxis@2024")

    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hashed,
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info("Admin password updated")

    # Write credentials
    os.makedirs("/app/memory", exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write("# Test Credentials\n\n")
        f.write("## Admin\n")
        f.write(f"- Email: {admin_email}\n")
        f.write(f"- Password: {admin_password}\n")
        f.write("- Role: admin\n\n")
        f.write("## Auth Endpoints\n")
        f.write("- Login: POST /api/auth/login\n")
        f.write("- Logout: POST /api/auth/logout\n")
        f.write("- Me: GET /api/auth/me\n")
        f.write("- Refresh: POST /api/auth/refresh\n\n")
        f.write("## Lead Endpoints\n")
        f.write("- Create Lead: POST /api/leads (public)\n")
        f.write("- List Leads: GET /api/leads (auth required)\n")
        f.write("- Lead Stats: GET /api/leads/stats (auth required)\n")
        f.write("- Update Lead: PATCH /api/leads/{id} (auth required)\n")
        f.write("- Delete Lead: DELETE /api/leads/{id} (auth required)\n")

@app.on_event("startup")
async def startup():
    await seed_admin()
    await db.users.create_index("email", unique=True)
    await db.leads.create_index("created_at")
    await db.leads.create_index("status")
    logger.info("Database indexes created, admin seeded")

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Include the router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
