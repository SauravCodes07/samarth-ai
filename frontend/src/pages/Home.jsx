import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SpotlightCard from '../components/ui/SpotlightCard';
import ShineButton from '../components/ui/ShineButton';
import BackgroundBeams from '../components/ui/BackgroundBeams';
import { 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Store, 
  Milk, 
  Scissors, 
  Truck, 
  Building2,
  CheckCircle2,
  TrendingUp,
  Percent,
  Layers,
  MapPin,
  ChevronRight,
  BarChart3,
  FileCheck,
  Coins,
  BadgeCheck,
  Clock,
  Award,
  Landmark,
  Users,
  Briefcase,
  FileText,
  Check,
  Cpu,
  Mic,
  Zap,
  Download,
  Activity,
  FileSpreadsheet,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { lang } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, immediately redirect to schemes directory
  const hasAuth = !!user || !!localStorage.getItem('demo_user_auth');
  if (hasAuth) {
    return <Navigate to="/schemes" replace />;
  }

  const handleFeatureAccess = (path = '/advisory') => {
    if (!user) {
      openAuthModal('login');
    } else {
      navigate(path);
    }
  };

  // 1. Interactive Quick Financial Estimator (Live Deterministic Engine Preview)
  const [selectedTrade, setSelectedTrade] = useState('dairy');
  const [projectCost, setProjectCost] = useState(250000); // 2.5 Lakhs default

  const marginRequired = Math.round(projectCost * 0.10);
  const loanEligible = Math.round(projectCost * 0.90);

  // Interest rate and scheme mapping
  let estimatedRate = 6.5;
  let recommendedScheme = 'Laghu Vyavasay Yojana (LVY)';
  if (selectedTrade === 'tailoring') {
    estimatedRate = 4.0;
    recommendedScheme = 'Mahila Samriddhi Yojana (MoSJE)';
  } else if (projectCost <= 140000) {
    estimatedRate = 5.0;
    recommendedScheme = 'Micro Finance Scheme (MFS)';
  } else if (projectCost > 500000) {
    estimatedRate = 8.0;
    recommendedScheme = 'Term Loan Scheme (TLS) - Tier 1';
  }

  const tenureYears = projectCost <= 140000 ? 3 : 5;
  const monthlyRate = (estimatedRate / 100) / 12;
  const totalMonths = tenureYears * 12;
  const estimatedEmi = Math.round(
    (loanEligible * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const formatINR = (num) => `₹${Number(num).toLocaleString('en-IN')}`;

  const trades = [
    { id: 'dairy', icon: Milk, nameEn: 'Dairy & Milk Farm', nameHi: 'डेयरी व दुग्ध व्यवसाय', nameMr: 'डेअरी व दुग्ध व्यवसाय', cost: 500000 },
    { id: 'grocery', icon: Store, nameEn: 'Grocery / Kirana', nameHi: 'किराना व जनरल स्टोर', nameMr: 'किराणा व जनरल स्टोअर', cost: 200000 },
    { id: 'tailoring', icon: Scissors, nameEn: 'Tailoring Boutique (4% Rate)', nameHi: 'सिलाई बुटीक (4% महिला छूट)', nameMr: 'शिलाई बुटीक (४% सवलत)', cost: 140000 },
    { id: 'transport', icon: Truck, nameEn: 'E-Rickshaw Transport', nameHi: 'ई-रिक्शा व वाहन सेवा', nameMr: 'ई-रिक्षा वाहतूक सेवा', cost: 180000 }
  ];

  // 2. Interactive DPR Dossier Sample Viewer Tab State
  const [activeDprTab, setActiveDprTab] = useState('summary');

  return (
    <div className="space-y-20 pb-24 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: High-Authority Engineering & Direct Financial Estimator */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#071328] text-white min-h-[680px] flex items-center pt-8 pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061226] via-[#081938]/95 to-[#0B2A5E]/85 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071328] via-transparent to-black/40 z-0" />
        
        <BackgroundBeams />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission, Technology Stack & Direct Action */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badges: Real Tech & Standards */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-xs">
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>MoSJE & Stand-Up India Aligned Architecture</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar"></span>
                  <span>100% Deterministic Math • Zero Hallucination</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14]">
                {lang === 'mr' ? (
                  <>
                    वंचित व महिला उद्योजकांसाठी <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      बँक-मान्य DPR व कर्ज सल्लागार
                    </span>
                  </>
                ) : lang === 'hi' ? (
                  <>
                    एससी/एसटी एवं महिला उद्यमियों हेतु <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      बैंक-मान्य DPR एवं ऋण तैयारी इंजन
                    </span>
                  </>
                ) : (
                  <>
                    Turn Your Business Idea Into a <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      Bank-Compliant DPR in 60 Seconds
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                {lang === 'mr' ? (
                  'मराठी, हिंदी किंवा इंग्रजीमध्ये फक्त आवाजाने बोला. समर्थ AI अचूक गणितीय नियमांनुसार १०% स्वतःचे भांडवल, ९०% शासकीय सवलतीचे कर्ज (४% ते ८% व्याजदर), ६ ते १२ महिन्यांची हप्ता सवलत आणि स्थानिक व्यवहार्यतेसह संपूर्ण बँक अहवाल (DPR) त्वरित तयार करते.'
                ) : lang === 'hi' ? (
                  'हिंदी, मराठी या अंग्रेजी में सीधे बोलकर अपना व्यवसाय बताएं। समर्थ AI सटीक सरकारी नियमों से 10% मार्जिन पूंजी, 90% रियायती बैंक ऋण (4% से 8% ब्याज दर), 6 से 12 माह मोरेटोरियम और आधिकारिक बैंक-मान्य प्रोजेक्ट रिपोर्ट तुरंत तैयार करता है।'
                ) : (
                  'Speak your enterprise idea via voice in Hindi, Marathi, or English. Samarth AI executes deterministic financial calculations for 10% promoter equity, 90% concessional debt (4%–8% p.a.), 6–12 months moratorium holiday, and outputs bank-grade Detailed Project Reports (DPR).'
                )}
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <ShineButton
                  onClick={() => handleFeatureAccess('/advisory')}
                  variant="gold"
                  className="space-x-2 px-7 py-3.5 text-sm shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span className="font-extrabold text-slate-950">
                    {lang === 'mr' ? 'बँक अहवाल (DPR) तयार करा' : lang === 'hi' ? 'बैंक DPR तैयार करें' : 'Generate Bank DPR Now'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </ShineButton>

                <button
                  type="button"
                  onClick={() => handleFeatureAccess('/schemes')}
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer backdrop-blur-xs shadow-md hover:border-white/40"
                >
                  <Layers className="w-4 h-4 text-slate-300" />
                  <span>{lang === 'mr' ? 'शासकीय योजनांची यादी' : lang === 'hi' ? 'सरकारी योजनाएं देखें' : 'Explore Verified Schemes'}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Real Technological Guarantees */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Groq LPU</strong> 5km Feasibility</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Percent className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>10% Margin</strong> Statutory Rule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Web Speech</strong> Voice Engine</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Interactive Quick Estimator Card */}
            <div className="lg:col-span-5">
              <SpotlightCard className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{lang === 'mr' ? 'लाईव्ह आर्थिक गणक' : lang === 'hi' ? 'लाइव वित्तीय गणक' : 'Live Deterministic Calculator'}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {lang === 'mr' ? '१०% भांडवलावर कर्ज तपासा' : lang === 'hi' ? '10% मार्जिन पर लोन देखें' : 'Instant 10% Margin Calculator'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Formula-Based
                  </span>
                </div>

                {/* Trade Selector */}
                <div className="space-y-2 mb-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {lang === 'mr' ? '१. प्रस्तावित व्यवसाय निवडा:' : lang === 'hi' ? '1. प्रस्तावित व्यवसाय चुनें:' : '1. Select Proposed Enterprise:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {trades.map((t) => {
                      const isSel = selectedTrade === t.id;
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setSelectedTrade(t.id);
                            setProjectCost(t.cost);
                          }}
                          className={`flex items-center space-x-2 p-2 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{lang === 'mr' ? t.nameMr : lang === 'hi' ? t.nameHi : t.nameEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'mr' ? '२. एकूण प्रकल्प खर्च:' : lang === 'hi' ? '2. कुल प्रोजेक्ट लागत:' : '2. Total Project Cost:'}
                    </span>
                    <span className="font-black text-blue-700 dark:text-blue-400 text-sm">{formatINR(projectCost)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1500000"
                    step="25000"
                    value={projectCost}
                    onChange={(e) => setProjectCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                    <span>₹50,000</span>
                    <span>₹5,00,000</span>
                    <span>₹15,00,000</span>
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {lang === 'mr' ? 'आपले १०% स्वतःचे भांडवल:' : lang === 'hi' ? 'आपकी 10% मार्जिन पूंजी:' : 'Your 10% Equity (Margin):'}
                    </span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">{formatINR(marginRequired)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {lang === 'mr' ? 'सरकारी बँक कर्ज (९०%):' : lang === 'hi' ? 'सरकारी बैंक लोन (90%):' : 'Govt Bank Loan (90%):'}
                    </span>
                    <span className="font-black text-blue-700 dark:text-blue-400 text-sm">{formatINR(loanEligible)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-slate-200/80 dark:border-slate-700 pt-2">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                        {lang === 'mr' ? 'सवलतीचा व्याजदर' : lang === 'hi' ? 'रियायती ब्याज' : 'Interest Rate'}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{estimatedRate}% p.a.</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                        {lang === 'mr' ? 'हप्ता सवलत' : lang === 'hi' ? 'मोरेटोरियम' : 'Moratorium'}
                      </span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">6 {lang === 'mr' ? 'महिने' : lang === 'hi' ? 'माह' : 'Months'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                        {lang === 'mr' ? 'अंदाजे मासिक हप्ता' : lang === 'hi' ? 'अनुमानित EMI' : 'Monthly EMI'}
                      </span>
                      <span className="font-black text-slate-900 dark:text-white">{formatINR(estimatedEmi)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium">
                  Matches: <span className="font-bold text-blue-600 dark:text-blue-400">{recommendedScheme}</span>
                </div>

                {/* Direct CTA */}
                <ShineButton
                  onClick={() => handleFeatureAccess('/advisory')}
                  variant="dark"
                  className="mt-3.5 w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <span>{lang === 'mr' ? 'संपूर्ण बँक अहवाल (DPR) काढा' : lang === 'hi' ? 'पूरी बैंक रिपोर्ट (DPR) निकालें' : 'Generate Full Bank DPR'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </ShineButton>

              </SpotlightCard>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REAL TECHNOLOGY STACK & PERFORMANCE ENGINE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 backdrop-blur-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">
                  Verified Technical Foundation
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                Engineered with Real AI Models & Deterministic Mathematics
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production-Grade Codebase</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Engine 1: Groq LPU */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Groq Cloud LPU
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Ultra-fast AI inference providing 5–10km local catchment demand assessment & SWOT analysis.
              </p>
              <div className="pt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                Sub-Second Inference
              </div>
            </div>

            {/* Engine 2: Pure Python Deterministic Calculator */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Deterministic Math
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                100% mathematical certainty for 10% margin equity, 90% debt allocation, and amortization.
              </p>
              <div className="pt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                0% Calculation Error
              </div>
            </div>

            {/* Engine 3: Web Speech API */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Web Speech API
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Browser-native trilingual voice recognition in Marathi, Hindi, and English for grassroots accessibility.
              </p>
              <div className="pt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                No Typing Barrier
              </div>
            </div>

            {/* Engine 4: Bank-Ready PDF Export */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                jsPDF & Canvas DPR
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Comprehensive Detailed Project Report PDF generation ready for physical or digital bank appraisal.
              </p>
              <div className="pt-2 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                Print & Submit Ready
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 3-STAGE BORROWER PREPARATION PIPELINE (GROUND TRUTH ARCHITECTURE) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-1.5 rounded-full">
            Borrower Journey Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            How Samarth AI Prepares Your Application
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bridging the last-mile gap between grassroots entrepreneurs and institutional banking standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-blue-200/80 dark:border-blue-900/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-2xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                01
              </span>
              <Mic className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Voice & Profile Ingestion
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Applicants simply speak their enterprise idea (e.g. "I want to open a 10-cow dairy farm in Solapur"). Our speech engine extracts trade type, estimated budget, and demographic category without complex forms.
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              ✓ Marathi • Hindi • English Voice Support
            </div>
          </SpotlightCard>

          {/* Pillar 2 */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-blue-200/80 dark:border-blue-900/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                02
              </span>
              <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Deterministic Math & Scheme Matching
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Our verified calculation engine enforces the statutory 10% margin money rule, maps the remaining 90% to eligible government concessional credit (4%–8%), and designs the 6–12 month moratorium timeline.
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              ✓ Strictly Formulaic Amortization & Cash Flow
            </div>
          </SpotlightCard>

          {/* Pillar 3 */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-blue-200/80 dark:border-blue-900/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                03
              </span>
              <FileCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Bank-Ready DPR Dossier Export
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Downloads a formal, bank-compliant Detailed Project Report (DPR) containing capital expenditure, working capital requirements, projected cash flows, and DSCR metrics ready for physical branch submission.
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              ✓ Ready for Bank Branch & DIC Submission
            </div>
          </SpotlightCard>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INSTITUTIONAL ECOSYSTEM ALIGNMENT MAP (TRUTHFUL & COMPLIANCE-FOCUSED) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Statutory Alignment Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Engineered for the National Credit Delivery Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Samarth AI formats loan proposals, financial ratios, and viability metrics to comply with the exact documentation standards mandated by India's institutional lending framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Public Sector Banks Alignment */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block text-center md:text-left">
                Target Lending Institutions
              </span>
              {[
                { name: 'State Bank of India (SBI)', note: 'Priority Sector Underwriting' },
                { name: 'Punjab National Bank (PNB)', note: 'Stand-Up India Guidelines' },
                { name: 'Bank of Baroda', note: 'MSME & Dairy Norms' },
                { name: 'Canara & Union Bank', note: 'Concessional Credit Schemes' }
              ].map((bank, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs space-y-0.5 shadow-xs">
                  <div className="flex items-center space-x-2">
                    <Landmark className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{bank.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block pl-6">{bank.note}</span>
                </div>
              ))}
            </div>

            {/* Lead District Coordination Standard */}
            <div className="md:col-span-3 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-base">Lead District Model</h4>
                <span className="text-xs text-blue-100 block">782 Districts across 36 States/UTs</span>
              </div>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                DPRs are structured to fulfill the appraisal benchmarks reviewed by Lead District Managers and District Consultative Committees.
              </p>
              <span className="inline-flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-amber-300">
                <CheckCircle className="w-3 h-3" />
                <span>Standardized DPR Schema</span>
              </span>
            </div>

            {/* Apex Refinance & Concessional Rules */}
            <div className="md:col-span-2 flex flex-col space-y-3">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl text-center space-y-1">
                <Building2 className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto" />
                <span className="font-black text-xs text-rose-950 dark:text-rose-200 block">SIDBI / NABARD</span>
                <span className="text-[10px] text-rose-700 dark:text-rose-300">Refinance & Guarantee Rules</span>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-1">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <span className="font-black text-xs text-emerald-950 dark:text-emerald-200 block">MoSJE & SCA Guidelines</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300">4%–8% Concessional Credit</span>
              </div>
            </div>

            {/* Grassroots Facilitation Agencies */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Grassroots Facilitation Touchpoints
              </span>
              {[
                { num: '01', title: 'Rural Self Employment Training (RSETI)', desc: 'EDP Project Alignment' },
                { num: '02', title: 'District Industries Centers (DIC)', desc: 'MSME & Subsidy Filing' },
                { num: '03', title: 'MSME-DFO Field Offices', desc: 'Technical Viability Norms' },
                { num: '04', title: 'State SC/ST Finance Corporations', desc: 'Margin Money Grants' },
                { num: '05', title: 'Dalit Chamber of Commerce (DICCI)', desc: 'Affirmative Entrepreneurship' },
                { num: '06', title: 'Women SHGs & NRLM Federations', desc: 'Collective Micro-Financing' }
              ].map((item, i) => (
                <div key={i} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs flex items-center space-x-2.5 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-black text-[10px] flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{item.title}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE LIVE DPR PREVIEW COMPONENT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Transparent Document Generation
              </span>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight mt-1">
                Inspect What a Bank-Ready DPR Contains
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Every report generated by Samarth AI contains standard financial appraisal sections required by bank loan officers.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex flex-wrap gap-2 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 self-start sm:self-auto">
              {[
                { id: 'summary', label: 'Means of Finance' },
                { id: 'cashflow', label: 'Repayment & Moratorium' },
                { id: 'swot', label: 'Local Feasibility (5km)' },
                { id: 'compliance', label: 'Document Checklist' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveDprTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDprTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Means of Finance */}
          {activeDprTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <span className="text-xs font-bold text-slate-400">Project Outlay</span>
                <h4 className="text-2xl font-black text-white">₹5,00,000</h4>
                <p className="text-xs text-slate-400">Dairy Chilling & Milk Processing Unit in rural catchment.</p>
                <div className="pt-2 text-[11px] text-blue-400 font-semibold">100% Fixed Capital Asset</div>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
                <span className="text-xs font-bold text-emerald-400">Promoter Equity (10%)</span>
                <h4 className="text-2xl font-black text-emerald-300">₹50,000</h4>
                <p className="text-xs text-emerald-200/70">Borrower's self-contribution under MoSJE guidelines.</p>
                <div className="pt-2 text-[11px] text-emerald-400 font-semibold">Affirmative Action Ceiling</div>
              </div>
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-800/60 space-y-2">
                <span className="text-xs font-bold text-blue-400">Bank Loan Share (90%)</span>
                <h4 className="text-2xl font-black text-blue-300">₹4,50,000</h4>
                <p className="text-xs text-blue-200/70">Financed under Stand-Up India concessional lending line.</p>
                <div className="pt-2 text-[11px] text-blue-400 font-semibold">Interest Rate: 6.5% p.a.</div>
              </div>
            </div>
          )}

          {/* Tab 2: Repayment & Moratorium */}
          {activeDprTab === 'cashflow' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <span className="text-xs font-bold text-amber-400">Moratorium Holiday</span>
                <h4 className="text-xl font-black text-white">6 Months Grace Period</h4>
                <p className="text-xs text-slate-400">Zero principal repayment during initial gestation and herd onboarding.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <span className="text-xs font-bold text-blue-400">Repayment Tenure</span>
                <h4 className="text-xl font-black text-white">5 Years (60 Months)</h4>
                <p className="text-xs text-slate-400">Structured reducing balance monthly amortization matching dairy cashflow.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <span className="text-xs font-bold text-emerald-400">Projected DSCR</span>
                <h4 className="text-xl font-black text-emerald-300">1.82x Coverage</h4>
                <p className="text-xs text-slate-400">Exceeds standard 1.50x bank benchmark, ensuring comfortable debt servicing.</p>
              </div>
            </div>
          )}

          {/* Tab 3: Local Feasibility */}
          {activeDprTab === 'swot' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Catchment Strengths (Groq AI Evaluated)</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High daily raw milk surplus in a 7km radius with direct tie-up to district dairy cooperative chilling plant.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Market Opportunities</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Value-addition potential through paneer, ghee, and curd packaging sold at local weekly haats and tehsils.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Compliance Checklist */}
          {activeDprTab === 'compliance' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 animate-fadeIn">
              {[
                { title: 'Identity & Address', desc: 'Aadhaar & Voter ID verification' },
                { title: 'Social Category', desc: 'Valid Caste Certificate (SC/ST/OBC)' },
                { title: 'Machinery Quotation', desc: 'Vendor GST invoices & estimates' },
                { title: 'Banking Proof', desc: '6-Month bank passbook statement' }
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-white">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SUPPORTED ENTERPRISE BLUEPRINTS (GROUNDED IN ENGINE CAPABILITIES) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3.5 py-1.5 rounded-full">
            Supported Enterprise Sectors
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            Real Sector Blueprints Built Into the Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pre-configured financial models tailored for high-volume rural and semi-urban trades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Sector 1: Dairy */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Milk className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Dairy & Milk Processing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Covers cattle purchase, milking equipment, refrigeration chillers, and veterinary insurance.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex justify-between">
              <span>Cost: ₹2L – ₹15L</span>
              <span>10% Equity</span>
            </div>
          </SpotlightCard>

          {/* Sector 2: Kirana & Grocery */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Kirana & Retail Outlets
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Finances store fixtures, initial FMCG inventory stocking, POS billing terminals, and working capital.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-amber-600 dark:text-amber-400 flex justify-between">
              <span>Cost: ₹1L – ₹5L</span>
              <span>MFS Scheme</span>
            </div>
          </SpotlightCard>

          {/* Sector 3: Tailoring & Boutique */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Apparel & Tailoring
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Industrial sewing machines, embroidery tools, fabric stock. Eligible for Mahila Samriddhi 4% interest.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-rose-600 dark:text-rose-400 flex justify-between">
              <span>Special 4% Rate</span>
              <span>Women Focus</span>
            </div>
          </SpotlightCard>

          {/* Sector 4: E-Rickshaw & Transport */}
          <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              E-Rickshaw & Transport
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Battery-operated passenger rickshaws, mini goods carriers, charging units under Green Business schemes.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex justify-between">
              <span>Cost: ₹1.5L – ₹4L</span>
              <span>Green Lending</span>
            </div>
          </SpotlightCard>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. STEP-BY-STEP APPLICATION WORKFLOW */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-1.5 rounded-full">
            Standard Application Procedure
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            From Idea to Bank Submission in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Empowering applicants with thorough, bank-ready documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                01
              </span>
              <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Speak or Select Trade
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Use voice in Marathi, Hindi, or English to describe your business and location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                02
              </span>
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Algorithmic Loan Math
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Our engine applies 10% margin, 90% loan, interest subsidies, and 6–12 month moratorium.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                03
              </span>
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Download Official DPR
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get an instant, print-ready PDF containing executive summaries, cash flows, and balance sheets.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                04
              </span>
              <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-black text-sm text-slate-900 dark:text-white">
              Branch Submission
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Present your prepared DPR dossier directly to your local bank branch manager or DIC office.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. TRANSPARENCY & ETHICAL COMMITMENT BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1E3B] to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                100% Free & Open-Access Commitment
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              No Intermediary Commissions. No Fabricated Figures.
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Samarth AI does not charge fees to beneficiaries or act as an informal agent. All calculations adhere to public statutory guidelines issued by the Ministry of Social Justice & Empowerment and Stand-Up India.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              Deterministic & Auditable
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CALL TO ACTION STRIP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <BackgroundBeams />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Instant Turnaround
              </span>
              <span className="text-xs text-slate-300">Ready in 60 Seconds</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Prepare Your Bank DPR?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Voice-enabled in Marathi, Hindi, and English. Calculate margin, verify interest rates, and generate your loan dossier.
            </p>
          </div>

          <ShineButton
            onClick={() => handleFeatureAccess('/advisory')}
            variant="gold"
            className="shrink-0 px-7 py-3.5 text-xs sm:text-sm flex items-center gap-2 relative z-10"
          >
            <span>Start Business Advisory</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </ShineButton>
        </div>
      </section>

    </div>
  );
};

export default Home;
