import pytest
from app.services.loan_calculator import (
    calculate_margin_money,
    calculate_loan_amount,
    calculate_emi,
    structure_loan,
    calculate_project_cost_from_margin
)

def test_calculate_project_cost_from_margin():
    # SIH 2026 Problem example: Available Margin Rs. 1,00,000 at 10% -> Rs. 10,00,000 Project Cost
    cost = calculate_project_cost_from_margin(100000.0, 0.10)
    assert cost == 1000000.0
    # Available Margin Rs. 14,000 -> Rs. 1,40,000 Project Cost
    assert calculate_project_cost_from_margin(14000.0, 0.10) == 140000.0

def test_sih_micro_finance_scheme_routing():
    # Logic A: If Project Cost <= 1.40 Lakh -> Selects Micro Finance Scheme (6.5% interest, 3-yr tenure, 3-month moratorium)
    res = structure_loan(
        total_cost=140000.0,
        margin_percent=10.0,
        interest_rate=6.5,
        tenure_years=3,
        moratorium_months=3
    )
    assert res["scheme_type"] == "Micro Finance Scheme"
    assert res["margin_money"] == 14000.0
    assert res["loan_amount"] == 125000.0 # Capped at maximum 1.25 Lakh
    assert res["effective_interest_rate"] == 6.5
    assert res["tenure_years"] == 3
    assert res["moratorium_months"] == 3
    assert len(res["quarterly_schedule"]) > 0
    # First quarter is in moratorium
    assert res["quarterly_schedule"][0]["is_moratorium"] is True
    assert res["quarterly_schedule"][0]["principal_paid"] == 0.0

def test_sih_term_loan_scheme_routing():
    # Logic B: If Project Cost > 1.40 Lakh and <= 50.00 Lakh -> Selects Term Loan Scheme (8% interest, 7-year tenure, 6-month moratorium)
    # Available Margin: Rs. 1,00,000 -> Rs. 10,00,000 Project Cost, Rs. 9,00,000 Loan
    res = structure_loan(
        total_cost=1000000.0,
        available_margin_capital=100000.0
    )
    assert res["scheme_type"] == "Term Loan Scheme"
    assert res["total_project_cost"] == 1000000.0
    assert res["margin_money"] == 100000.0
    assert res["loan_amount"] == 900000.0
    assert res["nominal_interest_rate"] == 8.0
    assert res["tenure_years"] == 7
    assert res["moratorium_months"] == 6
    assert res["working_capital_required"] == 180000.0
    # Check 6 months moratorium = 2 quarters
    assert res["quarterly_schedule"][0]["is_moratorium"] is True
    assert res["quarterly_schedule"][1]["is_moratorium"] is True
    assert res["quarterly_schedule"][2]["is_moratorium"] is False

def test_calculate_margin_money():
    assert calculate_margin_money(100000.0, 10.0) == 10000.0
    assert calculate_margin_money(140000.0, 5.0) == 7000.0
    assert calculate_margin_money(2000000.0, 15.0) == 300000.0

def test_calculate_loan_amount():
    assert calculate_loan_amount(100000.0, 10000.0) == 90000.0
    assert calculate_loan_amount(140000.0, 7000.0) == 133000.0

def test_calculate_emi():
    emi = calculate_emi(90000.0, 5.0, 3)
    assert 2690 < emi < 2710

def test_structure_loan_with_women_rebate():
    res = structure_loan(
        total_cost=100000.0,
        margin_percent=10.0,
        interest_rate=6.5,
        tenure_years=3,
        moratorium_months=3,
        is_women=True,
        interest_rebate_women=1.0
    )
    assert res["effective_interest_rate"] == 5.5
    assert res["interest_rebate_applied"] == 1.0
