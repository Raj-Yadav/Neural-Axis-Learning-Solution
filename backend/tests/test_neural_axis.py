"""Neural Axis B2B Website - Backend API Tests"""
import pytest
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

# Load BASE_URL from frontend/.env which contains the public backend URL
load_dotenv(Path(__file__).resolve().parents[2] / "frontend" / ".env")
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
assert BASE_URL, "REACT_APP_BACKEND_URL must be set"

# ========== AUTH TESTS ==========

class TestAuth:
    """Auth endpoint tests"""

    def test_login_success(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "NeuralAxis@2024"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["email"] == "admin@neuralaxis.com"
        assert data["role"] == "admin"
        print("Login success test passed")

    def test_login_sets_cookies(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "NeuralAxis@2024"
        })
        assert resp.status_code == 200
        assert "access_token" in resp.cookies or "Set-Cookie" in resp.headers
        print("Cookie test passed")

    def test_login_invalid_credentials(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "wrongpass"
        })
        assert resp.status_code == 401
        print("Invalid credentials test passed")

    def test_get_me_authenticated(self):
        session = requests.Session()
        session.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "NeuralAxis@2024"
        })
        resp = session.get(f"{BASE_URL}/api/auth/me")
        assert resp.status_code == 200
        data = resp.json()
        assert data["email"] == "admin@neuralaxis.com"
        print("Get me test passed")

    def test_get_me_unauthenticated(self):
        resp = requests.get(f"{BASE_URL}/api/auth/me")
        assert resp.status_code == 401
        print("Unauthenticated test passed")

    def test_logout(self):
        session = requests.Session()
        session.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "NeuralAxis@2024"
        })
        resp = session.post(f"{BASE_URL}/api/auth/logout")
        assert resp.status_code == 200
        print("Logout test passed")

    def test_refresh_token(self):
        """Refresh token should issue new access token via cookie"""
        session = requests.Session()
        session.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "NeuralAxis@2024"
        })
        resp = session.post(f"{BASE_URL}/api/auth/refresh")
        assert resp.status_code == 200, resp.text
        # /me should still work after refresh
        me = session.get(f"{BASE_URL}/api/auth/me")
        assert me.status_code == 200
        print("Refresh token test passed")

    def test_refresh_no_cookie(self):
        resp = requests.post(f"{BASE_URL}/api/auth/refresh")
        assert resp.status_code == 401
        print("Refresh without cookie test passed")


# ========== LEADS TESTS ==========

class TestLeads:
    """Lead CRUD endpoint tests"""

    @pytest.fixture(autouse=True)
    def setup_session(self):
        self.session = requests.Session()
        self.session.post(f"{BASE_URL}/api/auth/login", json={
            "email": "admin@neuralaxis.com",
            "password": "NeuralAxis@2024"
        })

    def test_create_lead_public(self):
        """POST /api/leads - public endpoint, no auth required"""
        resp = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Dean John",
            "role": "Dean",
            "institution": "TEST University",
            "email": "TEST_dean@testuniv.edu",
            "phone": "+1234567890",
            "message": "Interested in partnership",
            "preferred_date": "2026-03-15"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["name"] == "TEST_Dean John"
        assert data["status"] == "new"
        assert "id" in data
        self.__class__.test_lead_id = data["id"]
        print(f"Create lead test passed, id={data['id']}")

    def test_list_leads_authenticated(self):
        resp = self.session.get(f"{BASE_URL}/api/leads")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        print(f"List leads test passed, count={len(data)}")

    def test_list_leads_unauthenticated(self):
        resp = requests.get(f"{BASE_URL}/api/leads")
        assert resp.status_code == 401
        print("Unauthenticated list leads test passed")

    def test_get_lead_stats(self):
        resp = self.session.get(f"{BASE_URL}/api/leads/stats")
        assert resp.status_code == 200
        data = resp.json()
        assert "total" in data
        assert "new" in data
        assert "contacted" in data
        assert "qualified" in data
        assert "closed" in data
        print(f"Lead stats test passed: {data}")

    def test_update_lead_status(self):
        # First create a lead
        create_resp = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Update Lead",
            "role": "HOD",
            "institution": "TEST Update Uni",
            "email": "TEST_update@testuniv.edu"
        })
        lead_id = create_resp.json()["id"]

        # Update it
        resp = self.session.patch(f"{BASE_URL}/api/leads/{lead_id}", json={
            "status": "contacted",
            "notes": "Called on Feb 2026"
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "contacted"
        assert data["notes"] == "Called on Feb 2026"

        # Verify GET
        get_resp = self.session.get(f"{BASE_URL}/api/leads/{lead_id}")
        assert get_resp.status_code == 200
        assert get_resp.json()["status"] == "contacted"
        print("Update lead test passed")

    def test_delete_lead(self):
        # Create lead first
        create_resp = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Delete Lead",
            "role": "TPO",
            "institution": "TEST Delete Uni",
            "email": "TEST_delete@testuniv.edu"
        })
        lead_id = create_resp.json()["id"]

        # Delete it
        resp = self.session.delete(f"{BASE_URL}/api/leads/{lead_id}")
        assert resp.status_code == 200

        # Verify it's gone
        get_resp = self.session.get(f"{BASE_URL}/api/leads/{lead_id}")
        assert get_resp.status_code == 404
        print("Delete lead test passed")

    def test_list_leads_filter_by_status(self):
        resp = self.session.get(f"{BASE_URL}/api/leads?status=new")
        assert resp.status_code == 200
        data = resp.json()
        for lead in data:
            assert lead["status"] == "new"
        print(f"Filter by status test passed, count={len(data)}")

    def test_get_lead_not_found(self):
        resp = self.session.get(f"{BASE_URL}/api/leads/non-existent-id-xyz")
        assert resp.status_code == 404
        print("Lead not found test passed")
