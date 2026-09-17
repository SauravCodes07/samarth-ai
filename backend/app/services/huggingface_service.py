"""
Hugging Face & AI Document Ingestion Service for Government Schemes
Enforces strict document classification & relevance filtering before extraction.
Rejects non-scheme documents (PPTs, slide decks, resumes, academic projects, invoices)
and extracts structured parameters only from authentic Government Gazette & Policy Circulars.
"""
import io
import re
import json
import logging
from typing import Dict, Any, Optional
import httpx
from app.config import settings

logger = logging.getLogger(__name__)

class DocumentRejectionError(Exception):
    """Raised when an uploaded document is verified to be non-relevant or not a government scheme."""
    def __init__(self, message: str, document_type: str = "non_scheme_document", rejection_reason: str = "", confidence: float = 0.95):
        super().__init__(message)
        self.document_type = document_type
        self.rejection_reason = rejection_reason or message
        self.confidence = confidence


def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    """Extracts raw text content from uploaded PDF file bytes using pypdf."""
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(pdf_bytes))
        extracted_text = []
        for idx, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            extracted_text.append(text)
        full_text = "\n".join(extracted_text).strip()
        if full_text:
            return full_text
    except Exception as e:
        logger.warning(f"pypdf extraction error, trying string decoding: {e}")

    try:
        decoded = pdf_bytes.decode('utf-8', errors='ignore')
        clean_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]', ' ', decoded)
        return clean_text[:4000]
    except Exception:
        return ""


def heuristic_relevance_check(text: str, filename: str = "") -> Optional[str]:
    """
    Fast pre-screening heuristic to catch obvious non-scheme uploads like presentations,
    pitch decks, resumes, invoices, and student projects.
    Returns rejection reason if rejected, or None if candidate for deep AI inspection.
    """
    lower_fn = (filename or "").lower()
    lower_text = (text or "").lower()

    # 1. Filename cues
    if any(ext in lower_fn for ext in [".pptx", ".ppt", ".key", "pitch", "deck", "slide", "resume", "cv", "invoice", "receipt", "assignment", "homework", "sih"]):
        if not ("gazette of india" in lower_text or "ministry of" in lower_text or "notification no" in lower_text):
            return f"The uploaded file ('{filename}') is identified as a presentation slide deck or non-scheme document, not an official Government Gazette or Policy Circular."

    # 2. Text cues for slide decks / academic projects
    presentation_cues = ["problem statement", "proposed solution", "team members", "hackathon", "slide 1", "slide 2", "architecture diagram", "future scope", "tech stack", "frontend:", "backend:"]
    found_cues = [c for c in presentation_cues if c in lower_text]
    if len(found_cues) >= 2:
        return f"The document text contains presentation/hackathon indicators ({', '.join(found_cues)}). It does not contain an authentic Government Scheme Gazette or Policy Circular."

    return None


