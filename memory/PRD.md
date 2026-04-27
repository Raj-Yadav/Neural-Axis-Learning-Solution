# Neural Axis - B2B Tech Education Platform PRD

## Original Problem Statement
B2B-focused website for Neural Axis, an advanced tech education institute targeting University Deans, HODs, and TPOs for curriculum upgrades and institutional partnerships.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI + Framer Motion
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Auth**: JWT with httpOnly cookies, admin seeding
- **Design**: Cabinet Grotesk + IBM Plex Sans fonts, pastel palette (mint, blue, sand)

## User Personas
1. **University Dean** - Strategic decision-maker evaluating AI curriculum partnerships
2. **HOD** - Department head looking to upskill faculty and modernize curriculum
3. **TPO** - Training & Placement Officer seeking student bootcamps for placement readiness
4. **Admin** - Neural Axis team managing incoming leads

## Core Requirements
- Public marketing website with 5 sections (Hero, Technologies, Solutions, Track Record, Contact)
- Lead generation contact form with role-based fields + calendar date picker
- Admin dashboard for lead management with stats, filtering, status updates
- Email notification on new leads (Resend - ready when key provided)
- Google Calendar booking integration (ready when credentials provided)

## What's Been Implemented (April 27, 2026)
- Full marketing website with all 5 sections + footer
- Contact form with Name, Role (Select), Institution, Email, Phone, Date (Calendar), Message
- Backend CRUD API for leads (create, list, stats, update, delete, filter)
- JWT-based admin authentication with cookie-based sessions
- Admin dashboard with lead table, stats cards, status filters, detail dialog, notes
- Admin seeding on startup
- Email notification stub (Resend integration ready, needs API key)

## Prioritized Backlog
### P0 (Critical - Done)
- [x] Marketing website with all sections
- [x] Contact form lead submission
- [x] Admin login + dashboard
- [x] Lead CRUD operations

### P1 (High Priority)
- [ ] Resend email notifications (needs RESEND_API_KEY)
- [ ] Google Calendar booking integration (needs OAuth credentials)

### P2 (Nice to Have)
- [ ] Lead export (CSV download)
- [ ] Email templates customization
- [ ] Analytics dashboard with conversion metrics
- [ ] Multi-admin support with roles

## Next Tasks
1. Add Resend API key for email notifications
2. Set up Google Calendar OAuth for booking
3. Add lead export functionality
4. Enhance admin dashboard with charts/analytics
