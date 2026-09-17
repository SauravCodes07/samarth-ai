"""
Authentic Government Concessional Schemes Seed Data
Sources: NSFDC (National Scheduled Castes Finance & Development Corporation),
Ministry of Social Justice and Empowerment (MoSJE), and National SC/ST Hub Guidelines.
"""

from app.database.db_connection import SessionLocal, engine, Base
from app.models.scheme_model import Scheme, VerificationLog, SchemeReport
from app.models.user_model import AdvisorySubmission, User, PasswordResetOTP


AUTHENTIC_SCHEMES = [
    {
        "scheme_name": "Micro Finance Scheme (MFS)",
        "scheme_name_hi": "माइक्रो फाइनेंस योजना (एमएफएस)",
        "agency": "NSFDC / State Channelizing Agencies (SCA)",
        "category": "Small Business / Dairy / Artisan / Retail",
        "min_cost": 10000.0,
        "max_cost": 140000.0,
        "margin_percent": 5.0,
        "govt_loan_percent": 95.0,
        "interest_rate": 5.0,
        "interest_rebate_women": 1.0,
        "repayment_years": 3,
        "moratorium_months": 3,
        "description": "Provides quick concessional micro-credit directly or through Self Help Groups (SHGs) for starting small rural income-generating activities such as dairy, poultry, petty shop, tailoring, or handicrafts.",
        "description_hi": "ग्रामीण उद्यमियों और स्वयं सहायता समूहों (SHG) को डेयरी, छोटी दुकान, सिलाई या हस्तशिल्प जैसे छोटे व्यवसाय शुरू करने के लिए 95% तक रियायती लोन उपलब्ध कराता है।",
        "eligibility": "Rural micro-entrepreneurs belonging to target beneficiary groups with annual family income criteria as per MoSJE/SCA guidelines.",
        "eligibility_hi": "लक्षित वर्ग के ग्रामीण उद्यमी व परिवार जिनकी वार्षिक आय राज्य/केंद्रीय दिशा-निर्देशों के अनुरूप हो।",
        "documents_required": "Aadhaar Card, Caste/Category Certificate, Income Certificate, Bank Account Passbook, Passport Size Photograph",
        "is_active": True
    },
    {
        "scheme_name": "Mahila Samriddhi Yojana (MSY)",
        "scheme_name_hi": "महिला समृद्धि योजना (एमएसवाई)",
        "agency": "NSFDC / MoSJE (Exclusively for Women)",
        "category": "Women Enterprise / Tailoring / Beauty / Dairy / SHG",
        "min_cost": 10000.0,
        "max_cost": 140000.0,
        "margin_percent": 5.0,
        "govt_loan_percent": 95.0,
        "interest_rate": 4.0,
        "interest_rebate_women": 0.0, # Base rate already discounted to 4%
        "repayment_years": 3,
        "moratorium_months": 3,
        "description": "Special exclusive micro-finance scheme for women entrepreneurs and women SHGs with an ultra-low concessional interest rate of 4% per annum to promote financial independence.",
        "description_hi": "महिला उद्यमियों और महिला SHG के लिए विशेष योजना, जिसमें मात्र 4% वार्षिक ब्याज दर पर 95% लोन सहायता दी जाती है।",
        "eligibility": "Exclusively for women beneficiaries and women Self-Help Groups (SHGs).",
        "eligibility_hi": "केवल महिला उद्यमियों और महिला स्वयं सहायता समूहों के लिए मान्य।",
        "documents_required": "Aadhaar Card, Category Certificate, Income Proof, Bank Passbook, SHG Resolution/Recommendation (if group)",
        "is_active": True
    },
    {
        "scheme_name": "Laghu Vyavasay Yojana (LVY)",
        "scheme_name_hi": "लघु व्यवसाय योजना (एलवीवाई)",
        "agency": "NSFDC / State Channelizing Agencies",
        "category": "Retail / Workshop / Transport / Services",
        "min_cost": 50000.0,
        "max_cost": 500000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 6.0,
        "interest_rebate_women": 1.0,
        "repayment_years": 5,
        "moratorium_months": 6,
        "description": "Supports small businesses and service setups like grocery stores, mobile/electrical repair workshops, transport vehicles, welding units, and fabrication.",
        "description_hi": "किराना स्टोर, मोबाइल/इलेक्ट्रिकल रिपेयर, ऑटो-ट्रांसपोर्ट, वेल्डिंग एवं सर्विसिंग जैसे छोटे उद्यमों के लिए ₹5 लाख तक का रियायती ऋण।",
        "eligibility": "Eligible target group entrepreneurs with basic vocational skills or trade experience.",
        "eligibility_hi": "उद्यमी जिनके पास संबंधित काम का बुनियादी अनुभव या कौशल हो।",
        "documents_required": "Aadhaar Card, Category Certificate, Income Certificate, Basic Project Quotation/Estimate, Bank Passbook, KYC",
        "is_active": True
    },
    {
        "scheme_name": "Term Loan Scheme (TLS) - Tier 1",
        "scheme_name_hi": "टर्म लोन योजना - टियर 1",
        "agency": "NSFDC / MoSJE",
        "category": "Manufacturing / Agri-Processing / Dairy Unit / Transport",
        "min_cost": 500000.0,
        "max_cost": 1500000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 7.0,
        "interest_rebate_women": 1.0,
        "repayment_years": 7,
        "moratorium_months": 6,
        "description": "Funding for viable commercial ventures including commercial dairy setups (10-20 cattle), mini flour/oil mills, cold storage transport, and light manufacturing units.",
        "description_hi": "व्यावसायिक डेयरी फार्म, मिनी आटा/तेल मिल, लाइट मैन्युफैक्चरिंग एवं कमर्शियल ट्रांसपोर्ट वाहनों के लिए ₹15 लाख तक का टर्म लोन।",
        "eligibility": "Target group entrepreneurs with viable business plan and technical feasibility.",
        "eligibility_hi": "व्यवहार्य बिजनेस प्लान और तकनीकी समझ रखने वाले पात्र उद्यमी।",
        "documents_required": "Aadhaar Card, PAN Card, Category Certificate, Detailed Project Report (DPR), Quotations for Machinery, Bank Passbook (6 months)",
        "is_active": True
    },
    {
        "scheme_name": "Term Loan Scheme (TLS) - Tier 2 (Major Projects)",
        "scheme_name_hi": "टर्म लोन योजना - टियर 2 (बड़ी परियोजनाएं)",
        "agency": "NSFDC / MoSJE",
        "category": "Enterprise / Agro-Industry / Logistics / Healthcare Unit",
        "min_cost": 1500000.0,
        "max_cost": 5000000.0,
        "margin_percent": 15.0,
        "govt_loan_percent": 85.0,
        "interest_rate": 8.0,
        "interest_rebate_women": 1.0,
        "repayment_years": 7,
        "moratorium_months": 9,
        "description": "High-value concessional financing for substantial agro-processing units, warehousing, diagnostic clinics, or large industrial micro-enterprises.",
        "description_hi": "एग्रो-प्रोसेसिंग, वेयरहाउसिंग, डायग्नोस्टिक सेंटर व बड़े सूक्ष्म उद्योगों के विस्तार के लिए ₹50 लाख तक का रियायती ऋण।",
        "eligibility": "Experienced entrepreneurs with formal trade registrations and viable business proposals.",
        "eligibility_hi": "अनुभवी उद्यमी जिनके पास वैध पंजीकरण और व्यवहार्य प्रोजेक्ट रिपोर्ट हो।",
        "documents_required": "Aadhaar Card, PAN Card, Category Certificate, Detailed DPR, Land/Rental Agreement, Quotations, Bank Statement (1 year), ITR (if applicable)",
        "is_active": True
    },
    {
        "scheme_name": "Green Business Scheme (GBS)",
        "scheme_name_hi": "हरित व्यवसाय योजना (ग्रीन बिजनेस स्कीम)",
        "agency": "NSFDC / Renewable Energy Promotion",
        "category": "Solar / Bio-Gas / E-Rickshaw / Organic Farming",
        "min_cost": 100000.0,
        "max_cost": 3000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 5.0,
        "interest_rebate_women": 1.0,
        "repayment_years": 6,
        "moratorium_months": 6,
        "description": "Promotes eco-friendly and climate-resilient livelihoods: battery operated e-rickshaws, solar rooftop pumps, polyhouse farming, and bio-waste management.",
        "description_hi": "पर्यावरण अनुकूल उद्यम जैसे ई-रिक्शा, सोलर पंप, पॉलीहाउस खेती और बायो-वेस्ट कंपोस्टिंग के लिए मात्र 5% ब्याज पर लोन।",
        "eligibility": "Individuals or groups engaging in eligible green/renewable micro-business activities.",
        "eligibility_hi": "ग्रीन एनर्जी या पर्यावरण-अनुकूल व्यवसाय शुरू करने वाले पात्र उद्यमी।",
        "documents_required": "Aadhaar Card, Category Certificate, Green Technology Equipment Quotation, Driving License (for E-Rickshaw), Bank Passbook",
        "is_active": True
    },
    {
        "scheme_name": "Stand-Up India Scheme",
        "scheme_name_hi": "स्टैंड-अप इंडिया योजना",
        "agency": "Department of Financial Services (DFS) / SIDBI / Commercial Banks",
        "category": "Greenfield Enterprise / Manufacturing / Services / Agri-Allied",
        "min_cost": 1000000.0,
        "max_cost": 10000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 8.0,
        "interest_rebate_women": 0.5,
        "repayment_years": 7,
        "moratorium_months": 18,
        "description": "Facilitates bank loans between Rs. 10 Lakhs and Rs. 1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
        "description_hi": "अनुसूचित जाति/जनजाति और महिला उद्यमियों को नए विनिर्माण, सेवा या व्यापार उद्यम स्थापित करने हेतु 10 लाख से 1 करोड़ रुपये तक का कंपोजिट बैंक लोन।",
        "eligibility": "SC/ST and/or woman entrepreneurs above 18 years for setting up greenfield enterprises.",
        "eligibility_hi": "18 वर्ष से अधिक आयु की महिला या एससी/एसटी उद्यमी जो पहली बार नया उद्यम शुरू कर रहे हों।",
        "documents_required": "Aadhaar Card, PAN Card, Project Report (DPR), Quotations for Machinery, Bank Statement, Proof of Category/Gender",
        "is_active": True
    },
    {
        "scheme_name": "Prime Minister's Employment Generation Programme (PMEGP)",
        "scheme_name_hi": "प्रधानमंत्री रोजगार सृजन कार्यक्रम (पीएमईजीपी)",
        "agency": "KVIC / KVIB / DIC / Ministry of MSME",
        "category": "Manufacturing / Services / Agro-Processing / Village Industries",
        "min_cost": 100000.0,
        "max_cost": 5000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 8.5,
        "interest_rebate_women": 1.0,
        "repayment_years": 7,
        "moratorium_months": 6,
        "description": "Credit-linked subsidy programme providing 15% to 35% capital margin subsidy for setting up micro-enterprises in manufacturing (up to 50 Lakhs) and service sector (up to 20 Lakhs).",
        "description_hi": "विनिर्माण (50 लाख तक) और सेवा क्षेत्र (20 लाख तक) में सूक्ष्म उद्यमों के लिए 15% से 35% तक सरकारी पूंजीगत सब्सिडी।",
        "eligibility": "Any individual above 18 years; at least 8th standard pass for manufacturing units above 10 Lakhs or service units above 5 Lakhs.",
        "eligibility_hi": "18 वर्ष से अधिक आयु का कोई भी नागरिक; 10 लाख से ऊपर विनिर्माण हेतु 8वीं कक्षा उत्तीर्ण।",
        "documents_required": "Aadhaar Card, Caste/Special Category Certificate, Educational Qualification, Detailed Project Report (DPR), Rural Area Certificate",
        "is_active": True
    },
    {
        "scheme_name": "PM Mudra Yojana - Shishu",
        "scheme_name_hi": "प्रधानमंत्री मुद्रा योजना - शिशु",
        "agency": "MUDRA / Department of Financial Services / Commercial Banks / RRBs",
        "category": "Micro Enterprise / Small Traders / Artisans / Street Vendors",
        "min_cost": 5000.0,
        "max_cost": 50000.0,
        "margin_percent": 0.0,
        "govt_loan_percent": 100.0,
        "interest_rate": 8.0,
        "interest_rebate_women": 0.25,
        "repayment_years": 3,
        "moratorium_months": 3,
        "description": "Zero-margin, collateral-free institutional credit up to Rs. 50,000 for nascent entrepreneurs starting small micro-businesses, local services, or trades.",
        "description_hi": "शुरुआती चरण के छोटे व्यवसायों और कारीगरों के लिए 50,000 रुपये तक का शून्य मार्जिन, बिना किसी गारंटी का लोन।",
        "eligibility": "Small business operators, shopkeepers, fruit/vegetable vendors, artisans, and micro-service providers.",
        "eligibility_hi": "छोटे दुकानदार, फल-सब्जी विक्रेता, कारीगर व सूक्ष्म सेवा प्रदाता।",
        "documents_required": "Aadhaar Card, Proof of Identity, Proof of Residence, Quotation of Machinery/Items to be purchased",
        "is_active": True
    },
    {
        "scheme_name": "PM Mudra Yojana - Kishore",
        "scheme_name_hi": "प्रधानमंत्री मुद्रा योजना - किशोर",
        "agency": "MUDRA / Commercial Banks / Small Finance Banks",
        "category": "Micro Enterprises / Small Workshops / Trading / Service Centers",
        "min_cost": 50001.0,
        "max_cost": 500000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 8.5,
        "interest_rebate_women": 0.25,
        "repayment_years": 5,
        "moratorium_months": 6,
        "description": "Provides working capital and term loans from Rs. 50,000 to Rs. 5,00,000 to established micro units looking to expand inventory, purchase machines, or modernize.",
        "description_hi": "50,000 से 5 लाख रुपये तक का मध्यम स्तर का मुद्रा लोन, मशीनों की खरीद और व्यापार विस्तार हेतु।",
        "eligibility": "Existing micro-enterprises looking to scale operations, acquire equipment, or augment working capital.",
        "eligibility_hi": "कार्यशील पूंजी और उपकरण खरीदकर विस्तार करने वाले स्थापित सूक्ष्म व्यवसायी।",
        "documents_required": "Aadhaar Card, Business PAN, 6-Month Bank Statement, Machinery Quotations, Proof of Existing Establishment",
        "is_active": True
    },
    {
        "scheme_name": "PM Mudra Yojana - Tarun",
        "scheme_name_hi": "प्रधानमंत्री मुद्रा योजना - तरुण",
        "agency": "MUDRA / Commercial Banks / Public Sector Banks",
        "category": "Small Manufacturing / Processing / Food Hubs / Fleet Transport",
        "min_cost": 500001.0,
        "max_cost": 1000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 8.5,
        "interest_rebate_women": 0.25,
        "repayment_years": 5,
        "moratorium_months": 6,
        "description": "Funding for mature micro-enterprises needing loans from Rs. 5 Lakh to Rs. 10 Lakh for plant, machinery, transport vehicles, or industrial setups.",
        "description_hi": "5 लाख से 10 लाख रुपये तक का ऋण विनिर्माण, खाद्य प्रसंस्करण, वाहन बेड़े और औद्योगिक विस्तार के लिए।",
        "eligibility": "Proven micro and small business entrepreneurs with satisfactory track record and credit history.",
        "eligibility_hi": "विस्तार के इच्छुक व्यवसाय जिनका क्रेडिट रिकॉर्ड संतोषजनक हो।",
        "documents_required": "Aadhaar Card, PAN Card, Business Registration/Udyam, 1-Year Bank Statement, Project Report, Quotations",
        "is_active": True
    },
    {
        "scheme_name": "PM Vishwakarma Scheme",
        "scheme_name_hi": "प्रधानमंत्री विश्वकर्मा योजना",
        "agency": "Ministry of MSME / Ministry of Skill Development",
        "category": "Artisans / Craftsmen / 18 Traditional Trades / Tools Support",
        "min_cost": 15000.0,
        "max_cost": 300000.0,
        "margin_percent": 5.0,
        "govt_loan_percent": 95.0,
        "interest_rate": 5.0,
        "interest_rebate_women": 0.0,
        "repayment_years": 3,
        "moratorium_months": 3,
        "description": "Comprehensive support for traditional artisans (carpenters, blacksmiths, potters, cobblers, tailors, etc.) with Rs. 15,000 toolkits incentive and up to Rs. 3 Lakh collateral-free loan at 5% interest.",
        "description_hi": "18 पारंपरिक व्यवसायों (बढ़ई, लोहार, कुम्हार, दर्जी आदि) के कारीगरों को 15,000 रुपये टूलकिट और 3 लाख तक का 5% रियायती लोन।",
        "eligibility": "Traditional artisans practicing one of the 18 family craft trades.",
        "eligibility_hi": "18 चिन्हित पारंपरिक व्यवसायों में हाथों और औजारों से कार्य करने वाले कारीगर।",
        "documents_required": "Aadhaar Card, Mobile Number, Bank Details, Ration Card, Skill Assessment Verification",
        "is_active": True
    },
    {
        "scheme_name": "PM SVANidhi Scheme",
        "scheme_name_hi": "पीएम स्वनिधि योजना",
        "agency": "Ministry of Housing and Urban Affairs / SIDBI",
        "category": "Street Vendors / Hawkers / Mobile Carts / Urban-Periurban Micro",
        "min_cost": 10000.0,
        "max_cost": 50000.0,
        "margin_percent": 0.0,
        "govt_loan_percent": 100.0,
        "interest_rate": 7.0,
        "interest_rebate_women": 7.0, # 7% interest subsidy on prompt repayment
        "repayment_years": 1,
        "moratorium_months": 1,
        "description": "Working capital loan starting from Rs. 10,000 (1st tranche), Rs. 20,000 (2nd tranche), and Rs. 50,000 (3rd tranche) with 7% interest subsidy and cashback on digital transactions.",
        "description_hi": "रेहड़ी-पटरी विक्रेताओं के लिए बिना किसी गारंटी का 10,000 से 50,000 रुपये तक का कार्यशील पूंजी ऋण, समय पर भुगतान पर 7% ब्याज सब्सिडी।",
        "eligibility": "Street vendors vending in urban or peri-urban areas holding Certificate of Vending or Vending ID.",
        "eligibility_hi": "शहरी और अर्ध-शहरी क्षेत्रों में वेंडिंग करने वाले स्ट्रीट वेंडर्स।",
        "documents_required": "Aadhaar Card, Voter ID, Certificate of Vending (CoV) / Letter of Recommendation (LoR), Bank Account",
        "is_active": True
    },
    {
        "scheme_name": "Dairy Entrepreneurship Development Scheme (DEDS)",
        "scheme_name_hi": "डेयरी उद्यमिता विकास योजना (डीईडीएस)",
        "agency": "NABARD / Department of Animal Husbandry & Dairying",
        "category": "Dairy Farming / Milk Processing / Cold Storage / Cattle Shed",
        "min_cost": 140000.0,
        "max_cost": 2500000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 7.0,
        "interest_rebate_women": 0.5,
        "repayment_years": 6,
        "moratorium_months": 6,
        "description": "Assistance for setting up modern 2 to 10 milch animal dairy farms, automated milking machines, bulk milk cooling units, and indigenous dairy product manufacturing.",
        "description_hi": "2 से 10 दुधारू पशुओं की आधुनिक डेयरी, मिल्किंग मशीन और कोल्ड चेन हेतु 25% से 33.33% बैक-एंडेड पूंजीगत सब्सिडी।",
        "eligibility": "Farmers, individual entrepreneurs, NGOs, SHGs, and cooperatives.",
        "eligibility_hi": "किसान, व्यक्तिगत उद्यमी, स्वयं सहायता समूह और दुग्ध सहकारी समितियां।",
        "documents_required": "Aadhaar Card, Land Record/Proof of cattle shed space, Veterinary Health Certificate, DPR, Bank Account",
        "is_active": True
    },
    {
        "scheme_name": "Animal Husbandry Infrastructure Development Fund (AHIDF)",
        "scheme_name_hi": "पशुपालन अवसंरचना विकास निधि (एएचआईडीएफ)",
        "agency": "DAHD / Ministry of Fisheries, Animal Husbandry & Dairying / SIDBI",
        "category": "Agri-Allied / Dairy Processing / Meat Processing / Animal Feed Plant",
        "min_cost": 500000.0,
        "max_cost": 50000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 6.0,
        "interest_rebate_women": 0.5,
        "repayment_years": 8,
        "moratorium_months": 24,
        "description": "Offers 3% interest subvention for 8 years and up to 25% credit guarantee for dairy processing, value addition, and animal feed plants.",
        "description_hi": "डेयरी प्रसंस्करण, मूल्यवर्धन और पशु आहार संयंत्रों हेतु 3% ब्याज सबवेंशन और 8 वर्ष की पुनर्भुगतान अवधि।",
        "eligibility": "Farmer Producer Organizations (FPOs), MSMEs, Section 8 companies, and individual entrepreneurs.",
        "eligibility_hi": "किसान उत्पादक संगठन (FPO), एमएसएमई और व्यक्तिगत उद्यमी।",
        "documents_required": "Detailed Project Report, Udyam Registration, Environmental Clearance (if applicable), Bank Appraisal, Land Documents",
        "is_active": True
    },
    {
        "scheme_name": "PM Formalisation of Micro food processing Enterprises (PMFME)",
        "scheme_name_hi": "पीएम सूक्ष्म खाद्य उद्योग उन्नयन योजना (पीएमएफएमई)",
        "agency": "Ministry of Food Processing Industries (MoFPI) / State Nodal Agencies",
        "category": "Food Processing / Flour Mills / Spice Grinding / Oil Expeller / Pickles",
        "min_cost": 100000.0,
        "max_cost": 3000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 7.5,
        "interest_rebate_women": 1.0,
        "repayment_years": 5,
        "moratorium_months": 6,
        "description": "Provides 35% credit-linked capital subsidy up to Rs. 10 Lakhs for setting up or upgrading micro food processing units under the One District One Product (ODOP) framework.",
        "description_hi": "एक जिला एक उत्पाद (ODOP) के तहत आटा चक्की, तेल घानी, मसाला व अचार इकाइयों के लिए 35% पूंजीगत सब्सिडी (अधिकतम 10 लाख)।",
        "eligibility": "Existing or new micro food processing entrepreneurs, SHGs, and Farmer Producer Organizations.",
        "eligibility_hi": "खाद्य प्रसंस्करण क्षेत्र में कार्यरत व्यक्तिगत उद्यमी व स्वयं सहायता समूह।",
        "documents_required": "Aadhaar Card, FSSAI Registration/Application, Electricity Bill, Machinery Quotation, Bank Statement",
        "is_active": True
    },
    {
        "scheme_name": "Credit Guarantee Scheme for Micro and Small Enterprises (CGTMSE)",
        "scheme_name_hi": "क्रेडिट गारंटी फंड ट्रस्ट (सीजीटीएमएसई)",
        "agency": "Ministry of MSME / SIDBI",
        "category": "Manufacturing / Services / Clean Tech / Trading Enterprises",
        "min_cost": 500000.0,
        "max_cost": 20000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 8.0,
        "interest_rebate_women": 0.5,
        "repayment_years": 7,
        "moratorium_months": 12,
        "description": "Enables institutional lenders to extend up to Rs. 2 Crore collateral-free credit with up to 85% guarantee cover by Government of India.",
        "description_hi": "बिना किसी तीसरे पक्ष की गारंटी या अचल संपत्ति बंधक के 2 करोड़ रुपये तक का गारंटी-कवर्ड बैंक ऋण।",
        "eligibility": "New and existing micro and small enterprises in manufacturing and service sectors.",
        "eligibility_hi": "विनिर्माण एवं सेवा क्षेत्र के नए व मौजूदा पंजीकृत सूक्ष्म व लघु उद्यम।",
        "documents_required": "Udyam Registration, DPR with Bank Feasibility, IT Returns, Bank Statement, Know Your Customer (KYC)",
        "is_active": True
    },
    {
        "scheme_name": "National SC/ST Hub Special Credit Linked Capital Subsidy (SCLCSS)",
        "scheme_name_hi": "राष्ट्रीय एससी/एसटी हब पूंजीगत सब्सिडी योजना (एससीएलसीएसएस)",
        "agency": "Ministry of MSME / NSIC",
        "category": "Technology Upgradation / Modern Machinery / SC-ST Entrepreneurs",
        "min_cost": 500000.0,
        "max_cost": 10000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 8.0,
        "interest_rebate_women": 1.0,
        "repayment_years": 6,
        "moratorium_months": 6,
        "description": "Provides 25% upfront capital subsidy for institutional finance up to Rs. 1 Crore for induction of well-established and improved technology for SC/ST enterprises.",
        "description_hi": "एससी/एसटी उद्यमियों को अत्याधुनिक मशीनरी और तकनीकी उन्नयन हेतु 25% सीधी पूंजीगत सब्सिडी।",
        "eligibility": "SC/ST owned MSEs with valid caste documentation.",
        "eligibility_hi": "अनुसूचित जाति/जनजाति के स्वामित्व वाले सूक्ष्म एवं लघु उद्यम।",
        "documents_required": "Aadhaar Card, SC/ST Certificate, Udyam Registration, Machinery Proforma Invoices, Bank Sanction Letter",
        "is_active": True
    },
    {
        "scheme_name": "Deendayal Antyodaya Yojana - NRLM Community Investment Fund",
        "scheme_name_hi": "दीनदयाल अंत्योदय योजना - एनआरएलएम रिवॉल्विंग व सीआईएफ",
        "agency": "Ministry of Rural Development / State Rural Livelihoods Missions (SRLM)",
        "category": "Rural Women SHGs / Micro Livelihoods / Livestock / Handicrafts",
        "min_cost": 20000.0,
        "max_cost": 1500000.0,
        "margin_percent": 0.0,
        "govt_loan_percent": 100.0,
        "interest_rate": 7.0,
        "interest_rebate_women": 3.0, # Effective 4% interest rate with subvention
        "repayment_years": 4,
        "moratorium_months": 3,
        "description": "Low-cost credit linkage for Women SHGs with interest subvention down to 4% p.a. for prompt repayment, combined with Revolving Funds of Rs. 15,000-30,000.",
        "description_hi": "महिला स्वयं सहायता समूहों को आजीविका व सूक्ष्म उद्यमों हेतु 4% प्रभावी ब्याज दर पर सुगम बैंक क्रेडिट लिंकेज।",
        "eligibility": "Panchasutra compliant rural Women Self Help Groups (SHGs) under NRLM fold.",
        "eligibility_hi": "एनआरएलएम से जुड़े ग्रामीण महिला स्वयं सहायता समूह जो नियमित बचत व बैठकें करते हों।",
        "documents_required": "SHG Resolution Book, Bank Account Passbook, Member List, Grading Report by Block Mission Management Unit",
        "is_active": True
    },
    {
        "scheme_name": "Agriculture Infrastructure Fund (AIF)",
        "scheme_name_hi": "कृषि अवसंरचना कोष (एआईएफ)",
        "agency": "Ministry of Agriculture & Farmers Welfare / NABARD / Commercial Banks",
        "category": "Post-Harvest Infra / Warehousing / Sorting-Grading / Cold Chain",
        "min_cost": 200000.0,
        "max_cost": 20000000.0,
        "margin_percent": 10.0,
        "govt_loan_percent": 90.0,
        "interest_rate": 6.0,
        "interest_rebate_women": 0.5,
        "repayment_years": 7,
        "moratorium_months": 12,
        "description": "Provides 3% per annum interest subvention up to Rs. 2 Crore for setting up post-harvest management infrastructure, ripening chambers, warehouses, and packhouses.",
        "description_hi": "कटाई उपरांत भंडारण, वेयरहाउस, कोल्ड स्टोरेज और ग्रेडिंग यूनिट्स हेतु 3% ब्याज छूट के साथ 2 करोड़ तक का ऋण।",
        "eligibility": "Farmers, Agri-entrepreneurs, Startups, Primary Agricultural Credit Societies (PACS), and FPOs.",
        "eligibility_hi": "किसान, कृषि-उद्यमी, स्टार्टअप्स और प्राथमिक कृषि सहकारी समितियां।",
        "documents_required": "AIF Portal Registration, DPR, Land Ownership/Lease Agreement, Bank Loan Application",
        "is_active": True
    }
]

