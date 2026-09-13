"""
Loan Calculator Module
Deterministic financial mathematics for rural micro-entrepreneur credit schemes.
CRITICAL RULE: This module must perform all calculations using exact formulas.
AI/LLM models must NEVER compute or override these values.

Official Scheme Rules (Problem Statement & NSFDC / MoSJE Guidelines):
- Micro Finance Scheme:
    * Total Project Cost <= Rs. 1.40 Lakh (140,000)
    * Agency provides up to 90% (max Rs. 1.25 Lakh)
    * Beneficiary provides margin money (typically 10% or balance)
    * Interest rate: 6.5% per annum
    * Repayment tenure: 3 years (36 months)
    * Moratorium: 3 months
- Term Loan Scheme:
    * Total Project Cost > Rs. 1.40 Lakh and <= Rs. 50.00 Lakh
    * Agency provides up to 90% (maximum Rs. 45.00 Lakh)
    * Beneficiary provides 10% margin money
    * Interest rate: 8.0% per annum
    * Repayment tenure: 7 years (84 months)
    * Moratorium: 6 months
"""

from typing import List, Dict, Any

def calculate_project_cost_from_margin(margin_capital: float, margin_fraction: float = 0.10) -> float:
    """
    Reverse calculate the feasible total project cost from available margin capital.
    Example: Rs. 1,00,000 margin at 10% => Rs. 10,00,000 Project Cost
    """
    if margin_capital <= 0 or margin_fraction <= 0:
        return 0.0
    return round(margin_capital / margin_fraction, 2)


def calculate_margin_money(total_cost: float, margin_percent: float = 10.0) -> float:
    """
    Calculate the upfront contribution required from the entrepreneur.
    Formula: Total Cost * (Margin Percent / 100)
    """
    if total_cost <= 0 or margin_percent < 0:
        return 0.0
    return round(total_cost * (margin_percent / 100.0), 2)


def calculate_loan_amount(total_cost: float, margin_money: float, max_loan_cap: float = None) -> float:
    """
    Calculate the concessional loan amount provided by the government/agency.
    Formula: Total Cost - Margin Money (capped if scheme limit applies)
    """
    if total_cost <= 0:
        return 0.0
    loan = max(0.0, round(total_cost - margin_money, 2))
    if max_loan_cap is not None and max_loan_cap > 0:
        loan = min(loan, max_loan_cap)
    return round(loan, 2)


def calculate_emi(loan_amount: float, annual_interest_rate: float, tenure_years: int) -> float:
    """
    Calculate monthly Equated Monthly Installment (EMI) using the standard reducing balance method.
    Formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    """
    if loan_amount <= 0 or tenure_years <= 0:
        return 0.0
    
    total_months = tenure_years * 12
    if annual_interest_rate <= 0:
        return round(loan_amount / total_months, 2)
    
    monthly_rate = (annual_interest_rate / 100.0) / 12.0
    numerator = loan_amount * monthly_rate * ((1.0 + monthly_rate) ** total_months)
    denominator = ((1.0 + monthly_rate) ** total_months) - 1.0
    
    if denominator == 0:
        return round(loan_amount / total_months, 2)
        
    emi = numerator / denominator
    return round(emi, 2)


