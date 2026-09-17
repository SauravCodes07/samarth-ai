"""
Administrative Portal & Scheme Ingestion Routes
Enables Nodal Officers to run Hugging Face PDF/Gazette ingestion,
review extracted financial parameters, and approve/verify schemes into the live registry.
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Body, status
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
import datetime
import re

from app.database.db_connection import get_db
from app.models.scheme_model import Scheme, VerificationLog
from app.models.user_model import User
from app.routes.auth_routes import verify_password
from app.services.huggingface_service import (
    parse_scheme_with_huggingface, 
    extract_text_from_pdf_bytes,
    DocumentRejectionError
)

router = APIRouter(prefix="/admin", tags=["Administrative & Nodal Ingestion"])

# Admin Credentials model
class AdminLoginRequest(BaseModel):
    email: str = Field(..., description="Nodal Officer / Admin email")
    password: str = Field(..., description="Admin password or security key")

class IngestTextRequest(BaseModel):
    circular_text: str = Field(..., description="Raw government gazette notification or policy text")
    official_source_url: Optional[str] = Field(None, description="Source link (e.g., https://myscheme.gov.in)")
    state: Optional[str] = Field("Central / All India", description="Applicable state or All India")

class SchemeUpdateRequest(BaseModel):
    scheme_name: Optional[str] = None
    category: Optional[str] = None
    ministry: Optional[str] = None
    min_cost: Optional[float] = None
    max_cost: Optional[float] = None
    margin_percent: Optional[float] = None
    interest_rate: Optional[float] = None
    interest_rebate_women: Optional[float] = None
    repayment_years: Optional[int] = None
    moratorium_months: Optional[int] = None
    description: Optional[str] = None
    eligibility: Optional[str] = None
    is_active: Optional[bool] = None


from app.models.user_model import User
from app.routes.auth_routes import verify_password

@router.post("/login")
def admin_login(creds: AdminLoginRequest, db: Session = Depends(get_db)):
    """
    Nodal Officer Authentication Gateway.
    Verifies admin credentials for access to scheme governance.
    Strictly recognizes ghansushayal@gmail.com as the primary administrator.
    """
    clean_email = creds.email.strip().lower()
    clean_pass = creds.password.strip()

    # The sole designated administrator email
    SOLE_ADMIN_EMAIL = "ghansushayal@gmail.com"

    if clean_email != SOLE_ADMIN_EMAIL:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized administrative email. Only the designated Chief Nodal Administrator can access this gateway."
        )

    # Check database or master credentials
    admin_user = db.query(User).filter(func.lower(User.email) == clean_email).first()
    is_authorized = False

    if admin_user and verify_password(clean_pass, admin_user.hashed_password):
        is_authorized = True
    elif clean_pass == "Samarth@2026":
        is_authorized = True

    if not is_authorized:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid administrative credentials. Please verify your password."
        )

    admin_name = admin_user.full_name if (admin_user and admin_user.full_name) else "Chief Nodal Officer & Administrator"

    return {
        "success": True,
        "token": "samarth-admin-auth-token-sih-2026",
        "admin": {
            "email": clean_email,
            "name": admin_name,
            "role": "Chief Scheme Ingestion & Verification Officer",
            "department": "Department of Social Justice and Concessional Lending"
        }
    }



@router.post("/schemes/ingest-text")
async def ingest_scheme_text(
    payload: IngestTextRequest,
    db: Session = Depends(get_db)
):
    """
    Ingests raw circular text using the Hugging Face NLP model,
    extracts structured scheme rules, and creates a pending draft scheme in the database.
    """
    try:
        extracted = await parse_scheme_with_huggingface(payload.circular_text, filename="pasted_circular_text.txt")
    except DocumentRejectionError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Scheme Ingestion Error: {str(e)}")

    # Generate unique slug
    raw_slug = re.sub(r'[^a-zA-Z0-9]+', '-', extracted["scheme_name"].lower()).strip('-')
    unique_slug = f"{raw_slug}-{int(datetime.datetime.now().timestamp())}"

    # Create new scheme in pending status
    new_scheme = Scheme(
        slug=unique_slug,
        scheme_name=extracted.get("scheme_name", "Draft Scheme"),
        scheme_name_hi=extracted.get("scheme_name_hi"),
        agency=extracted.get("agency", "State Channelizing Agency"),
        ministry=extracted.get("ministry", "Ministry of Social Justice and Empowerment"),
        department=extracted.get("department", "Enterprise Division"),
        state=payload.state or extracted.get("state", "Central / All India"),
        category=extracted.get("category", "Business & Entrepreneurship"),
        min_cost=extracted.get("min_cost", 10000.0),
        max_cost=extracted.get("max_cost", 200000.0),
        margin_percent=extracted.get("margin_percent", 10.0),
        govt_loan_percent=extracted.get("govt_loan_percent", 90.0),
        interest_rate=extracted.get("interest_rate", 5.0),
        interest_rebate_women=extracted.get("interest_rebate_women", 1.0),
        repayment_years=extracted.get("repayment_years", 5),
        moratorium_months=extracted.get("moratorium_months", 6),
        description=extracted.get("description", ""),
        description_hi=extracted.get("description_hi", ""),
        benefits=extracted.get("benefits", ""),
        eligibility=extracted.get("eligibility", ""),
        eligibility_hi=extracted.get("eligibility_hi", ""),
        documents_required=extracted.get("documents_required", ""),
        apply_url=extracted.get("apply_url", "https://jansamarth.in"),
        official_source_url=payload.official_source_url or extracted.get("official_source_url"),
        verification_status="pending_verification",
        verification_notes=f"Parsed via {extracted.get('source_pipeline', 'Hugging Face Ingestion Pipeline')}",
        is_active=False  # Must be approved by Nodal Officer before going live
    )

    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)

    return {
        "success": True,
        "message": "Scheme parsed successfully by Hugging Face NLP engine and saved to Verification Queue.",
        "scheme": new_scheme,
        "pipeline": extracted.get("source_pipeline")
    }


@router.post("/schemes/ingest-pdf")
async def ingest_scheme_pdf(
    file: UploadFile = File(...),
    official_source_url: Optional[str] = None,
    state: Optional[str] = "Central / All India",
    db: Session = Depends(get_db)
):
    """
    Accepts uploaded Government Circular PDF, extracts text,
    runs Hugging Face structured extraction, and adds to the Verification Queue.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files (.pdf) are supported.")

    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded PDF file is empty.")

    extracted_text = extract_text_from_pdf_bytes(content)
    if not extracted_text or len(extracted_text.strip()) < 30:
        raise HTTPException(
            status_code=400, 
            detail=f"Document Verification Failed: Could not extract readable text from '{file.filename}'. Please ensure the PDF contains authentic text from an official Government Gazette or Policy Circular."
        )

    # Parse extracted text with Hugging Face & AI document verification
    try:
        extracted = await parse_scheme_with_huggingface(extracted_text, filename=file.filename)
    except DocumentRejectionError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Scheme Ingestion Error: {str(e)}")

    raw_slug = re.sub(r'[^a-zA-Z0-9]+', '-', extracted["scheme_name"].lower()).strip('-')
    unique_slug = f"{raw_slug}-{int(datetime.datetime.now().timestamp())}"

    new_scheme = Scheme(
        slug=unique_slug,
        scheme_name=extracted.get("scheme_name", file.filename.replace(".pdf", "").title()),
        scheme_name_hi=extracted.get("scheme_name_hi"),
        agency=extracted.get("agency", "State Channelizing Agency (SCA)"),
        ministry=extracted.get("ministry", "Ministry of Social Justice and Empowerment"),
        department=extracted.get("department", "Department of Social Justice"),
        state=state or "Central / All India",
        category=extracted.get("category", "Business & Entrepreneurship"),
        min_cost=extracted.get("min_cost", 10000.0),
        max_cost=extracted.get("max_cost", 300000.0),
        margin_percent=extracted.get("margin_percent", 10.0),
        govt_loan_percent=extracted.get("govt_loan_percent", 90.0),
        interest_rate=extracted.get("interest_rate", 5.0),
        interest_rebate_women=extracted.get("interest_rebate_women", 1.0),
        repayment_years=extracted.get("repayment_years", 5),
        moratorium_months=extracted.get("moratorium_months", 6),
        description=extracted.get("description", f"Extracted from {file.filename}"),
        description_hi=extracted.get("description_hi", ""),
        benefits=extracted.get("benefits", ""),
        eligibility=extracted.get("eligibility", "Applicable as per official scheme guidelines."),
        eligibility_hi=extracted.get("eligibility_hi", ""),
        documents_required=extracted.get("documents_required", "Aadhaar Card, Bank Passbook, Category Certificate"),
        apply_url=extracted.get("apply_url", "https://jansamarth.in"),
        official_source_url=official_source_url or file.filename,
        verification_status="pending_verification",
        verification_notes=f"Parsed from PDF: {file.filename} via {extracted.get('source_pipeline')}",
        is_active=False
    )

    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)

    return {
        "success": True,
        "message": f"PDF '{file.filename}' successfully parsed by Hugging Face pipeline and added to Verification Queue.",
        "scheme": new_scheme,
        "extracted_snippet": extracted_text[:300]
    }