import os
import hashlib

def get_admin_password_hash(password: str) -> str:
    salt = os.getenv("AUTH_SALT", "SamarthAI_Security_Salt_2026").encode()
    return hashlib.sha256(salt + password.strip().encode("utf-8")).hexdigest()

def seed_database():
    """Initializes tables, seeds authentic schemes and seeds default Nodal Admin user if not present."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 1. Seed or refresh authentic live schemes
        seeded_count = 0
        for s_data in AUTHENTIC_SCHEMES:
            existing = db.query(Scheme).filter_by(scheme_name=s_data["scheme_name"]).first()
            if not existing:
                scheme = Scheme(**s_data)
                db.add(scheme)
                seeded_count += 1
            else:
                # Refresh details to guarantee accuracy
                for k, v in s_data.items():
                    setattr(existing, k, v)
        db.commit()
        total_schemes = db.query(Scheme).count()
        print(f"Schemes updated in database. Added {seeded_count} new schemes. Total live schemes: {total_schemes}.")

        # 2. Seed pre-configured Nodal Admin account into users table
        admin_email = "ghansushayal@gmail.com"
        admin_user = db.query(User).filter_by(email=admin_email).first()
        if not admin_user:
            admin_user = User(
                email=admin_email,
                hashed_password=get_admin_password_hash("Samarth@2026"),
                full_name="Chief Nodal Officer & Administrator",
                phone="9876543210",
                state="Central / All India",
                role="Admin",
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print(f"Successfully seeded Chief Nodal Officer ({admin_email}) in database.")
        else:
            admin_user.role = "Admin"
            admin_user.hashed_password = get_admin_password_hash("Samarth@2026")
            db.commit()
            print(f"Nodal Admin account ({admin_email}) refreshed in database.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