async def classify_and_parse_with_groq(text: str, filename: str = "") -> Dict[str, Any]:
    """
    Executes deep AI document classification and parameter extraction using Groq Cloud LPU.
    Strictly verifies if the document is an official Government Gazette / Scheme Notification.
    """
    if not settings.GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not configured for document classification.")

    prompt = f"""
You are an expert Government of India Document Auditor and Gazette Classifier.
Analyze the following text extracted from an uploaded file ('{filename}').

TASK:
1. CLASSIFY: Determine whether this document is an AUTHENTIC Government Scheme, Gazette Notification, or Policy Circular providing subsidized credit / enterprise loans / beneficiary welfare.
2. REJECT: If this document is a presentation slide deck, hackathon project, resume, academic paper, invoice, code specification, or unrelated document, set "is_official_government_scheme": false and explain why.
3. EXTRACT: If and ONLY IF it IS an authentic government scheme, extract its precise parameters. Do NOT invent numbers that are not in the text.

Extracted Document Text:
\"\"\"{text[:2800]}\"\"\"

Respond STRICTLY in JSON with this exact structure:
{{
  "is_official_government_scheme": true/false,
  "document_type": "official_government_gazette_circular" OR "presentation_slides" OR "academic_project" OR "unrelated_document",
  "confidence_score": 0.95,
  "rejection_reason": null OR "Clear explanation of why this document is rejected",
  "scheme_name": "Official Scheme Name",
  "scheme_name_hi": "हिंदी में योजना का नाम",
  "ministry": "Official Ministry",
  "agency": "Implementing Agency / SCA / DIC",
  "category": "Business & Entrepreneurship" OR "Agriculture,Rural & Environment" OR "Women and Child" OR "Skills & Employment",
  "min_cost": 20000.0,
  "max_cost": 500000.0,
  "margin_percent": 10.0,
  "govt_loan_percent": 90.0,
  "interest_rate": 5.5,
  "interest_rebate_women": 1.0,
  "repayment_years": 5,
  "moratorium_months": 6,
  "description": "2-3 sentence overview of the scheme from the text",
  "description_hi": "योजना का संक्षिप्त विवरण",
  "benefits": "Key financial subsidies and credit concessions",
  "eligibility": "Target group and eligibility conditions",
  "eligibility_hi": "पात्रता शर्तें",
  "documents_required": "Required documents listed in circular",
  "apply_url": "Official portal URL or https://jansamarth.in",
  "official_source_url": "https://myscheme.gov.in"
}}
"""

    payload = {
        "model": settings.GROQ_MODEL or "qwen/qwen3.8-27b",
        "messages": [
            {
                "role": "system", 
                "content": "You are a strict Government Document Verifier. Never classify presentation slides, hackathon projects, resumes, or non-government texts as government schemes."
            },
            {"role": "user", "content": prompt}
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.1
    }

    async with httpx.AsyncClient(timeout=12.0) as client:
        res = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json=payload
        )
        if res.status_code == 200:
            content = res.json()["choices"][0]["message"]["content"]
            parsed = json.loads(content)
            return parsed
        else:
            logger.warning(f"Groq API error {res.status_code}: {res.text}")
            raise RuntimeError(f"Groq API error {res.status_code}")


