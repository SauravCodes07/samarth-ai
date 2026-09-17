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
  Calendar,
  Layers,
  MapPin,
  ChevronRight,
  BarChart3,
  FileCheck,
  Compass,
  Coins,
  BadgeCheck,
  Clock,
  Award,
  Landmark,
  Users,
  Briefcase,
  FileText,
  Check,
  ExternalLink,
  SunMedium,
  Sprout,
  HelpCircle,
  Building,
  UserCheck
} from 'lucide-react';

const Home = () => {
  const { lang } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, immediately redirect to schemes directory without ever rendering landing page
  if (user) {
    return <Navigate to="/schemes" replace />;
  }

  const handleFeatureAccess = (path = '/advisory') => {
    if (!user) {
      openAuthModal('login');
    } else {
      navigate(path);
    }
  };

  // Interactive Quick Estimator
  const [selectedTrade, setSelectedTrade] = useState('dairy');
  const [projectCost, setProjectCost] = useState(250000); // 2.5 Lakhs default

  const marginRequired = Math.round(projectCost * 0.10);
  const loanEligible = Math.round(projectCost * 0.90);

  // Interest rate estimation
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

  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION: High-Impact National Header with Photography & Modern Overlay */}
      <section className="relative overflow-hidden bg-[#071328] text-white min-h-[660px] flex items-center pt-8 pb-16">
        {/* Background photo & directional gradients */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061226] via-[#081938]/95 to-[#0B2A5E]/80 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071328] via-transparent to-black/30 z-0" />
        
        <BackgroundBeams />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission Statement & Direct Action */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Government of India Crest Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-blue-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-xs">
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>Government of India • Stand-Up & Scale-Up Initiative</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar"></span>
                  <span>10% Margin • 90% Concessional Credit</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                {lang === 'mr' ? (
                  <>
                    ग्रामीण व वंचित उद्योजकांसाठी <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      शासकीय कर्ज व बँक DPR
                    </span>
                  </>
                ) : lang === 'hi' ? (
                  <>
                    अनुसूचित जाति, जनजाति व महिलाओं हेतु <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      रियायती बैंक ऋण एवं आधिकारिक DPR
                    </span>
                  </>
                ) : (
                  <>
                    Catalyzing Grassroots Enterprise with <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      Concessional Credit & Bank DPR
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                {lang === 'mr' ? (
                  'सामाजिक न्याय व अधिकारिता मंत्रालय (MoSJE) आणि स्टँड-अप इंडिया धोरणानुसार फक्त १०% स्वतःचे भांडवल टाकून डेअरी, किराणा, शिलाई किंवा ई-रिक्षासाठी ९०% पर्यंत सरकारी कर्ज, ६ ते १२ महिन्यांची हप्ता सवलत (मोरेटोरियम) आणि बँक-मान्य अहवाल त्वरित मिळवा.'
                ) : lang === 'hi' ? (
                  'सामाजिक न्याय एवं अधिकारिता मंत्रालय (MoSJE) एवं स्टैंड-अप इंडिया दिशा-निर्देशों के अंतर्गत मात्र 10% मार्जिन पूंजी पर 90% तक सरकारी ऋण, 4% से 8% वार्षिक ब्याज दर, 6 से 12 माह की किश्त छूट (मोरेटोरियम) और आधिकारिक बैंक-मान्य DPR रिपोर्ट प्राप्त करें।'
                ) : (
                  'Accelerating economic independence for SC/ST and Women micro-entrepreneurs. Access 90% government concessional credit at 4%–8% p.a., 6–12 months moratorium holiday, and instant bank-compliant Detailed Project Reports.'
                )}
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <ShineButton
                  onClick={() => handleFeatureAccess('/advisory')}
                  variant="gold"
                  className="space-x-2 px-6 py-3.5 text-sm shadow-xl"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span className="font-extrabold text-slate-950">{lang === 'mr' ? 'व्यवसाय अहवाल तयार करा' : lang === 'hi' ? 'व्यवहार्यता रिपोर्ट बनाएं' : 'Generate Bank DPR'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </ShineButton>

                <button
                  type="button"
                  onClick={() => handleFeatureAccess('/schemes')}
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-5 py-3.5 rounded-xl text-sm transition-all cursor-pointer backdrop-blur-xs shadow-md"
                >
                  <span>{lang === 'mr' ? 'सर्व शासकीय योजना पहा' : lang === 'hi' ? 'सभी सरकारी योजनाएं देखें' : 'Explore All Schemes'}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Verification Pills */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>MyScheme.gov.in & NSFDC Verified</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>6–12 Months Moratorium Relief</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Percent className="w-4 h-4 text-cyan-400" />
                  <span>4% Special Women Concession</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 30-Second Quick Estimator Card */}
            <div className="lg:col-span-5">
              <SpotlightCard className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 card-glow-interactive animate-fadeIn transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                      {lang === 'mr' ? 'त्वरित आर्थिक अंदाज' : lang === 'hi' ? 'त्वरित वित्तीय अनुमान' : 'Instant 30-Sec Calculator'}
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {lang === 'mr' ? '१०% भांडवलावर कर्ज तपासा' : lang === 'hi' ? '10% मार्जिन पर लोन देखें' : 'See What 10% Margin Unlocks'}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <Calculator className="w-5 h-5" />
                  </div>
                </div>

                {/* Trade Selector */}
                <div className="space-y-2 mb-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {lang === 'mr' ? '१. प्रस्तावित व्यवसाय निवडा:' : lang === 'hi' ? '1. प्रस्तावित व्यवसाय चुनें:' : '1. Select Business Trade:'}
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
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
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
                    <span className="text-slate-600 dark:text-slate-400">
                      {lang === 'mr' ? 'आपले १०% स्वतःचे भांडवल:' : lang === 'hi' ? 'आपकी 10% मार्जिन पूंजी:' : 'Your 10% Margin Money:'}
                    </span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">{formatINR(marginRequired)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">
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

      {/* 2. FLOATING NATIONAL IMPACT METRICS DASHBOARD (STAND-UP INDIA STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-md standup-card-hover transition-colors">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">
                  National Stand-Up India & Concessional Lending Repository
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                Live National Impact & Inclusion Snapshot
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real-Time Government Data Sync</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Metric 1 */}
            <div className="flex flex-col items-center text-center space-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                299,274+
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Total Citizen Applications
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center text-center space-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                ₹62,790.47 Cr
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Sanctioned Credit Unlocked
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center text-center space-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                275,291+
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Bank DPRs Formatted
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center text-center space-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
                24,613+
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Handholding DIC Agencies
              </span>
            </div>

            {/* Metric 5 */}
            <div className="flex flex-col items-center text-center space-y-1 group pt-2 sm:pt-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                156,896+
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Lead Bank Branches Connected
              </span>
            </div>

            {/* Metric 6 */}
            <div className="flex flex-col items-center text-center space-y-1 group pt-2 sm:pt-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
                71+
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Scheduled Lenders Onboarded
              </span>
            </div>

            {/* Metric 7 */}
            <div className="flex flex-col items-center text-center space-y-1 group pt-2 sm:pt-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Percent className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight">
                10%
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Fixed Margin Capital Rule
              </span>
            </div>

            {/* Metric 8 */}
            <div className="flex flex-col items-center text-center space-y-1 group pt-2 sm:pt-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
                6 – 12 Mo
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Repayment Moratorium Relief
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. "WHAT IS SAMARTH AI / STAND-UP INDIA" DEEP CURVED WAVE CONTAINER */}
      <section className="relative bg-gradient-to-r from-[#071938] via-[#0B2545] to-[#0A1A36] text-white py-16 px-4 sm:px-6 lg:px-8 my-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-md">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Mandated by MoSJE & Stand-Up India Guidelines
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              What is Samarth AI?
            </h2>
          </div>

          <div className="max-w-2xl text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
            <p>
              <strong>Samarth AI</strong> automates and operationalizes the Government of India’s concessional credit policy for Scheduled Castes (SC), Scheduled Tribes (ST), and Women entrepreneurs for setting up greenfield micro-enterprises.
            </p>
            <p>
              Under MoSJE and Stand-Up India norms, the borrower is strictly required to bring in only <strong>10% margin money</strong>. The remaining <strong>90% is financed via government-concessional bank loans</strong> at interest rates between 4% and 8%, with a guaranteed 6 to 12-month moratorium period.
            </p>
            <p className="text-blue-200 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full compliance with JanSamarth, NSFDC, NBCFDC, and lead district banking guidelines.</span>
            </p>
          </div>

        </div>
      </section>

      {/* 4. SALIENT FEATURES (INSPIRED BY STAND-UP INDIA ₹ GRAPHIC & 6 FEATURE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-1.5 rounded-full">
            Institutional Lending Guidelines
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            Salient Features of Concessional Schemes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Standardized parameters eliminating arbitrary bank demands and ensuring 100% statutory transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual ₹ (Rupee) Mosaic Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl standup-card-hover">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#0B3D91] via-blue-600 to-amber-500 text-white flex items-center justify-center text-6xl sm:text-7xl font-black shadow-2xl mx-auto animate-float-slow">
                ₹
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Empowering 100,000+ Rural Founders
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  From dairy farmers in Bhandara to women tailoring collectives in Pune, unlocking direct institutional debt.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-center">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs">
                  <span className="block text-xs font-black text-blue-600 dark:text-blue-400">10%</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Margin</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs">
                  <span className="block text-xs font-black text-amber-600 dark:text-amber-400">4% - 8%</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Interest</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs">
                  <span className="block text-xs font-black text-emerald-600 dark:text-emerald-400">6–12 M</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Holiday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Salient Feature Badges in 3x2 Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-sm standup-card-hover space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Borrower Type
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                SC, ST, and Women micro-entrepreneurs above 18 years seeking productive self-employment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-sm standup-card-hover space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Enterprise Nature
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Greenfield micro-units in manufacturing, trading, services, and allied agricultural sectors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-sm standup-card-hover space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Loan Size
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Concessional micro-credit assistance from ₹10,000 up to ₹50 Lakhs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-sm standup-card-hover space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Nature of Loan
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Composite loan (term loan + working capital) with 3 to 7 years repayment tenure.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-sm standup-card-hover space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Promoter Contribution
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Strict 10% Margin Money rule. Government covers remaining 90% project cost.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-sm standup-card-hover space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Security Guarantee
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Credit Guarantee Fund under CGTMSE / NSFDC. Zero third-party collateral required up to ₹10 Lakhs.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. KEY ELEMENTS RADIAL HEXAGONAL WHEEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3.5 py-1.5 rounded-full">
            Core Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            Key Elements of the Samarth Ecosystem
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 standup-card-hover shadow-xs">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs inline-flex items-center justify-center">
              01
            </span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Scheme Directory</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">MoSJE, NSFDC & NBCFDC schemes matched by trade</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 standup-card-hover shadow-xs">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs inline-flex items-center justify-center">
              02
            </span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Size of Loan</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Assistance from ₹10K up to ₹50 Lakhs</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 standup-card-hover shadow-xs">
            <span className="w-7 h-7 rounded-full bg-cyan-600 text-white font-black text-xs inline-flex items-center justify-center">
              03
            </span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Purpose of Loan</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Dairy, retail, tailoring, machinery purchase & transport</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 standup-card-hover shadow-xs">
            <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-black text-xs inline-flex items-center justify-center">
              04
            </span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Greenfield DPR</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Bank-ready project feasibility reports generated in 60 seconds</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 standup-card-hover shadow-xs">
            <span className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs inline-flex items-center justify-center">
              05
            </span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Bank Branch Sync</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Mapped to Lead District Managers & DIC across all 782 districts</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 standup-card-hover shadow-xs">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs inline-flex items-center justify-center">
              06
            </span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Credit Guarantee</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">CGTMSE underwriting with zero third-party collateral</p>
          </div>

        </div>

      </section>

      {/* 6. INSTITUTIONAL ECOSYSTEM ARCHITECTURE FLOWCHART */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              National Integration Map
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Institutional Delivery Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              How Samarth AI connects grassroots beneficiaries with public sector banks, district leadership, and training agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Bank Branches Column */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block text-center md:text-left">
                Financial Institutions
              </span>
              {['State Bank of India (SBI)', 'Bank of Baroda', 'Punjab National Bank (PNB)', 'Union Bank / Canara Bank'].map((bank, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2 shadow-2xs">
                  <Landmark className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate">{bank}</span>
                </div>
              ))}
            </div>

            {/* Lead District Manager Node */}
            <div className="md:col-span-3 flex flex-col items-center justify-center p-6 bg-blue-600 text-white rounded-3xl shadow-xl space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-base">Lead District Manager</h4>
                <span className="text-xs text-blue-100 block">782 Districts across 36 States/UTs</span>
              </div>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                Coordinates branch allocation, target progress, and JanSamarth grievance tracking.
              </p>
            </div>

            {/* Central Agencies Connect */}
            <div className="md:col-span-2 flex flex-col space-y-3">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl text-center space-y-1">
                <Building2 className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto" />
                <span className="font-black text-xs text-rose-950 dark:text-rose-200 block">SIDBI / NABARD</span>
                <span className="text-[10px] text-rose-700 dark:text-rose-300">Apex Refinance Agency</span>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-1">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <span className="font-black text-xs text-emerald-950 dark:text-emerald-200 block">MoSJE & SCA</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300">Concessional Lending</span>
              </div>
            </div>

            {/* Grassroots Facilitation Agencies */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Grassroots Facilitation Agencies
              </span>
              {[
                { num: '01', title: 'Rural Self Employment Training (RSETI)' },
                { num: '02', title: 'District Industries Centers (DIC) across India' },
                { num: '03', title: 'MSME Development & Facilitation Offices' },
                { num: '04', title: 'State SC/ST Finance & Devp. Corporations' },
                { num: '05', title: 'Dalit Indian Chamber of Commerce (DICCI)' },
                { num: '06', title: 'Women Entrepreneurial Associations & SHGs' }
              ].map((item, i) => (
                <div key={i} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs flex items-center space-x-2.5 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-black text-[10px] flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. HOW TO APPLY (5-STEP PROCESS PIPELINE MATCHING STAND-UP INDIA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-1.5 rounded-full">
            Standard Application Procedure
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            How to Apply in 5 Easy Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Seamless journey from initial idea to verified bank sanction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/80 shadow-md standup-card-hover flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  01
                </span>
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                User Registration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Create your verified profile with mobile & email to unlock government benefits.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>Instant in 10s</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/80 shadow-md standup-card-hover flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  02
                </span>
                <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Business Input
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Select trade (Dairy, Kirana, Boutique, Transport) and enter your district.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>Voice-enabled</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/80 shadow-md standup-card-hover flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  03
                </span>
                <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Scheme & EMI Match
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                System matches statutory schemes, calculates 10% margin, and maps 90% loan.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>100% Algorithmic</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/80 shadow-md standup-card-hover flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  04
                </span>
                <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Bank DPR Download
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Download bank-compliant Detailed Project Report PDF with complete credit appraisal.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>Bank-grade PDF</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/80 shadow-md standup-card-hover flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  05
                </span>
                <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Sanction & Credit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Submit directly to your Lead Bank Branch or DIC office for concessional sanction.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>Disbursement</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* 8. IMPACT STORIES & BENEFICIARY TESTIMONIALS (MATCHING STAND-UP INDIA SLIDER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2545] via-[#0F3562] to-[#0A1F3B] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden space-y-8">
          <BackgroundBeams />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Grassroots Transformations
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Real Impact Stories
            </h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Hear from genuine Indian micro-entrepreneurs who leveraged MoSJE concessional credit and Samarth DPRs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Story 1 */}
            <div className="bg-white/95 text-slate-900 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Bhandara, Maharashtra</span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Varun Aquapure & Chilling Unit
                </h3>
                <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Agro-Processing & Dairy
                </span>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  "Samarth AI calculated our 10% margin capital and generated a bank-ready DPR in 2 minutes. Bank of India approved our ₹12.5 Lakh loan with 6 months moratorium holiday."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 font-medium">Loan Sanctioned</span>
                <span className="text-emerald-700 font-black">₹12,50,000 (90%)</span>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white/95 text-slate-900 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Pune, Maharashtra</span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Kiran Devi Tailoring Collective
                </h3>
                <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Women SHG • 4% Interest
                </span>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  "Under Mahila Samriddhi Yojana, we unlocked the 4% concessional interest rate. Our 8-member women group purchased industrial sewing equipment with zero collateral stress."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 font-medium">Concessional Rate</span>
                <span className="text-amber-700 font-black">4.0% per annum</span>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white/95 text-slate-900 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Nagpur, Maharashtra</span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Green Bio-Energy & Transport
                </h3>
                <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  E-Rickshaw Fleet • Green Scheme
                </span>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  "The Green Business Scheme matched our electric mobility proposal. With 10% self-contribution, we deployed 5 battery-operated vehicles across the tehsil."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 font-medium">Moratorium Period</span>
                <span className="text-blue-700 font-black">9 Months</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <BackgroundBeams />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                100% Free & Direct
              </span>
              <span className="text-xs text-slate-300">MyScheme & MoSJE Certified</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Formulate Your Business DPR?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Takes less than 60 seconds. Voice-enabled in Marathi, Hindi, and English.
            </p>
          </div>

          <ShineButton
            onClick={() => handleFeatureAccess('/advisory')}
            variant="gold"
            className="shrink-0 px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2 relative z-10"
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