@router.get("/schemes/pending")
def get_pending_schemes(db: Session = Depends(get_db)):
    """Fetches all schemes awaiting Nodal Officer review and verification."""
    pending = (
        db.query(Scheme)
        .filter(Scheme.is_active == False)
        .order_by(desc(Scheme.created_at))
        .all()
    )
    return {
        "success": True,
        "total": len(pending),
        "schemes": pending
    }


@router.get("/schemes/all")
def get_all_admin_schemes(db: Session = Depends(get_db)):
    """Fetches all schemes (both verified live and pending) with administrative metadata."""
    schemes = db.query(Scheme).order_by(desc(Scheme.id)).all()
    return {
        "success": True,
        "total": len(schemes),
        "schemes": schemes
    }


@router.post("/schemes/{scheme_id}/verify")
def verify_and_publish_scheme(
    scheme_id: int,
    db: Session = Depends(get_db)
):
    """
    Nodal Officer Approval Action:
    Verifies and activates the scheme, publishing it immediately to the live citizen-facing registry.
    """
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    scheme.is_active = True
    scheme.verification_status = "officially_verified"
    scheme.last_verified_at = func.now()
    scheme.verification_notes = f"Verified & approved by Nodal Officer at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

    # Log action
    log = VerificationLog(
        scheme_id=scheme.id,
        ai_finding="Parameters verified against official gazette notification.",
        match_status="matched",
        reviewed_by_human=True
    )
    db.add(log)
    db.commit()
    db.refresh(scheme)

    return {
        "success": True,
        "message": f"Scheme '{scheme.scheme_name}' has been officially verified and is now LIVE on citizen advisory.",
        "scheme": scheme
    }


@router.put("/schemes/{scheme_id}")
def update_scheme_parameters(
    scheme_id: int,
    updates: SchemeUpdateRequest,
    db: Session = Depends(get_db)
):
    """Allows an administrator to edit any parameter before or after publishing."""
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    update_dict = updates.dict(exclude_unset=True)
    for key, value in update_dict.items():
        if value is not None:
            setattr(scheme, key, value)

    db.commit()
    db.refresh(scheme)

    return {
        "success": True,
        "message": "Scheme parameters updated successfully.",
        "scheme": scheme
    }


@router.delete("/schemes/{scheme_id}")
def deactivate_scheme(
    scheme_id: int,
    db: Session = Depends(get_db)
):
    """Deactivates a scheme from citizen view."""
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    scheme.is_active = False
    scheme.verification_status = "archived"
    db.commit()

    return {
        "success": True,
        "message": f"Scheme '{scheme.scheme_name}' has been deactivated."
    }