async def parse_scheme_with_huggingface(text: str, filename: str = "") -> Dict[str, Any]:
    """
    Main orchestration entry point:
    1. Pre-screens text for presentation / non-scheme cues.
    2. Runs Groq LPU classifier & parameter extraction.
    3. If rejected, raises DocumentRejectionError.
    4. If authentic, validates and formats for database ingestion.
    """
    if not text or len(text.strip()) < 30:
        raise DocumentRejectionError(
            message="Provided document or circular text is too short to verify or extract scheme guidelines.",
            document_type="empty_or_too_short",
            rejection_reason="The uploaded file contains insufficient text for verification."
        )

    # 1. Pre-screening heuristic
    pre_rejection = heuristic_relevance_check(text, filename)
    if pre_rejection:
        raise DocumentRejectionError(
            message=pre_rejection,
            document_type="presentation_or_pitch_deck",
            rejection_reason=pre_rejection
        )

    # 2. Deep AI Classification via Groq LPU
    if settings.GROQ_API_KEY:
        try:
            ai_result = await classify_and_parse_with_groq(text, filename)
            
            # Check if AI rejected the document
            if not ai_result.get("is_official_government_scheme", False):
                doc_type = ai_result.get("document_type", "non_scheme_document")
                reason = ai_result.get("rejection_reason") or f"Document is classified as '{doc_type}' and does not contain official Government Scheme guidelines."
                raise DocumentRejectionError(
                    message=f"Document Rejected: {reason}",
                    document_type=doc_type,
                    rejection_reason=reason,
                    confidence=float(ai_result.get("confidence_score", 0.95))
                )

            # Document is authentic government scheme!
            scheme_name = ai_result.get("scheme_name", "").strip()
            if not scheme_name or len(scheme_name) < 3 or "PPTX" in scheme_name.upper():
                raise DocumentRejectionError(
                    message="Document Rejected: No valid Government Scheme name could be identified.",
                    document_type="invalid_scheme_name",
                    rejection_reason="The document does not specify a valid government scheme or program."
                )

            margin = float(ai_result.get("margin_percent", 10.0))
            return {
                "scheme_name": scheme_name,
                "scheme_name_hi": ai_result.get("scheme_name_hi") or f"{scheme_name} (शासकीय योजना)",
                "agency": ai_result.get("agency") or "State Channelizing Agency (SCA) / Nodal DIC",
                "ministry": ai_result.get("ministry") or "Ministry of Micro, Small and Medium Enterprises",
                "department": "Department of Enterprise & Concessional Lending",
                "state": "Central / All India",
                "category": ai_result.get("category") or "Business & Entrepreneurship",
                "min_cost": float(ai_result.get("min_cost", 20000.0)),
                "max_cost": float(ai_result.get("max_cost", 500000.0)),
                "margin_percent": margin,
                "govt_loan_percent": float(ai_result.get("govt_loan_percent", max(50.0, 100.0 - margin))),
                "interest_rate": float(ai_result.get("interest_rate", 5.5)),
                "interest_rebate_women": float(ai_result.get("interest_rebate_women", 1.0)),
                "repayment_years": int(ai_result.get("repayment_years", 5)),
                "moratorium_months": int(ai_result.get("moratorium_months", 6)),
                "description": ai_result.get("description") or text[:280],
                "description_hi": ai_result.get("description_hi") or "शासकीय रियायती ऋण सहायता योजना।",
                "benefits": ai_result.get("benefits") or "Concessional credit and interest subsidy assistance.",
                "eligibility": ai_result.get("eligibility") or "Target beneficiaries adhering to official income and category guidelines.",
                "eligibility_hi": ai_result.get("eligibility_hi") or "सक्षम सरकारी मापदंडों के अंतर्गत आने वाले पात्र उद्यमी।",
                "documents_required": ai_result.get("documents_required") or "Aadhaar Card, Category Certificate, Project Proposal, Bank Passbook",
                "apply_url": ai_result.get("apply_url") or "https://jansamarth.in",
                "official_source_url": ai_result.get("official_source_url") or "https://myscheme.gov.in",
                "source_pipeline": "Hugging Face / Groq LPU Government Gazette NLP Engine"
            }
        except DocumentRejectionError:
            raise
        except Exception as e:
            logger.warning(f"AI classification error: {e}, running strict fallback validator...")

    # 3. Strict Rule-Based Government Header Validation (Safety Fallback)
    lower = text.lower()
    gov_markers = ["government of india", "ministry of", "gazette of india", "policy circular", "scheme guidelines", "kvic", "sidbi", "nabard", "pmegp", "stand-up india", "mudra", "pm vishwakarma"]
    matched_markers = [m for m in gov_markers if m in lower]
    
    if len(matched_markers) < 1:
        raise DocumentRejectionError(
            message=f"Document Verification Failed: The uploaded document does not contain official Government Gazette headers, Ministry circular notations, or statutory credit guidelines.",
            document_type="unverified_non_government_document",
            rejection_reason="No official Government of India ministry, gazette, or scheme indicators were detected in the text."
        )

    name_match = re.search(r'(?:scheme|yojana|initiative|programme)[\s:\-]+([A-Za-z0-9\s\(\)\'\"]{5,60})', text, re.IGNORECASE)
    scheme_name = name_match.group(0).strip().title() if name_match else "Government Concessional Credit Scheme"

    cost_matches = re.findall(r'(?:rs\.?|inr|₹|amount|cost|ceiling|limit|upto|up to)\s*[:\-]?\s*([0-9,]+(?:\.[0-9]+)?)\s*(?:lakh|lac|crore)?', text, re.IGNORECASE)
    max_cost = 500000.0
    for match in cost_matches:
        try:
            val = float(match.replace(',', '').strip())
            if val < 50:
                val = val * 100000
            if val >= 10000:
                max_cost = val
                break
        except Exception:
            continue

    return {
        "scheme_name": scheme_name,
        "scheme_name_hi": f"{scheme_name} (सरकारी योजना)",
        "agency": "State Channelizing Agency (SCA) / Nodal DIC",
        "ministry": "Ministry of Micro, Small and Medium Enterprises",
        "department": "Department of Concessional Lending & Enterprise",
        "state": "Central / All India",
        "category": "Business & Entrepreneurship",
        "min_cost": float(max(10000.0, round(max_cost * 0.05, -2))),
        "max_cost": float(max_cost),
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 5.5,
        "interest_rebate_women": 1.0,
        "repayment_years": 5,
        "moratorium_months": 6,
        "description": text[:280],
        "description_hi": "शासकीय रियायती ऋण सहायता योजना।",
        "benefits": f"Up to 90% government loan assistance with low interest rate.",
        "eligibility": "Target beneficiaries with family income adhering to government criteria.",
        "eligibility_hi": "सक्षम सरकारी मापदंडों के अंतर्गत आने वाले पात्र उद्यमी।",
        "documents_required": "Aadhaar Card, Category Certificate, Project Proposal, Bank Passbook",
        "apply_url": "https://jansamarth.in",
        "official_source_url": "https://myscheme.gov.in",
        "source_pipeline": "Hugging Face Gazette NLP & Rule-Based Ingestion Pipeline"
    }
