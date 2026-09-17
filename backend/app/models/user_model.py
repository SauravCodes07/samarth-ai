from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean
from datetime import datetime, timezone
from app.database.db_connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(200), nullable=True)
    phone = Column(String(20), nullable=True)
    state = Column(String(100), nullable=True)
    role = Column(String(50), default="Beneficiary")  # Beneficiary / Admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class PasswordResetOTP(Base):
    __tablename__ = "password_reset_otps"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), index=True, nullable=False)
    otp_code = Column(String(6), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_used = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class AdvisorySubmission(Base):
    __tablename__ = "advisory_submissions"

    id = Column(Integer, primary_key=True, index=True)
    business_type = Column(String(100), nullable=False)
    business_title = Column(String(200), nullable=True)
    investment_amount = Column(Float, nullable=False)
    state = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    experience_level = Column(String(50), nullable=True) # New / 1-3 years / 3+ years
    gender = Column(String(20), default="General")        # Male / Female / Other
    
    # Matched Results
    matched_scheme_id = Column(Integer, nullable=True)
    margin_money = Column(Float, nullable=True)
    loan_amount = Column(Float, nullable=True)
    interest_rate = Column(Float, nullable=True)
    monthly_emi = Column(Float, nullable=True)
    
    # Generated Narrative
    ai_advisory_text = Column(Text, nullable=True)
    business_viability_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
