-- ==============================================================================
-- SUPABASE POSTGRESQL PRODUCTION SCHEMA & SEED DATA
-- Project: samarth-ai (Ref: zcbvtrglxlrhgsfgoyuh)
-- AI-Driven Hyper-Local Business Advisory & Scheme Calculator
-- Smart India Hackathon 2026 (Problem Statement ID: 26091)
-- ==============================================================================
-- Instructions:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/zcbvtrglxlrhgsfgoyuh
-- 2. Navigate to "SQL Editor" in the left sidebar
-- 3. Click "New Query", paste this entire script, and click "Run" (Ctrl+Enter)
-- 4. All tables, RLS policies, realtime replication, and authentic seed data will be created!
-- ==============================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ------------------------------------------------------------------------------
-- 2. TABLE: schemes (Master repository of government concessional schemes)
-- ------------------------------------------------------------------------------
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
    verification_status VARCHAR(30) DEFAULT 'officially_verified',
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verification_notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TABLE: advisory_inquiries (Direct Supabase Frontend logging)
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 4. TABLE: advisory_submissions (Backend API submission logs & reports)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.advisory_submissions (
    id SERIAL PRIMARY KEY,
    business_type VARCHAR(100) NOT NULL,
    business_title VARCHAR(200),
    investment_amount DOUBLE PRECISION NOT NULL,
    state VARCHAR(100),
    district VARCHAR(100),
    experience_level VARCHAR(50),
    gender VARCHAR(20) DEFAULT 'General',
    matched_scheme_id INTEGER REFERENCES public.schemes(id) ON DELETE SET NULL,
    margin_money DOUBLE PRECISION,
    loan_amount DOUBLE PRECISION,
    interest_rate DOUBLE PRECISION,
    monthly_emi DOUBLE PRECISION,
    ai_advisory_text TEXT,
    business_viability_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. TABLE: verification_logs (AI audit & scheme verification log)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.verification_logs (
    id SERIAL PRIMARY KEY,
    scheme_id INTEGER REFERENCES public.schemes(id) ON DELETE CASCADE,
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ai_finding TEXT,
    match_status VARCHAR(30),
    old_values JSONB,
    new_values JSONB,
    reviewed_by_human BOOLEAN DEFAULT FALSE
);

-- ------------------------------------------------------------------------------
-- 6. TABLE: scheme_reports (Citizen / User error reporting & scheme updates)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.scheme_reports (
    id SERIAL PRIMARY KEY,
    scheme_id INTEGER REFERENCES public.schemes(id) ON DELETE CASCADE,
    report_text TEXT NOT NULL,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- ------------------------------------------------------------------------------
-- 7. INDEXES (Optimized for fast queries, search, and filtering)
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_schemes_slug ON public.schemes(slug);
CREATE INDEX IF NOT EXISTS idx_schemes_is_active ON public.schemes(is_active);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON public.schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_cost ON public.schemes(min_cost, max_cost);
CREATE INDEX IF NOT EXISTS idx_inquiries_user ON public.advisory_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON public.advisory_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON public.advisory_submissions(created_at DESC);

-- ------------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) CONFIGURATION
-- ------------------------------------------------------------------------------
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_reports ENABLE ROW LEVEL SECURITY;

-- Schemes policies: Anyone can view active schemes, full access for service_role
DROP POLICY IF EXISTS "Public read active schemes" ON public.schemes;
CREATE POLICY "Public read active schemes" 
    ON public.schemes 
    FOR SELECT 
    USING (is_active = TRUE);

DROP POLICY IF EXISTS "Service role full access schemes" ON public.schemes;
CREATE POLICY "Service role full access schemes"
    ON public.schemes
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Advisory inquiries policies: Anyone can insert, users can view own
DROP POLICY IF EXISTS "Public insert advisory inquiries" ON public.advisory_inquiries;
CREATE POLICY "Public insert advisory inquiries" 
    ON public.advisory_inquiries 
    FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own inquiries" ON public.advisory_inquiries;
CREATE POLICY "Users can view their own inquiries" 
    ON public.advisory_inquiries 
    FOR SELECT 
    USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Service role full access inquiries" ON public.advisory_inquiries;
CREATE POLICY "Service role full access inquiries"
    ON public.advisory_inquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Advisory submissions policies
DROP POLICY IF EXISTS "Public insert advisory submissions" ON public.advisory_submissions;
CREATE POLICY "Public insert advisory submissions"
    ON public.advisory_submissions
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public read advisory submissions" ON public.advisory_submissions;
CREATE POLICY "Public read advisory submissions"
    ON public.advisory_submissions
    FOR SELECT
    USING (true);

-- Scheme reports policies
DROP POLICY IF EXISTS "Public insert scheme reports" ON public.scheme_reports;
CREATE POLICY "Public insert scheme reports"
    ON public.scheme_reports
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated read scheme reports" ON public.scheme_reports;
CREATE POLICY "Authenticated read scheme reports"
    ON public.scheme_reports
    FOR SELECT
    TO authenticated, service_role
    USING (true);

-- Verification logs policies
DROP POLICY IF EXISTS "Public read verification logs" ON public.verification_logs;
CREATE POLICY "Public read verification logs"
    ON public.verification_logs
    FOR SELECT
    USING (true);

-- ------------------------------------------------------------------------------
-- 9. ENABLE REALTIME PUBLICATION (Allows live client updates)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
          AND schemaname = 'public' 
          AND tablename = 'advisory_inquiries'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.advisory_inquiries;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
          AND schemaname = 'public' 
          AND tablename = 'schemes'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.schemes;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL; -- Realtime publication already contains tables or managed by Supabase
END $$;

-- ------------------------------------------------------------------------------
-- 10. AUTHENTIC SEED DATA: GOVERNMENT CONCESSIONAL SCHEMES
-- ------------------------------------------------------------------------------
INSERT INTO public.schemes (
    slug, scheme_name, scheme_name_hi, agency, ministry, department, state, 
    category, min_cost, max_cost, margin_percent, govt_loan_percent, interest_rate, 
    interest_rebate_women, repayment_years, moratorium_months, description, description_hi, 
    benefits, eligibility, eligibility_hi, documents_required, apply_url, official_source_url, 
    verification_status, is_active
) VALUES
(
    'micro-finance-scheme-nsfdc',
    'Micro Finance Scheme (MFS)',
    'माइक्रो फाइनेंस योजना (एमएफएस)',
    'NSFDC / State Channelizing Agencies (SCA)',
    'Ministry of Social Justice and Empowerment',
    'Department of Social Justice',
    'Central / All India',
    'Business & Entrepreneurship',
    10000.0,
    140000.0,
    5.0,
    95.0,
    5.0,
    1.0,
    3,
    3,
    'Provides quick concessional micro-credit directly or through Self Help Groups (SHGs) for starting small rural income-generating activities such as dairy, poultry, petty shop, tailoring, or handicrafts.',
    'ग्रामीण उद्यमियों और स्वयं सहायता समूहों (SHG) को डेयरी, छोटी दुकान, सिलाई या हस्तशिल्प जैसे छोटे व्यवसाय शुरू करने के लिए 95% तक रियायती लोन उपलब्ध कराता है।',
    'Up to 95% project cost funded, low 5% interest rate with 1% additional rebate for women, 3 months moratorium.',
    'Rural micro-entrepreneurs belonging to target beneficiary groups with annual family income criteria as per MoSJE/SCA guidelines.',
    'लक्षित वर्ग के ग्रामीण उद्यमी व परिवार जिनकी वार्षिक आय राज्य/केंद्रीय दिशा-निर्देशों के अनुरूप हो।',
    'Aadhaar Card, Caste/Category Certificate, Income Certificate, Bank Account Passbook, Passport Size Photograph',
    'https://nsfdc.nic.in',
    'https://nsfdc.nic.in',
    'officially_verified',
    TRUE
),
(
    'mahila-samriddhi-yojana-msy',
    'Mahila Samriddhi Yojana (MSY)',
    'महिला समृद्धि योजना (एमएसवाई)',
    'NSFDC / MoSJE (Exclusively for Women)',
    'Ministry of Social Justice and Empowerment',
    'Department of Social Justice',
    'Central / All India',
    'Women and Child',
    10000.0,
    140000.0,
    5.0,
    95.0,
    4.0,
    0.0,
    3,
    3,
    'Special exclusive micro-finance scheme for women entrepreneurs and women SHGs with an ultra-low concessional interest rate of 4% per annum to promote financial independence.',
    'महिला उद्यमियों और महिला SHG के लिए विशेष योजना, जिसमें मात्र 4% वार्षिक ब्याज दर पर 95% लोन सहायता दी जाती है।',
    'Lowest interest rate in the country (4% p.a.), 95% government assistance, no collateral needed up to scheme limit.',
    'Exclusively for women beneficiaries and women Self-Help Groups (SHGs).',
    'केवल महिला उद्यमियों और महिला स्वयं सहायता समूहों के लिए मान्य।',
    'Aadhaar Card, Category Certificate, Income Proof, Bank Passbook, SHG Resolution/Recommendation (if group)',
    'https://nsfdc.nic.in',
    'https://nsfdc.nic.in',
    'officially_verified',
    TRUE
),
(
    'laghu-vyavasay-yojana-lvy',
    'Laghu Vyavasay Yojana (LVY)',
    'लघु व्यवसाय योजना (एलवीवाई)',
    'NSFDC / State Channelizing Agencies',
    'Ministry of Social Justice and Empowerment',
    'Department of Social Justice',
    'Central / All India',
    'Business & Entrepreneurship',
    50000.0,
    500000.0,
    10.0,
    90.0,
    6.0,
    1.0,
    5,
    6,
    'Supports small businesses and service setups like grocery stores, mobile/electrical repair workshops, transport vehicles, welding units, and fabrication.',
    'किराना स्टोर, मोबाइल/इलेक्ट्रिकल रिपेयर, ऑटो-ट्रांसपोर्ट, वेल्डिंग एवं सर्विसिंग जैसे छोटे उद्यमों के लिए ₹5 लाख तक का रियायती ऋण।',
    'Loan up to Rs. 5 Lakhs, 90% funding from NSFDC/SCA, flexible 5-year repayment with 6 months initial moratorium.',
    'Eligible target group entrepreneurs with basic vocational skills or trade experience.',
    'उद्यमी जिनके पास संबंधित काम का बुनियादी अनुभव या कौशल हो।',
    'Aadhaar Card, Category Certificate, Income Certificate, Basic Project Quotation/Estimate, Bank Passbook, KYC',
    'https://nsfdc.nic.in',
    'https://nsfdc.nic.in',
    'officially_verified',
    TRUE
),
(
    'term-loan-scheme-tier-1',
    'Term Loan Scheme (TLS) - Tier 1',
    'टर्म लोन योजना - टियर 1',
    'NSFDC / MoSJE',
    'Ministry of Social Justice and Empowerment',
    'Department of Social Justice',
    'Central / All India',
    'Agriculture,Rural & Environment',
    500000.0,
    1500000.0,
    10.0,
    90.0,
    7.0,
    1.0,
    7,
    6,
    'Funding for viable commercial ventures including commercial dairy setups (10-20 cattle), mini flour/oil mills, cold storage transport, and light manufacturing units.',
    'व्यावसायिक डेयरी फार्म, मिनी आटा/तेल मिल, लाइट मैन्युफैक्चरिंग एवं कमर्शियल ट्रांसपोर्ट वाहनों के लिए ₹15 लाख तक का टर्म लोन।',
    'Funding up to Rs. 15 Lakhs at 7% p.a., 90% loan assistance, 7-year repayment period with quarterly schedule.',
    'Target group entrepreneurs with viable business plan and technical feasibility.',
    'व्यवहार्य बिजनेस प्लान और तकनीकी समझ रखने वाले पात्र उद्यमी।',
    'Aadhaar Card, PAN Card, Category Certificate, Detailed Project Report (DPR), Quotations for Machinery, Bank Passbook (6 months)',
    'https://nsfdc.nic.in',
    'https://nsfdc.nic.in',
    'officially_verified',
    TRUE
),
(
    'term-loan-scheme-tier-2',
    'Term Loan Scheme (TLS) - Tier 2 (Major Projects)',
    'टर्म लोन योजना - टियर 2 (बड़ी परियोजनाएं)',
    'NSFDC / MoSJE',
    'Ministry of Social Justice and Empowerment',
    'Department of Social Justice',
    'Central / All India',
    'Business & Entrepreneurship',
    1500000.0,
    5000000.0,
    15.0,
    85.0,
    8.0,
    1.0,
    7,
    9,
    'High-value concessional financing for substantial agro-processing units, warehousing, diagnostic clinics, or large industrial micro-enterprises.',
    'एग्रो-प्रोसेसिंग, वेयरहाउसिंग, डायग्नोस्टिक सेंटर व बड़े सूक्ष्म उद्योगों के विस्तार के लिए ₹50 लाख तक का रियायती ऋण।',
    'Substantial loan support up to Rs. 50 Lakhs at 8% p.a. with 85% concessional debt share.',
    'Experienced entrepreneurs with formal trade registrations and viable business proposals.',
    'अनुभवी उद्यमी जिनके पास वैध पंजीकरण और व्यवहार्य प्रोजेक्ट रिपोर्ट हो।',
    'Aadhaar Card, PAN Card, Category Certificate, Detailed DPR, Land/Rental Agreement, Quotations, Bank Statement (1 year), ITR (if applicable)',
    'https://nsfdc.nic.in',
    'https://nsfdc.nic.in',
    'officially_verified',
    TRUE
),
(
    'green-business-scheme-gbs',
    'Green Business Scheme (GBS)',
    'हरित व्यवसाय योजना (ग्रीन बिजनेस स्कीम)',
    'NSFDC / Renewable Energy Promotion',
    'Ministry of Social Justice and Empowerment',
    'Department of Social Justice',
    'Central / All India',
    'Agriculture,Rural & Environment',
    100000.0,
    3000000.0,
    10.0,
    90.0,
    5.0,
    1.0,
    6,
    6,
    'Promotes eco-friendly and climate-resilient livelihoods: battery operated e-rickshaws, solar rooftop pumps, polyhouse farming, and bio-waste management.',
    'पर्यावरण अनुकूल उद्यम जैसे ई-रिक्शा, सोलर पंप, पॉलीहाउस खेती और बायो-वेस्ट कंपोस्टिंग के लिए मात्र 5% ब्याज पर लोन।',
    'Concessional interest rate of 5% p.a. for green & sustainable technology projects up to Rs. 30 Lakhs.',
    'Individuals or groups engaging in eligible green/renewable micro-business activities.',
    'ग्रीन एनर्जी या पर्यावरण-अनुकूल व्यवसाय शुरू करने वाले पात्र उद्यमी।',
    'Aadhaar Card, Category Certificate, Green Technology Equipment Quotation, Driving License (for E-Rickshaw), Bank Passbook',
    'https://nsfdc.nic.in',
    'https://nsfdc.nic.in',
    'officially_verified',
    TRUE
),
(
    'pm-mudra-yojana-pmmy',
    'Pradhan Mantri MUDRA Yojana (PMMY)',
    'प्रधानमंत्री मुद्रा योजना (पीएमएमवाई)',
    'MUDRA / Department of Financial Services',
    'Ministry of Finance',
    'Department of Financial Services',
    'Central / All India',
    'Banking,Financial Services and Insurance',
    50000.0,
    2000000.0,
    10.0,
    90.0,
    8.5,
    0.5,
    5,
    6,
    'Refinance support to banks/NBFCs for lending to non-corporate, non-farm small/micro enterprises across Shishu (up to Rs. 50k), Kishore (Rs. 50k - 5L), and Tarun (Rs. 5L - 20L) categories.',
    'गैर-कॉर्पोरेट और गैर-कृषि लघु व सूक्ष्म उद्योगों के लिए शिशु, किशोर और तरुण श्रेणी में ₹20 लाख तक का संपार्श्विक-मुक्त (कोलेटरल फ्री) ऋण।',
    'Collateral-free institutional credit, accessible through all commercial, regional rural banks and microfinance institutions.',
    'Any Indian citizen with a viable business plan for income-generating activity in manufacturing, processing, trading, or service sector.',
    'विनिर्माण, प्रसंस्करण, व्यापार या सेवा क्षेत्र में आय सृजन वाली योजना रखने वाला कोई भी भारतीय नागरिक।',
    'Aadhaar Card, Voter ID / PAN, Proof of Residence, Business Enterprise Address & Registration Proof, Bank Statements for 6 months',
    'https://www.mudra.org.in',
    'https://www.mudra.org.in',
    'officially_verified',
    TRUE
),
(
    'pmegp-prime-ministers-employment-generation',
    'Prime Minister Employment Generation Programme (PMEGP)',
    'प्रधानमंत्री रोजगार सृजन कार्यक्रम (पीएमईजीपी)',
    'Khadi and Village Industries Commission (KVIC)',
    'Ministry of Micro, Small and Medium Enterprises',
    'MSME',
    'Central / All India',
    'Business & Entrepreneurship',
    100000.0,
    5000000.0,
    10.0,
    90.0,
    7.5,
    0.5,
    7,
    6,
    'Credit-linked subsidy programme to generate self-employment opportunities through establishment of micro-enterprises in non-farm sector. Subsidies range from 15% to 35% depending on rural/urban location and category.',
    'गैर-कृषि क्षेत्र में सूक्ष्म उद्यमों की स्थापना के माध्यम से स्वरोजगार के अवसर पैदा करने वाला क्रेडिट लिंक्ड सब्सिडी कार्यक्रम। ग्रामीण क्षेत्रों में 25% से 35% तक सब्सिडी।',
    'Direct government capital subsidy of 25% (general) to 35% (special category/women/rural), remaining as low-interest term loan.',
    'Any individual above 18 years of age. For projects above Rs. 10 Lakhs in manufacturing and Rs. 5 Lakhs in service, at least 8th standard pass is required.',
    '18 वर्ष से अधिक आयु का कोई भी व्यक्ति। विनिर्माण में ₹10 लाख और सेवा में ₹5 लाख से अधिक की परियोजना के लिए कम से कम 8वीं पास।',
    'Project Report (DPR), Aadhaar Card, Caste Certificate, Special Category Certificate, Rural Area Certificate, Highest Educational Qualification Certificate',
    'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    'https://msme.gov.in',
    'officially_verified',
    TRUE
),
(
    'stand-up-india-scheme',
    'Stand-Up India Scheme',
    'स्टैंड-अप इंडिया योजना',
    'SIDBI / Department of Financial Services',
    'Ministry of Finance',
    'Department of Financial Services',
    'Central / All India',
    'Social welfare & Empowerment',
    1000000.0,
    10000000.0,
    15.0,
    85.0,
    8.0,
    0.5,
    7,
    18,
    'Facilitates bank loans between Rs. 10 Lakhs and Rs. 1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise in manufacturing, services, or trading.',
    'प्रत्येक बैंक शाखा द्वारा कम से कम एक एससी/एसटी और एक महिला उद्यमी को मैन्युफैक्चरिंग, सर्विस या ट्रेडिंग में ग्रीनफील्ड उद्यम स्थापित करने के लिए ₹10 लाख से ₹1 करोड़ तक का ऋण।',
    'Substantial greenfield enterprise funding up to Rs. 1 Crore with composite loan (term loan and working capital) and up to 18 months moratorium.',
    'SC/ST and/or women entrepreneurs above 18 years of age. Loans under the scheme are available for greenfield projects only.',
    '18 वर्ष से अधिक आयु की महिला या एससी/एसटी उद्यमी जो पहली बार ग्रीनफील्ड उद्यम शुरू कर रहे हों।',
    'Identity Proof, Proof of Residence, SC/ST Certificate (if applicable), Project Profile / DPR, IT Returns for last 3 years (if available), Pollution Clearance (if applicable)',
    'https://www.standupmitra.in',
    'https://www.standupmitra.in',
    'officially_verified',
    TRUE
),
(
    'pmfme-micro-food-processing',
    'PM Formalisation of Micro food processing Enterprises (PMFME)',
    'पीएम सूक्ष्म खाद्य प्रसंस्करण उद्योग उन्नयन योजना (पीएमएफएमई)',
    'Ministry of Food Processing Industries (MoFPI)',
    'Ministry of Food Processing Industries',
    'MoFPI',
    'Central / All India',
    'Agriculture,Rural & Environment',
    100000.0,
    3000000.0,
    10.0,
    90.0,
    7.0,
    0.5,
    5,
    6,
    'Credit-linked capital subsidy at 35% of eligible project cost with a maximum ceiling of Rs. 10 Lakh per unit for upgrading micro food processing units (One District One Product - ODOP focused).',
    'सूक्ष्म खाद्य प्रसंस्करण इकाइयों के उन्नयन हेतु 35% क्रेडिट लिंक्ड सब्सिडी (अधिकतम ₹10 लाख) और वन डिस्ट्रिक्ट वन प्रोडक्ट (ODOP) के तहत सहायता।',
    '35% credit-linked capital subsidy (max Rs. 10 Lakhs), seed capital for SHG members up to Rs. 40,000 per member for working capital.',
    'Existing micro food processing entrepreneurs, FPOs, Self Help Groups, and producer cooperatives.',
    'मौजूदा सूक्ष्म खाद्य प्रसंस्करण उद्यमी, किसान उत्पादक संगठन (FPO), और स्वयं सहायता समूह (SHG)।',
    'Aadhaar, PAN, Electricity Bill of premise, Bank Statement, Existing Food Processing Activity Proof, Quotation for food machinery',
    'https://pmfme.mofpi.gov.in',
    'https://mofpi.gov.in',
    'officially_verified',
    TRUE
)
ON CONFLICT (slug) DO UPDATE SET
    scheme_name = EXCLUDED.scheme_name,
    scheme_name_hi = EXCLUDED.scheme_name_hi,
    agency = EXCLUDED.agency,
    ministry = EXCLUDED.ministry,
    category = EXCLUDED.category,
    min_cost = EXCLUDED.min_cost,
    max_cost = EXCLUDED.max_cost,
    margin_percent = EXCLUDED.margin_percent,
    govt_loan_percent = EXCLUDED.govt_loan_percent,
    interest_rate = EXCLUDED.interest_rate,
    interest_rebate_women = EXCLUDED.interest_rebate_women,
    repayment_years = EXCLUDED.repayment_years,
    moratorium_months = EXCLUDED.moratorium_months,
    description = EXCLUDED.description,
    description_hi = EXCLUDED.description_hi,
    benefits = EXCLUDED.benefits,
    eligibility = EXCLUDED.eligibility,
    eligibility_hi = EXCLUDED.eligibility_hi,
    documents_required = EXCLUDED.documents_required,
    apply_url = EXCLUDED.apply_url,
    official_source_url = EXCLUDED.official_source_url,
    verification_status = EXCLUDED.verification_status,
    is_active = TRUE;

-- ==============================================================================
-- END OF SUPABASE SCHEMA INITIALIZATION SCRIPT
-- ==============================================================================
