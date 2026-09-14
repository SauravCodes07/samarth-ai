import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Store, 
  Milk, 
  Scissors, 
  Truck, 
  SunMedium, 
  Sprout,
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
  HelpCircle,
  Award
} from 'lucide-react';

const Home = () => {
  const { lang } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

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
    <div className="space-y-16 pb-16">
      
      {/* Hero Section with High-Impact Crisp Photographic Background & Modern Overlay */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[640px] flex items-center">
        {/* Crisp Photographic Background - 100% Sharp, Vibrant and Bold */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90 contrast-110 saturate-110"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        />
        {/* Sleek directional gradient so left text has crisp contrast while the right photo remains vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Official Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'mr' ? 'शासकीय सवलतीचे कर्ज व आर्थिक सल्लागार' : lang === 'hi' ? 'सरकारी रियायती लोन व वित्तीय सलाहकार' : 'National Concessional MSME Advisory'}
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {lang === 'mr' ? '१०% भांडवल • ९०% सरकारी कर्ज' : lang === 'hi' ? '10% मार्जिन • 90% सरकारी लोन' : '10% Margin • 90% Govt Loan'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {lang === 'mr' ? (
                  <>
                    आपल्या ग्रामीण उद्योगासाठी <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                      सरकारी कर्ज व बँक DPR
                    </span>
                  </>
                ) : lang === 'hi' ? (
                  <>
                    अपने ग्रामीण व्यवसाय हेतु <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                      सरकारी लोन व बैंक DPR
                    </span>
                  </>
                ) : (
                  <>
                    Empowering Rural MSMEs with <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                      Concessional Credit & DPR
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {lang === 'mr' ? (
                  'सामाजिक न्याय व एमएसएमई मंत्रालयाच्या नियमांनुसार फक्त १०% स्वतःचे भांडवल टाकून डेअरी, किराणा, शिलाई किंवा ई-रिक्षासाठी ९०% पर्यंत सरकारी कर्ज, ६ महिन्यांची हप्ता सवलत (मोरेटोरियम) आणि बँक-मान्य अहवाल मिळवा.'
                ) : lang === 'hi' ? (
                  'सामाजिक न्याय एवं अधिकारिता मंत्रालय (MoSJE) नियमों के तहत मात्र 10% मार्जिन पूंजी पर 90% सरकारी बैंक लोन, 6 माह का मोरेटोरियम (किश्त छूट) और आधिकारिक DPR रिपोर्ट प्राप्त करें।'
                ) : (
                  'Structure your business with 90% government concessional credit at 4%–8% interest, a 6-month moratorium period, and instant bank-compliant Detailed Project Reports (DPR).'
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleFeatureAccess('/advisory')}
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-102"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'mr' ? 'व्यवसाय अहवाल तयार करा' : lang === 'hi' ? 'व्यवहार्यता रिपोर्ट बनाएं' : 'Get AI Feasibility Study'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/schemes"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
                >
                  <span>{lang === 'mr' ? 'सर्व सरकारी योजना पहा' : lang === 'hi' ? 'सरकारी योजनाएं देखें' : 'Explore All Schemes'}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Ministry & Source Tag */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>{lang === 'mr' ? 'MyScheme.gov.in व MoSJE प्रमाणित' : lang === 'hi' ? 'MyScheme.gov.in व MoSJE सत्यापित' : 'Sourced from MyScheme & MoSJE'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'mr' ? '६-१२ महिने हप्ता सवलत' : lang === 'hi' ? '6-12 माह मोरेटोरियम' : '6–12 Months Moratorium'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Percent className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'mr' ? 'महिलांसाठी ४% विशेष दर' : lang === 'hi' ? 'महिला हेतु 4% विशेष दर' : '4% Special Women Rate'}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 30-Second Quick Estimator Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative overflow-hidden animate-fadeIn">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10" />

                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                      {lang === 'mr' ? 'त्वरित आर्थिक अंदाज' : lang === 'hi' ? 'त्वरित वित्तीय अनुमान' : 'Instant 30-Sec Calculator'}
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {lang === 'mr' ? '१०% भांडवलावर कर्ज तपासा' : lang === 'hi' ? '10% मार्जिन पर लोन देखें' : 'See What 10% Margin Unlocks'}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                </div>

                {/* Trade Selector */}
                <div className="space-y-2 mb-4">
                  <label className="block text-xs font-bold text-slate-700">
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
                          className={`flex items-center space-x-2 p-2 rounded-xl text-xs font-bold transition-all border text-left ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      {lang === 'mr' ? '२. एकूण प्रकल्प खर्च:' : lang === 'hi' ? '2. कुल प्रोजेक्ट लागत:' : '2. Total Project Cost:'}
                    </span>
                    <span className="font-black text-blue-700 text-sm">{formatINR(projectCost)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1500000"
                    step="25000"
                    value={projectCost}
                    onChange={(e) => setProjectCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>₹50,000</span>
                    <span>₹5,00,000</span>
                    <span>₹15,00,000</span>
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">
                      {lang === 'mr' ? 'आपले १०% स्वतःचे भांडवल:' : lang === 'hi' ? 'आपकी 10% मार्जिन पूंजी:' : 'Your 10% Margin Money:'}
                    </span>
                    <span className="font-black text-emerald-700 text-sm">{formatINR(marginRequired)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">
                      {lang === 'mr' ? 'सरकारी बँक कर्ज (९०%):' : lang === 'hi' ? 'सरकारी बैंक लोन (90%):' : 'Govt Bank Loan (90%):'}
                    </span>
                    <span className="font-black text-blue-700 text-sm">{formatINR(loanEligible)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t border-slate-200/80 pt-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">
                        {lang === 'mr' ? 'सवलतीचा व्याजदर' : lang === 'hi' ? 'रियायती ब्याज' : 'Interest Rate'}
                      </span>
                      <span className="font-bold text-slate-900">{estimatedRate}% p.a.</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">
                        {lang === 'mr' ? 'हप्ता सवलत (मोरेटोरियम)' : lang === 'hi' ? 'मोरेटोरियम छूट' : 'Moratorium'}
                      </span>
                      <span className="font-bold text-amber-700">6 {lang === 'mr' ? 'महिने' : lang === 'hi' ? 'माह' : 'Months'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">
                        {lang === 'mr' ? 'अंदाजे मासिक हप्ता' : lang === 'hi' ? 'अनुमानित EMI' : 'Monthly EMI'}
                      </span>
                      <span className="font-black text-slate-900">{formatINR(estimatedEmi)}</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA */}
                <button
                  type="button"
                  onClick={() => handleFeatureAccess('/advisory')}
                  className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>{lang === 'mr' ? 'संपूर्ण बँक अहवाल (DPR) काढा' : lang === 'hi' ? 'पूरी बैंक रिपोर्ट (DPR) निकालें' : 'Generate Full Bank DPR'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW USER ONBOARDING ROADMAP: "How It Works in 3 Simple Steps" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
            {lang === 'mr' ? 'नवीन वापरकर्त्यांसाठी सोपे मार्गदर्शक' : lang === 'hi' ? 'नए उपयोगकर्ताओं हेतु सरल मार्गदर्शक' : 'New to Samarth AI? Start Here'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            {lang === 'mr' ? '३ सोप्या टप्प्यांत सरकारी कर्ज मिळवा' : lang === 'hi' ? '3 सरल चरणों में सरकारी लोन व रिपोर्ट पाएं' : 'How It Works in 3 Simple Steps'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'mr' 
              ? 'कोणत्याही एजंट किंवा दलालाशिवाय थेट अधिकृत पोर्टलवरून मार्गदर्शन मिळवा' 
              : lang === 'hi' 
              ? 'बिना किसी दलाल या बिचौलिए के सीधे आधिकारिक पोर्टल से मार्गदर्शन प्राप्त करें' 
              : 'Zero middleman dependency. Structured strictly according to MoSJE & MyScheme norms.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  1
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {lang === 'mr' ? 'प्रारंभ' : lang === 'hi' ? 'शुरुआत' : 'Start'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                {lang === 'mr' ? '१. व्यवसाय व कल्पना निवडा' : lang === 'hi' ? '1. व्यवसाय व ट्रेड चुनें' : '1. Choose Your Trade'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lang === 'mr' 
                  ? 'डेअरी फार्म, किराणा दुकान, शिलाई बुटीक, ई-रिक्षा किंवा सोलर यापैकी आपला पसंतीचा व्यवसाय निवडा किंवा आवाजाने सांगा.' 
                  : lang === 'hi' 
                  ? 'डेयरी फार्म, किराना दुकान, सिलाई बुटीक, ई-रिक्शा या सोलर में से अपना व्यवसाय चुनें अथवा बोलकर बताएं।' 
                  : 'Select from high-demand rural trades like Dairy, Kirana, Tailoring, or Transport—or use our voice input.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{lang === 'mr' ? 'आवाजाने किंवा १-क्लिकमध्ये' : lang === 'hi' ? 'बोलकर या 1-क्लिक में' : 'Voice-enabled or 1-click'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  2
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {lang === 'mr' ? '१०% भांडवल' : lang === 'hi' ? '10% मार्जिन' : '10% Margin'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                {lang === 'mr' ? '२. स्वतःचे १०% भांडवल टाका' : lang === 'hi' ? '2. 10% उपलब्ध मार्जिन डालें' : '2. Enter Your 10% Margin'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lang === 'mr' 
                  ? 'आपल्याकडे असलेली बचत प्रविष्ट करा. आमचे अल्गोरिदम त्यावरून ९०% सरकारी कर्ज आणि अचूक हप्ता (EMI) काढते.' 
                  : lang === 'hi' 
                  ? 'अपनी उपलब्ध बचत दर्ज करें। हमारा एल्गोरिदम तुरंत 90% सरकारी लोन और सटीक मासिक किश्त की गणना करता है।' 
                  : 'Enter your savings. Our deterministic engine calculates your 90% government loan eligibility and 4%–8% interest rate.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{lang === 'mr' ? '६ महिने हप्ता सवलत समाविष्ट' : lang === 'hi' ? '6 माह मोरेटोरियम शामिल' : 'Includes 6-month moratorium'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  3
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {lang === 'mr' ? 'बँक DPR' : lang === 'hi' ? 'बैंक DPR' : 'Bank DPR'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                {lang === 'mr' ? '३. बँक-योग्य DPR अहवाल मिळवा' : lang === 'hi' ? '3. बैंक-योग्य DPR रिपोर्ट पाएं' : '3. Get Bank-Ready DPR'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lang === 'mr' 
                  ? 'जिल्हा उद्योग केंद्र (DIC) किंवा बँकेत सादर करण्यासाठी अधिकृत प्रकल्प अहवाल (DPR) आणि अर्ज मार्गदर्शक डाऊनलोड करा.' 
                  : lang === 'hi' 
                  ? 'जिला उद्योग केंद्र (DIC) या बैंक में जमा करने हेतु आधिकारिक प्रोजेक्ट रिपोर्ट (DPR) और आवेदन गाइड तुरंत प्राप्त करें।' 
                  : 'Download your official Detailed Project Report (DPR) with SWOT analysis and step-by-step JanSamarth application guide.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{lang === 'mr' ? '१००% मोफत व प्रमाणित' : lang === 'hi' ? '100% निःशुल्क व सत्यापित' : '100% Free & Verified'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Verified Govt Schemes Showcase Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {lang === 'mr' ? 'थेट अधिकृत डेटा' : lang === 'hi' ? 'सीधे आधिकारिक डेटा' : 'Official Portal Sync'}
              </span>
              <span className="text-xs text-slate-300">MyScheme.gov.in & NBCFDC</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              {lang === 'mr' ? '११+ सत्यापित शासकीय योजनांची निर्देशिका' : lang === 'hi' ? '11+ सत्यापित सरकारी योजनाओं की डायरेक्टरी' : 'Explore 11+ Verified Government Credit Schemes'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {lang === 'mr' 
                ? 'महिला समृद्धी (४%), मायक्रो फायनान्स (६.५%), लघु व्यवसाय योजना आणि पीएमईजीपी योजनांचे संपूर्ण निकष व अधिकृत लिंक्स.' 
                : lang === 'hi' 
                ? 'महिला समृद्धि (4%), माइक्रो फाइनेंस (6.5%), लघु व्यवसाय योजना और पीएमईजीपी की आधिकारिक पात्रता व सरकारी लिंक्स।' 
                : 'Full details on Mahila Samriddhi (4%), Micro Finance (6.5%), Term Loans (8%), and AHIDF with verified official portal links.'}
            </p>
          </div>

          <Link
            to="/schemes"
            className="shrink-0 px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
          >
            <span>{lang === 'mr' ? 'योजना निर्देशिका उघडा' : lang === 'hi' ? 'योजना डायरेक्टरी खोलें' : 'Browse Schemes Directory'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