def generate_quarterly_schedule(
    loan_amount: float,
    annual_rate: float,
    tenure_years: int,
    moratorium_months: int
) -> List[Dict[str, Any]]:
    """
    Generates an itemized quarterly repayment schedule honoring the moratorium period.
    During moratorium: no principal repayment.
    """
    total_quarters = tenure_years * 4
    moratorium_quarters = max(0, moratorium_months // 3)
    active_quarters = max(1, total_quarters - moratorium_quarters)

    # Quarterly interest rate
    quarterly_rate = (annual_rate / 100.0) / 4.0

    # Calculate quarterly installment after moratorium
    if quarterly_rate > 0:
        num = loan_amount * quarterly_rate * ((1.0 + quarterly_rate) ** active_quarters)
        denom = ((1.0 + quarterly_rate) ** active_quarters) - 1.0
        quarterly_payment = num / denom if denom != 0 else loan_amount / active_quarters
    else:
        quarterly_payment = loan_amount / active_quarters

    schedule = []
    balance = loan_amount

    # For display, generate first 8 quarters (up to 2 years) or full schedule if small
    max_display_quarters = min(12, total_quarters)

    for q in range(1, max_display_quarters + 1):
        m_start = (q - 1) * 3 + 1
        m_end = q * 3
        months_label = f"Month {m_start}-{m_end}"

        if q <= moratorium_quarters:
            # Moratorium quarter: zero principal payment, minimal simple interest accrued/waived per guideline
            interest_due = round(balance * quarterly_rate, 2)
            schedule.append({
                "quarter": q,
                "months_label": f"{months_label} (Moratorium)",
                "principal_paid": 0.0,
                "interest_paid": interest_due,
                "installment_amount": 0.0, # Zero installment during moratorium
                "remaining_balance": round(balance, 2),
                "is_moratorium": True
            })
        else:
            interest_paid = round(balance * quarterly_rate, 2)
            principal_paid = min(balance, round(quarterly_payment - interest_paid, 2))
            installment = round(principal_paid + interest_paid, 2)
            balance = max(0.0, round(balance - principal_paid, 2))

            schedule.append({
                "quarter": q,
                "months_label": months_label,
                "principal_paid": principal_paid,
                "interest_paid": interest_paid,
                "installment_amount": installment,
                "remaining_balance": balance,
                "is_moratorium": False
            })

    return schedule


def structure_loan(
    total_cost: float,
    margin_percent: float = 10.0,
    interest_rate: float = 8.0,
    tenure_years: int = 7,
    moratorium_months: int = 6,
    is_women: bool = False,
    interest_rebate_women: float = 1.0,
    available_margin_capital: float = None
) -> dict:
    """
    Computes deterministic financial structuring and scheme routing.
    Matches Scheme Logic A vs Logic B:
    - Logic A: Project Cost <= 1.40 Lakh => Micro Finance Scheme (6.5% interest, 3-yr tenure, 3-month moratorium)
    - Logic B: Project Cost > 1.40 Lakh and <= 50.00 Lakh => Term Loan Scheme (8.0% interest, 7-yr tenure, 6-month moratorium)
    """
    # If user provided Available Margin Capital directly, calculate total Project Cost (Available Margin / 10%)
    if available_margin_capital and available_margin_capital > 0:
        total_cost = calculate_project_cost_from_margin(available_margin_capital, 0.10)
        margin_percent = 10.0

    # Auto Scheme Routing based on Project Cost
    if total_cost <= 140000.0:
        scheme_type = "Micro Finance Scheme"
        default_rate = 6.5
        default_tenure = 3
        default_moratorium = 3
        max_agency_loan = 125000.0 # Maximum 1.25 Lakh
    else:
        scheme_type = "Term Loan Scheme"
        default_rate = 8.0
        default_tenure = 7
        default_moratorium = 6
        max_agency_loan = 4500000.0 # Maximum 45.00 Lakh

    # Respect passed rates if scheme-specific from DB, else use canonical problem guidelines
    rate = interest_rate if interest_rate else default_rate
    tenure = tenure_years if tenure_years else default_tenure
    moratorium = moratorium_months if moratorium_months is not None else default_moratorium

    # Women rebate
    effective_interest_rate = rate
    if is_women and interest_rebate_women > 0:
        effective_interest_rate = max(1.0, rate - interest_rebate_women)

    margin_money = calculate_margin_money(total_cost, margin_percent)
    loan_amount = calculate_loan_amount(total_cost, margin_money, max_agency_loan)
    monthly_emi = calculate_emi(loan_amount, effective_interest_rate, tenure)

    # Quarterly repayment estimate
    quarterly_installment = round(monthly_emi * 3, 2)
    total_repayment = round(monthly_emi * tenure * 12, 2)
    total_interest = max(0.0, round(total_repayment - loan_amount, 2))

    # Working capital calculation (typically 15-20% of project cost for rural micro-enterprises)
    working_capital_required = round(total_cost * 0.18, 2)

    # Generate detailed quarterly schedule
    schedule = generate_quarterly_schedule(
        loan_amount=loan_amount,
        annual_rate=effective_interest_rate,
        tenure_years=tenure,
        moratorium_months=moratorium
    )

    return {
        "scheme_type": scheme_type,
        "total_project_cost": round(total_cost, 2),
        "margin_percent": margin_percent,
        "margin_money": margin_money,
        "loan_percent": round(100.0 - margin_percent, 2),
        "loan_amount": loan_amount,
        "nominal_interest_rate": rate,
        "effective_interest_rate": effective_interest_rate,
        "interest_rebate_applied": round(rate - effective_interest_rate, 2),
        "tenure_years": tenure,
        "moratorium_months": moratorium,
        "monthly_emi": monthly_emi,
        "quarterly_installment": quarterly_installment,
        "total_interest": total_interest,
        "total_repayment": total_repayment,
        "working_capital_required": working_capital_required,
        "quarterly_schedule": schedule
    }
