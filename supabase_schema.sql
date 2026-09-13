-- ==========================================================
-- SUPABASE POSTGRESQL SCHEMA INITIALIZATION
-- AI-Driven Hyper-Local Business Advisory & Scheme Calculator
-- Smart India Hackathon 2026 (Problem Statement ID: 26091)
-- ==========================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Schemes Table
CREATE TABLE IF NOT EXISTS public.schemes (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    scheme_name TEXT NOT NULL,
    scheme_name_hi TEXT,
    agency TEXT DEFAULT 'Government of India',
    ministry TEXT,
    department TEXT,
    state TEXT DEFAULT 'Central / All India',
    category TEXT DEFAULT 'Business & Entrepreneurship',
    min_cost DOUBLE PRECISION DEFAULT 10000.0,
    max_cost DOUBLE PRECISION DEFAULT 1000000.0,
    margin_percent DOUBLE PRECISION DEFAULT 10.0,
    govt_loan_percent DOUBLE PRECISION DEFAULT 90.0,
    interest_rate DOUBLE PRECISION DEFAULT 5.0,
    interest_rebate_women DOUBLE PRECISION DEFAULT 1.0,
    repayment_years INTEGER DEFAULT 5,
    moratorium_months INTEGER DEFAULT 6,
    description TEXT NOT NULL,
    description_hi TEXT,
    benefits TEXT,
    eligibility TEXT NOT NULL,
    eligibility_hi TEXT,
    documents_required TEXT,
    apply_url TEXT,
    official_source_url TEXT,
    verification_status VARCHAR(30) DEFAULT 'bulk_imported',
    last_verified_at TIMESTAMP WITH TIME ZONE,
    verification_notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Advisory Inquiries Table (Live Supabase Client Logging)
CREATE TABLE IF NOT EXISTS public.advisory_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    business_type VARCHAR(150) NOT NULL,
    business_title TEXT,
    margin_capital DOUBLE PRECISION,
    investment_amount DOUBLE PRECISION NOT NULL,
    loan_amount DOUBLE PRECISION,
    monthly_emi DOUBLE PRECISION,
    state VARCHAR(100),
    district VARCHAR(100),
    experience_level VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Policies: Anyone can view active schemes
CREATE POLICY "Public read active schemes" 
    ON public.schemes 
    FOR SELECT 
    USING (is_active = TRUE);

-- 6. Policies: Anyone or authenticated users can insert into advisory_inquiries
CREATE POLICY "Public insert advisory inquiries" 
    ON public.advisory_inquiries 
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can view their own inquiries" 
    ON public.advisory_inquiries 
    FOR SELECT 
    USING (auth.uid() = user_id OR auth.uid() IS NULL);
