# 🚀 Supabase Complete Setup & Deployment Guide
### Project: **samarth-ai** (`zcbvtrglxlrhgsfgoyuh`)
### Smart India Hackathon 2026 (Problem Statement ID: 26091)

---

## 📌 Project Credentials & Identifiers Summary (Configured & Live)

- **Project Name:** `samarth-ai`
- **Project Reference ID:** `zcbvtrglxlrhgsfgoyuh`
- **Supabase URL:** `https://zcbvtrglxlrhgsfgoyuh.supabase.co`
- **Region:** `Oceania (Sydney)` -> `aws-0-ap-southeast-2`
- **Database Status:** Healthy & All 5 Tables Created (`schemes`, `advisory_inquiries`, `advisory_submissions`, `scheme_reports`, `verification_logs`)

---

## ⚡ 1. Copy-Paste Values for Vercel (Frontend)

In your [Vercel Project Settings](https://vercel.com) ➔ **Environment Variables**:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://sih-rural-advisory-backend.onrender.com/api` | Your deployed FastAPI backend on Render |
| `VITE_SUPABASE_URL` | `https://zcbvtrglxlrhgsfgoyuh.supabase.co` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYnZ0cmdseGxyaGdzZmdveXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMDczNjMsImV4cCI6MjEwNDg4MzM2M30.bKITwGhfHmHGMOwRNUHIXS91yi801MYZIItmVUWRy6U` | Live Supabase `anon` public key |

> *Note: This has also been written directly to your local [`frontend/.env`](file:///c:/Users/saura/Downloads/samarth-ai-main/samarth-ai-main/frontend/.env).*

---

## ☁️ 2. Copy-Paste Values for Render (Backend)

In your [Render Dashboard](https://dashboard.render.com) ➔ Your Web Service ➔ **Environment**:

| Variable Name | Value | Notes |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.zcbvtrglxlrhgsfgoyuh:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?sslmode=require` | Transaction Pooler URL (replace `[YOUR-PASSWORD]`) |
| `PYTHON_VERSION` | `3.11.9` | Ensures clean package builds |
| `GEMINI_API_KEY` | `AIzaSy...` | Your Google Gemini API Key |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Ultra-fast advisory generation |
| `FRONTEND_URL` | `https://<your-vercel-domain>.vercel.app` | Allowed CORS origin |

> ⚠️ **Database Password Tip:**
> In `DATABASE_URL`, replace `[YOUR-PASSWORD]` with the password you set during Supabase project creation.
> If your password contains special characters (e.g. `@`, `#`, `$`, `%`), encode them:
> - `@` ➔ `%40`
> - `#` ➔ `%23`
> - `$` ➔ `%24`
> - `%` ➔ `%25`

---

## 🧪 3. Local Verification

To run a connection check against your Supabase database:
1. Put your `DATABASE_URL` with your password into [`backend/.env`](file:///c:/Users/saura/Downloads/samarth-ai-main/samarth-ai-main/backend/.env):
   ```ini
   DATABASE_URL=postgresql://postgres.zcbvtrglxlrhgsfgoyuh:YourPassword@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?sslmode=require
   ```
2. Run:
   ```bash
   python backend/scripts/test_supabase_connection.py
   ```
3. It will ping Supabase, test authentication, and verify all tables.
