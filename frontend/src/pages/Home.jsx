import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Store, 
  Milk, 
  Scissors, 
  Truck, 
  SunMedium, 
  Sprout,
  Landmark,
  BadgePercent,
  Compass,
  PieChart,
  Users,
  Award,
  Zap,
  Check
} from 'lucide-react';

const Home = () => {
  const { lang } = useLanguage();

  const businessCategories = [
    {
      id: 'dairy',
      name: 'डेयरी व पशुपालन',
      nameEn: 'Dairy & Animal Husbandry',
      icon: Milk,
      range: '₹14,000 Margin -> ₹1.4L - ₹15L Unit',
      scheme: 'Micro Finance / Term Loan',
      color: 'border-blue-200 bg-blue-50/50 hover:border-blue-400'
    },
    {
      id: 'grocery',
      name: 'किराना व रिटेल सुपरस्टोर',
      nameEn: 'Grocery & Retail Store',
      icon: Store,
      range: '₹10,000 Margin -> ₹1L - ₹5L Unit',
      scheme: 'Laghu Vyavasay / Micro Finance',
      color: 'border-amber-200 bg-amber-50/50 hover:border-amber-400'
    },
    {
      id: 'tailoring',
      name: 'सिलाई व बुटीक (महिला विशेष 4%)',
      nameEn: 'Tailoring & Boutique Center',
      icon: Scissors,
      range: '₹5,000 Margin -> ₹50K - ₹1.4L Unit',
      scheme: 'Mahila Samriddhi Yojana (4% Rate)',
      color: 'border-pink-200 bg-pink-50/50 hover:border-pink-400'
    },
    {
      id: 'transport',
      name: 'ई-रिक्शा व स्वच्छ वाहन सेवा',
      nameEn: 'E-Rickshaw & Clean Transport',
      icon: Truck,
      range: '₹15,000 Margin -> ₹1.5L - ₹10L Unit',
      scheme: 'Green Business / Term Loan',
      color: 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400'
    },
    {
      id: 'green',
      name: 'सोलर व हरित सूक्ष्म उद्यम',
      nameEn: 'Solar & Clean Energy Ventures',
      icon: SunMedium,
      range: '₹20,000 Margin -> ₹2L - ₹30L Unit',
      scheme: 'Green Business Scheme',
      color: 'border-teal-200 bg-teal-50/50 hover:border-teal-400'
    },
    {
      id: 'agri',
      name: 'आटा/तेल मिल व कृषि प्रसंस्करण',
      nameEn: 'Flour/Oil Mill Agro-Industry',
      icon: Sprout,
      range: '₹50,000 Margin -> ₹5L - ₹25L Unit',
      scheme: 'Term Loan Tier 1 / Tier 2',
      color: 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-400'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] border-b border-slate-200 py-12 sm:py-20 px-4 sm:px-6">
        {/* Decorative Background Blur Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-amber-400/10 to-emerald-400/10 blur-3xl pointer-events-none -z-10 animate-pulse-subtle"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-amber-50 border border-[#0B3D91]/20 text-[#0B3D91] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs">
            <Landmark className="w-4 h-4 text-[#0B3D91]" />
            <span>
              {lang === 'hi'
                ? 'स्मार्ट इंडिया हैकथॉन 2026 — समस्या विवरण आईडी: 26091'
                : 'Smart India Hackathon 2026 — Problem Statement ID: 26091'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {lang === 'hi' ? (
              <>
                हाइपर-लोकल <span className="text-[#0B3D91]">एआई बिजनेस एडवाइजरी</span> एवं <span className="text-[#FF9933]">स्मार्ट स्कीम कैलकुलेटर</span>
              </>
            ) : (
              <>
                Hyper-Local <span className="text-[#0B3D91]">AI Business Advisory</span> & <span className="text-[#FF9933]">Smart Scheme Calculator</span>
              </>
            )}
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-600 font-medium leading-relaxed">
            {lang === 'hi'
              ? 'ग्रामीण व अर्ध-शहरी सूक्ष्म उद्यमियों के लिए संस्थागत स्तर का बिजनेस कंसल्टिंग टूल। अपनी उपलब्ध 10% मार्जिन पूंजी दर्ज करें और 5-10 किमी बाजार पहुंच, SWOT, प्रतिस्पर्धी मैपिंग व 90% रियायती लोन की सटीक वित्तीय योजना प्राप्त करें।'
              : 'Democratizing institutional-grade business consulting for rural entrepreneurs. Input available margin capital (10%) to unlock a 5-10 km radius market study, SWOT breakdown, competitor density, and automated concessional loan structuring (90%).'}
          </p>

          {/* Primary CTA Buttons with High-Quality Hover Effects */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
            <Link
              to="/advisory"
              className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-[#0B3D91] to-[#072a66] hover:from-[#093275] hover:to-[#041a3d] text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl group"
            >
              <span>{lang === 'hi' ? 'व्यवहार्यता अध्ययन शुरू करें' : 'Generate Feasibility Study'}</span>
              <ArrowRight className="w-4 h-4 text-[#FF9933] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/calculator"
              className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black rounded-2xl shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Calculator className="w-5 h-5" />
              <span>{lang === 'hi' ? '10% मार्जिन कैलकुलेटर' : '10% Margin Calculator'}</span>
            </Link>

            <Link
              to="/schemes"
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-[#0B3D91] font-bold rounded-2xl border-2 border-slate-200 hover:border-[#0B3D91] flex items-center justify-center space-x-2 text-sm sm:text-base transition-all"
            >
              <span>{lang === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'}</span>
            </Link>
          </div>

          {/* Trust Highlights Grid */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2.5 card-hover-lift">
              <CheckCircle2 className="w-5 h-5 text-[#138808] flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'hi' ? '10% मार्जिन : 90% लोन' : '10% Margin : 90% Loan'}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2.5 card-hover-lift">
              <CheckCircle2 className="w-5 h-5 text-[#138808] flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'hi' ? 'माइक्रो फाइनेंस (6.5%)' : 'Micro Finance (6.5%)'}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2.5 card-hover-lift">
              <CheckCircle2 className="w-5 h-5 text-[#138808] flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'hi' ? 'टर्म लोन (8% • 7 वर्ष)' : 'Term Loan (8% • 7 Yrs)'}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-2.5 card-hover-lift">
              <CheckCircle2 className="w-5 h-5 text-[#138808] flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800">
                {lang === 'hi' ? '3-6 माह मोरेटोरियम' : '3-6 Mo. Moratorium'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The 2 Core Modules Section (Directly mapped to Hackathon Requirements) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-[#0B3D91] uppercase tracking-wider bg-blue-100/60 px-3 py-1 rounded-full">
            CORE SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === 'hi' ? 'दो प्रमुख मॉड्यूल्स की संपूर्ण कार्यप्रणाली' : 'Two Core System Modules'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'hi'
              ? 'संस्थागत डेटा व गणितीय सूत्रों पर आधारित निर्णय प्रणाली'
              : 'Institutional intelligence tailored for grassroots rural and semi-urban realities'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module 1 Card */}
          <div className="bg-white p-7 rounded-3xl border-2 border-blue-200 shadow-lg space-y-5 card-hover-lift relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -z-10"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0B3D91] flex items-center justify-center font-black shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#0B3D91] uppercase tracking-wider block">
                  MODULE 1
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {lang === 'hi' ? 'हाइपर-लोकल व्यवसाय व्यवहार्यता रिपोर्ट' : 'Hyper-Local Business Feasibility Report'}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {lang === 'hi'
                ? 'प्राकृतिक भाषा (NLP) संचालित AI इंजन जो ग्राम/ब्लॉक स्तर पर वास्तविक व्यावसायिक रणनीति का निर्माण करता है:'
                : 'NLP-powered multilingual advisory engine generating a localized, institutional-grade commercial strategy:'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-[#0B3D91] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <div>
                  <strong>Market Reach (5–10 km Radius):</strong> Estimates the immediate consumer base count and primary village distribution channels.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-[#0B3D91] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <div>
                  <strong>Opportunity Analysis:</strong> Uncovers unserved or underserved niches in the chosen sector within the local economy.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-[#0B3D91] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <div>
                  <strong>SWOT Breakdown:</strong> Strengths, Weaknesses, Opportunities, and Threats calibrated specifically to the micro-budget.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-[#0B3D91] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <div>
                  <strong>Threats Identification:</strong> Pinpoints supply chain bottlenecks, seasonal demand swings, and single-buyer dependency risks.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-[#0B3D91] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                <div>
                  <strong>Competitor Mapping & Density:</strong> Localized economic data estimating similar existing units in the block.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-[#0B3D91] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                <div>
                  <strong>Product Market Value:</strong> Optimal pricing strategies predicting local value based on regional purchasing power.
                </div>
              </li>
            </ul>

            <Link
              to="/advisory"
              className="inline-flex items-center space-x-2 text-xs font-black text-[#0B3D91] hover:underline pt-2"
            >
              <span>{lang === 'hi' ? 'व्यवहार्यता मॉड्यूल का अनुभव करें' : 'Launch Feasibility Module'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 2 Card */}
          <div className="bg-white p-7 rounded-3xl border-2 border-amber-200 shadow-lg space-y-5 card-hover-lift relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -z-10"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black shadow-xs">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">
                  MODULE 2
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {lang === 'hi' ? 'स्मार्ट वित्तीय कैलकुलेटर व स्कीम राउटर' : 'Smart Financial Calculator & Scheme Router'}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {lang === 'hi'
                ? 'शुद्ध पायथन (Deterministic) गणितीय इंजन जो उपलब्ध पूंजी से वित्तीय रोडमैप तैयार करता है:'
                : 'Deterministic computational engine that automatically maps available margin capital to maximum borrowing capacity:'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">7</span>
                <div>
                  <strong>Financial Structuring (Margin / 10%):</strong> Automatically establishes total feasible Project Cost and Maximum 90% Loan.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                <div>
                  <strong>Worked Example:</strong> ₹1,00,000 margin capital &rarr; ₹10,00,000 project cost and ₹9,00,000 loan eligibility.
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                <div>
                  <strong>Scheme Auto-Selection Logic A:</strong> If Project Cost &le; ₹1.40 Lakh &rarr; Micro Finance Scheme (6.5% interest, 3-year tenure, 3-month moratorium).
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                <div>
                  <strong>Scheme Auto-Selection Logic B:</strong> If Project Cost &gt; ₹1.40 Lakh and &le; ₹50.00 Lakh &rarr; Term Loan Scheme (8% interest, 7-year tenure, 6-month moratorium).
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                <div>
                  <strong>Quarterly Schedule & Moratorium Generator:</strong> Factors in grace periods, operational working capital (18%), and exact quarterly obligations.
                </div>
              </li>
            </ul>

            <Link
              to="/calculator"
              className="inline-flex items-center space-x-2 text-xs font-black text-amber-800 hover:underline pt-2"
            >
              <span>{lang === 'hi' ? 'कैलकुलेटर मॉड्यूल का अनुभव करें' : 'Launch Calculator Module'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Sector Breakdown Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {lang === 'hi' ? 'लोकप्रिय ग्रामीण व अर्ध-शहरी उद्यम क्षेत्र' : 'Target Micro-Enterprise Sectors'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'hi' ? 'नाबार्ड, एनएसएफडीसी व एमएसएमई द्वारा रियायती वित्तपोषण हेतु स्वीकृत' : 'Approved for concessional financing under NSFDC & Ministry schemes'}
            </p>
          </div>
          <Link
            to="/advisory"
            className="text-xs font-bold text-[#0B3D91] hover:underline flex items-center space-x-1"
          >
            <span>{lang === 'hi' ? 'अपना व्यवसाय चुनें' : 'Start Advisory Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className={`p-5 rounded-2xl border ${cat.color} space-y-3 card-hover-lift transition-all`}>
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B3D91] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      {lang === 'hi' ? cat.name : cat.nameEn}
                    </h3>
                    <span className="text-[11px] text-slate-600 font-bold block">
                      {cat.range}
                    </span>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/60">
                  <span className="text-slate-500 text-[11px]">
                    {lang === 'hi' ? 'योजना:' : 'Scheme:'}
                  </span>
                  <span className="font-extrabold text-[#0B3D91] text-[11px]">
                    {cat.scheme}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Home;
