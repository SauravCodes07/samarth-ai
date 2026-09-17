"""
OTP Generation and Twilio / Multi-Channel Notification Service
Provides secure 6-digit OTP generation, Twilio SMS/Verify integration,
and failsafe delivery for password resets and identity verification.
"""
import os
import random
import logging
import httpx
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional

logger = logging.getLogger("samarth.otp")

def generate_secure_otp(length: int = 6) -> str:
    """Generate cryptographically secure numeric OTP."""
    digits = "0123456789"
    return "".join(random.SystemRandom().choice(digits) for _ in range(length))

def dispatch_otp_via_twilio(
    recipient_phone: Optional[str], 
    recipient_email: str, 
    otp_code: str,
    recipient_name: Optional[str] = None
) -> Dict[str, Any]:
    """
    Dispatches OTP via Twilio SMS if credentials exist,
    or falls back gracefully to server notification / demo mode.
    """
    account_sid = os.getenv("TWILIO_ACCOUNT_SID", "").strip()
    auth_token = os.getenv("TWILIO_AUTH_TOKEN", "").strip()
    from_number = os.getenv("TWILIO_PHONE_NUMBER", "").strip()

    name_greeting = recipient_name or "Entrepreneur"
    sms_body = f"Samarth AI: Your OTP for password reset is {otp_code}. Valid for 10 mins. Do not share with anyone."

    sent_via_twilio = False
    delivery_channel = "demo_gateway"
    delivery_detail = "Simulated delivery (Twilio credentials not configured in environment)"

    # Check if live Twilio is configured
    if account_sid and auth_token and from_number and recipient_phone:
        # Standardize phone number for India (+91)
        cleaned_phone = "".join(filter(str.isdigit, recipient_phone))
        if len(cleaned_phone) == 10:
            cleaned_phone = "+91" + cleaned_phone
        elif not recipient_phone.startswith("+"):
            cleaned_phone = "+" + cleaned_phone

        try:
            url = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json"
            data = {
                "From": from_number,
                "To": cleaned_phone,
                "Body": sms_body
            }
            # Execute with basic auth
            response = httpx.post(url, data=data, auth=(account_sid, auth_token), timeout=8.0)
            if response.status_code in [200, 201]:
                sent_via_twilio = True
                delivery_channel = "twilio_sms"
                delivery_detail = f"Sent to {cleaned_phone[:4]}***{cleaned_phone[-3:]}"
                logger.info(f"Twilio SMS dispatched successfully to {cleaned_phone}")
            else:
                logger.warning(f"Twilio response status {response.status_code}: {response.text}")
                delivery_detail = f"Twilio attempt logged ({response.status_code})"
        except Exception as e:
            logger.error(f"Failed to dispatch via Twilio: {str(e)}")
            delivery_detail = f"Twilio gateway error: {str(e)}"

    print("\n" + "=" * 60)
    print(f"[SAMARTH AI SECURITY GATEWAY - OTP GENERATED]")
    print(f"User Email   : {recipient_email}")
    print(f"User Phone   : {recipient_phone or 'Not Provided'}")
    print(f"OTP Code     : {otp_code} (Expires in 10 minutes)")
    print(f"Channel      : {delivery_channel} ({delivery_detail})")
    print("=" * 60 + "\n")

    return {
        "success": True,
        "otp_code": otp_code,
        "delivery_channel": delivery_channel,
        "delivery_detail": delivery_detail,
        "sent_via_twilio": sent_via_twilio,
        "expires_in_minutes": 10
    }
