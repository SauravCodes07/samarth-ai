"""
Authentication, User Registration & Password Recovery Routes
Provides enterprise-grade user lifecycle management, database-backed credential verification,
Twilio SMS/OTP generation, and password reset flows.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime, timedelta, timezone
import hashlib
import os
import re

from app.database.db_connection import get_db
from app.models.user_model import User, PasswordResetOTP
from app.services.otp_service import generate_secure_otp, dispatch_otp_via_twilio

router = APIRouter(prefix="/auth", tags=["Authentication & Password Recovery"])

# Fixed salt for demo environments; can be overridden via SECRET_KEY env var
SALT = os.getenv("AUTH_SALT", "SamarthAI_Security_Salt_2026").encode()

def hash_password(password: str) -> str:
    """Deterministic salted SHA-256 password hash."""
    return hashlib.sha256(SALT + password.strip().encode("utf-8")).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against stored hash."""
    return hash_password(plain_password) == hashed_password

# Request Models
class UserRegisterRequest(BaseModel):
    email: str = Field(..., description="Unique email address")
    password: str = Field(..., min_length=6, description="Password (minimum 6 characters)")
    full_name: Optional[str] = Field(None, description="Full name of the user/entrepreneur")
    phone: Optional[str] = Field(None, description="10-digit mobile number")
    state: Optional[str] = Field("Maharashtra", description="State of operation")

class UserLoginRequest(BaseModel):
    email: str = Field(..., description="Registered email address")
    password: str = Field(..., description="User password")

class ForgotPasswordRequest(BaseModel):
    email: str = Field(..., description="Email address to check in database and dispatch OTP to")

class ResetPasswordRequest(BaseModel):
    email: str = Field(..., description="Registered email address")
    otp_code: str = Field(..., min_length=6, max_length=6, description="6-digit OTP code")
    new_password: str = Field(..., min_length=6, description="New password")

@router.post("/register")
def register_user(req: UserRegisterRequest, db: Session = Depends(get_db)):
    """
    Registers a new user in the PostgreSQL / SQLite database.
    Checks for email collision and stores salted hash credentials.
    """
    clean_email = req.email.strip().lower()
    
    # Validate email format
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", clean_email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid email address format (e.g., name@example.com)."
        )
    
    # 1. Check if user already exists
    existing_user = db.query(User).filter(func.lower(User.email) == clean_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please sign in instead."
        )

    # 2. Create User
    new_user = User(
        email=clean_email,
        hashed_password=hash_password(req.password),
        full_name=req.full_name.strip() if req.full_name else clean_email.split('@')[0].capitalize(),
        phone=req.phone.strip() if req.phone else None,
        state=req.state or "Maharashtra",
        role="Beneficiary",
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "status": "success",
        "message": "Account created successfully! Welcome to Samarth AI.",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name,
            "phone": new_user.phone,
            "state": new_user.state,
            "role": new_user.role,
            "user_metadata": {
                "full_name": new_user.full_name,
                "phone": new_user.phone,
                "state": new_user.state
            }
        },
        "access_token": f"samarth_token_{new_user.id}_{int(datetime.now().timestamp())}"
    }

@router.post("/login")
def login_user(req: UserLoginRequest, db: Session = Depends(get_db)):
    """
    Authenticates a user against database records.
    """
    clean_email = req.email.strip().lower()
    user = db.query(User).filter(func.lower(User.email) == clean_email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No account found with this email. Please create a new account."
        )

    if not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Click 'Forgot Password' if you cannot recall it."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive. Please contact system administration."
        )

    return {
        "status": "success",
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "phone": user.phone,
            "state": user.state,
            "role": user.role,
            "user_metadata": {
                "full_name": user.full_name,
                "phone": user.phone,
                "state": user.state
            }
        },
        "access_token": f"samarth_token_{user.id}_{int(datetime.now().timestamp())}"
    }

@router.post("/forgot-password/request-otp")
def request_password_reset_otp(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Step 1 of Password Reset:
    First verifies whether the user is already a registered user in our database.
    If yes, generates a 6-digit OTP and dispatches it via Twilio / communication gateway.
    """
    clean_email = req.email.strip().lower()

    # 1. DATABASE CHECK: Is that person already a registered user?
    user = db.query(User).filter(func.lower(User.email) == clean_email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account is registered with this email address in our database. Please check your email or click 'Sign Up' to create a new account."
        )

    # 2. Invalidate any previously unexpired OTPs for this email
    db.query(PasswordResetOTP).filter(
        func.lower(PasswordResetOTP.email) == clean_email,
        PasswordResetOTP.is_used == False
    ).update({"is_used": True})

    # 3. Generate 6-digit OTP valid for 10 minutes
    otp_code = generate_secure_otp(6)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=10)

    otp_record = PasswordResetOTP(
        email=clean_email,
        otp_code=otp_code,
        expires_at=expires_at,
        is_used=False
    )
    db.add(otp_record)
    db.commit()

    # 4. Dispatch via Twilio / Multi-channel Service
    dispatch_result = dispatch_otp_via_twilio(
        recipient_phone=user.phone,
        recipient_email=clean_email,
        otp_code=otp_code,
        recipient_name=user.full_name
    )

    return {
        "status": "success",
        "message": f"A secure 6-digit verification code has been dispatched to your registered contact.",
        "email": clean_email,
        "phone_masked": f"+91 ***{user.phone[-4:]}" if user.phone and len(user.phone) >= 4 else "Registered Contact",
        "expires_in_minutes": 10,
        "delivery_channel": dispatch_result.get("delivery_channel")
    }

@router.post("/forgot-password/verify-reset")
def verify_and_reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Step 2 of Password Reset:
    Validates the 6-digit OTP against database records and updates the user's password.
    Strictly rejects any random, guessed, or mismatched OTP.
    """
    clean_email = req.email.strip().lower()
    clean_otp = req.otp_code.strip()

    # 1. Fetch user
    user = db.query(User).filter(func.lower(User.email) == clean_email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User account not found."
        )

    # 2. Check for matching active OTP in database
    otp_record = db.query(PasswordResetOTP).filter(
        func.lower(PasswordResetOTP.email) == clean_email,
        PasswordResetOTP.otp_code == clean_otp,
        PasswordResetOTP.is_used == False
    ).order_by(PasswordResetOTP.created_at.desc()).first()

    if not otp_record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect OTP code. Random or unverified codes are strictly rejected. Please enter the exact 6-digit code sent to your registered contact."
        )

    # Check expiration (ensure UTC aware)
    now_utc = datetime.now(timezone.utc)
    record_expires = otp_record.expires_at
    if record_expires.tzinfo is None:
        record_expires = record_expires.replace(tzinfo=timezone.utc)

    if now_utc > record_expires:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The verification OTP has expired. Please request a new OTP."
        )

    # 3. Mark OTP as used and update user's password
    otp_record.is_used = True
    user.hashed_password = hash_password(req.new_password)
    user.updated_at = now_utc
    db.commit()

    return {
        "status": "success",
        "message": "Password reset successfully! You can now log in with your new password.",
        "email": clean_email
    }
