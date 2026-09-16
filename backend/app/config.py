import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend directory
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

class Settings:
    PROJECT_NAME: str = "AI-Driven Rural Business Advisory & Financial Structuring Assistant"
    API_V1_PREFIX: str = "/api"
    
    # Database: Uses SQLite by default for instant local setup, or PostgreSQL via DATABASE_URL
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/rural_advisory.db")
    
    # Groq API Key & Model (Ultra-fast LPU inference with robust sanitization)
    _raw_groq = os.getenv("GROQ_API_KEY", "")
    GROQ_API_KEY: str = ""
    for _token in _raw_groq.strip().split():
        if _token.startswith("gsk_"):
            GROQ_API_KEY = _token.strip()
            break
    if not GROQ_API_KEY:
        GROQ_API_KEY = _raw_groq.strip().splitlines()[0].strip() if _raw_groq.strip() else ""

    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "")
    if not GROQ_MODEL and "qwen" in _raw_groq.lower():
        for _line in _raw_groq.splitlines():
            if "MODEL=" in _line:
                GROQ_MODEL = _line.split("=", 1)[1].strip()
    if not GROQ_MODEL:
        GROQ_MODEL = "qwen/qwen3.8-27b"

    # Gemini API Key & Model
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", os.getenv("GOOGLE_API_KEY", ""))
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    
    # Optional OpenAI fallback
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    
    # Frontend origin for CORS
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "https://samarth-ai-blue.vercel.app")

settings = Settings()
