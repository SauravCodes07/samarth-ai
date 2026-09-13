import os
import re
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

db_url = settings.DATABASE_URL or ""

# Render & Supabase compatibility: convert postgres:// to postgresql://
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

# Configure connection arguments based on database dialect
connect_args = {}
if db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# Add pool sizing and pre-ping for Supabase / PostgreSQL on Render
engine_kwargs = {
    "connect_args": connect_args,
    "pool_pre_ping": True,
}

if db_url.startswith("postgresql"):
    engine_kwargs["pool_size"] = 10
    engine_kwargs["max_overflow"] = 20
    engine_kwargs["pool_recycle"] = 300

engine = create_engine(db_url, **engine_kwargs)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for yielding database session to route handlers."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
