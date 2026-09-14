import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
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
  FileCheck
} from 'lucide-react';

const Home = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Quick interactive estimator state
  const [projectCost, setProjectCost] = useState(200000); // 2 Lakhs default

  const marginRequired = Math.round(projectCost * 0.10);
  const loanEligible = Math.round(projectCost * 0.90);

  // Interest rate estimation
  let estimatedRate = 6.0;
  let recommendedScheme = 'Laghu Vyavasay Yojana (LVY)';
  if (projectCost <= 140000) {
    estimatedRate = 5.0;
    recommendedScheme = 'Micro Finance Scheme (MFS)';
  } else if (projectCost > 500000) {
    estimatedRate = 7.0;
    recommendedScheme = 'Term Loan Scheme (TLS) - Tier 1';
  }

  // Monthly EMI estimation (Rough annuity)
  const tenureYears = projectCost <= 140000 ? 3 : 5;
  const monthlyRate = (estimatedRate / 100) / 12;
  const totalMonths = tenureYears * 12;
  const estimatedEmi = Math.round(
    (loanEligible * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const businessCategories = [
    {
      id: 'dairy',
      titleEn: 'Dairy & Animal Husbandry',
      titleHi: 'डेयरी व पशुपालन फार्म',
      descEn: 'Cattle purchase, shed construction, chilling & milking equipment.',
      descHi: 'दुधारू पशु, शेड निर्माण एवं आधुनिक मिल्किंग उपकरण।',
      margin: '₹14,000+',
      range: '₹1.4L – ₹15L',
      scheme: 'Micro Finance / Term Loan',
      icon: Milk,
      color: 'blue'
    },
    {
      id: 'grocery',
      titleEn: 'Retail Kirana & Daily Needs',
      titleHi: 'किराना व प्रोविजन स्टोर',
      descEn: 'Inventory stocking, POS billing counters, cold storage display.',
      descHi: 'दुकान इन्वेंटरी, बिलिंग काउंटर एवं रेफ्रिजरेटर उपकरण।',
      margin: '₹10,000+',
      range: '₹1L – ₹5L',
      scheme: 'Laghu Vyavasay (LVY)',
      icon: Store,
      color: 'amber'
    },
    {
      id: 'tailoring',
      titleEn: 'Tailoring & Boutique (Women Special)',
      titleHi: 'सिलाई व बुटीक केंद्र (महिला विशेष)',
      descEn: 'Commercial sewing machines, embroidery tools, fabric stock at 4% interest.',
      descHi: 'सिलाई मशीन, कढ़ाई उपकरण एवं कपड़ा स्टॉक — मात्र 4% वार्षिक ब्याज।',
      margin: '₹5,000+',
      range: '₹50K – ₹1.4L',
      scheme: 'Mahila Samriddhi (4% p.a.)',
      icon: Scissors,
      color: 'rose'
    },
    {
      id: 'transport',
      titleEn: 'E-Rickshaw & Green Fleet',
      titleHi: 'ई-रिक्शा व स्वच्छ वाहन सेवा',
      descEn: 'Battery operated cargo/passenger rickshaws and solar charging setups.',
      descHi: 'बैटरी ई-रिक्शा, कार्गो लोडर एवं सोलर चार्जिंग यूनिट।',
      margin: '₹15,000+',
      range: '₹1.5L – ₹10L',
      scheme: 'Green Business Scheme',
      icon: Truck,
      color: 'emerald'
    },
    {
      id: 'green',
      titleEn: 'Solar & Renewable Tech',
      titleHi: 'सोलर पंप व हरित ऊर्जा उद्यम',
      descEn: 'Solar irrigation pumps, bio-gas digesters, organic fertilizer units.',
      descHi: 'सोलर सिंचाई पंप, बायोगैस यूनिट व जैविक खाद उत्पादन।',
      margin: '₹20,000+',
      range: '₹2L – ₹30L',
      scheme: 'Green Business Scheme',
      icon: SunMedium,
      color: 'teal'
    },
    {
      id: 'agri',
      titleEn: 'Agro-Processing & Flour/Oil Mills',
      titleHi: 'आटा/तेल मिल व कृषि प्रसंस्करण',
      descEn: 'Mini grain mills, cold-pressed oil extractors, spice grinding units.',
      descHi: 'मिनी आटा-दलिया मिल, तेल निष्कर्षण एवं मसाला पिसाई इकाइयां।',
      margin: '₹50,000+',
      range: '₹5L – ₹25L',
      scheme: 'Term Loan Tier 1 & 2',
      icon: Sprout,
      color: 'indigo'
    }
  ];

  const handleLaunchAdvisory = (categoryTitle) => {
    navigate('/advisory', { state: { prefilledBusiness: categoryTitle } });
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-white border-b border-slate-200/80 bg-grid-pattern">
        
        {/* Soft Ambient Radial Blur Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-400/10 via-indigo-500/10 to-teal-400/10 blur-3xl -z-10 pointer-events-none rounded-full animate-subtle-pulse" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Subtle Institutional Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50/70 text-blue-800 text-xs font-semibold mb-6 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span>
              {lang === 'hi'
                ? 'राष्ट्रीय सूक्ष्म उद्यम वित्तीय सलाहकार प्रणाली • 100% सटीक गणित'
                : 'National Enterprise Financial Advisory • 10% Margin Capital Architecture'}
            </span>
          </div>

          {/* Clean Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
            {lang === 'hi' ? (
              <>
                10% मार्जिन पूंजी से शुरू करें अपना उद्यम,{' '}
                <span className="text-gradient-primary">90% रियायती सरकारी ऋण</span> के साथ
              </>
            ) : (
              <>
                Unlock Concessional Capital for Your Enterprise with{' '}
                <span className="text-gradient-primary">10% Margin Money</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {lang === 'hi'
              ? 'ग्रामीण व अर्ध-शहरी सूक्ष्म उद्यमियों के लिए संस्थागत स्तर का वित्तीय सलाहकार। अपनी पूंजी दर्ज करें और 5–10 किमी बाजार पहुंच, SWOT व सरकारी स्कीमों की बैंक-रेडी वित्तीय योजना प्राप्त करें।'
              : 'Institutional-grade business advisory for micro-entrepreneurs. Structure low-interest loans, calculate amortization schedules, and get AI-driven 5–10km hyper-local market feasibility.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/advisory"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{lang === 'hi' ? 'एआई व्यवहार्यता रिपोर्ट शुरू करें' : 'Generate Feasibility Report'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/calculator"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-2xs hover:border-slate-400"
            >
              <Calculator className="w-4 h-4 text-slate-600" />
              <span>{lang === 'hi' ? '10% मार्जिन कैलकुलेटर' : 'Smart Loan Calculator'}</span>
            </Link>

            <Link
              to="/schemes"
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 px-4 py-3.5 font-semibold text-sm transition-colors"
            >
              <span>{lang === 'hi' ? 'सभी योजनाएं देखें' : 'Explore All Schemes'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Pillars Metric Strip */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">10%</span>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {lang === 'hi' ? 'आवश्यक मार्जिन पूंजी' : 'Entrepreneur Margin'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">4% – 8%</span>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {lang === 'hi' ? 'रियायती वार्षिक ब्याज दर' : 'Concessional Interest'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-blue-600">3–6 माह</span>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {lang === 'hi' ? 'प्रारंभिक मोरेटोरियम' : 'Moratorium Grace Period'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-600">100% मुफ़्त</span>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {lang === 'hi' ? 'शून्य दलाली व शुल्क' : 'Direct Official Routing'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Quick-Estimator Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'लाइव त्वरित वित्तीय संरचना' : 'Live Quick Estimator'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {lang === 'hi' 
                  ? 'अपनी आवश्यक परियोजना लागत चुनें' 
                  : 'Select Your Target Project Cost'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {lang === 'hi'
                  ? 'देखें आपको केवल कितनी मार्जिन पूंजी चाहिए और 90% सरकारी लोन पर कितनी ईएमआई बनेगी।'
                  : 'Instantly calculate your 10% self-contribution, 90% debt coverage, and estimated monthly EMI.'}
              </p>
            </div>
            
            <Link
              to="/calculator"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-2 rounded-lg transition-colors self-start md:self-auto"
            >
              <span>{lang === 'hi' ? 'विस्तृत कैलकुलेटर खोलें' : 'Advanced Amortization Table'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider Control */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {lang === 'hi' ? 'कुल परियोजना लागत' : 'Total Project Cost'}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-700">
                  ₹{projectCost.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min="20000"
                max="2500000"
                step="10000"
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>₹20,000 (Micro)</span>
                <span>₹5,00,000 (Small)</span>
                <span>₹25,00,000 (Enterprise)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  {lang === 'hi' ? 'सुझावित रियायती स्कीम:' : 'Recommended Concessional Scheme:'}
                </span>
                <span className="font-bold text-slate-900 text-right">{recommendedScheme}</span>
              </div>
            </div>

            {/* Computed Breakdown Output */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-3">
              <div className="bg-blue-50/70 border border-blue-200/60 p-4 rounded-xl text-center">
                <span className="block text-[11px] font-semibold uppercase text-blue-700">
                  {lang === 'hi' ? 'आपकी पूंजी (10%)' : 'Margin (10%)'}
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900 mt-1 block">
                  ₹{marginRequired.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {lang === 'hi' ? 'उद्यमी का योगदान' : 'Self Contribution'}
                </span>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 p-4 rounded-xl text-center">
                <span className="block text-[11px] font-semibold uppercase text-emerald-700">
                  {lang === 'hi' ? 'सरकारी ऋण (90%)' : 'Govt Loan (90%)'}
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900 mt-1 block">
                  ₹{loanEligible.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {estimatedRate}% {lang === 'hi' ? 'वार्षिक ब्याज' : 'Interest Rate'}
                </span>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/60 p-4 rounded-xl text-center">
                <span className="block text-[11px] font-semibold uppercase text-amber-700">
                  {lang === 'hi' ? 'मासिक ईएमआई' : 'Monthly EMI'}
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900 mt-1 block">
                  ₹{estimatedEmi.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {tenureYears} {lang === 'hi' ? 'वर्ष अवधि' : 'Years Tenure'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Target Business Verticals Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'hi' ? 'लोकप्रिय उद्यम श्रेणियां' : 'Supported Micro-Enterprise Verticals'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {lang === 'hi'
              ? 'प्रत्येक श्रेणी के लिए 90% तक सरकारी ऋण, विशेष महिला सब्सिडी और 5–10 किमी बाजार व्यवहार्यता अध्ययन उपलब्ध है।'
              : 'Pre-configured financial models with verified government concessional funding limits.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businessCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="card-premium p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between group cursor-pointer"
                onClick={() => handleLaunchAdvisory(lang === 'hi' ? cat.titleHi : cat.titleEn)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {cat.range}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {lang === 'hi' ? cat.titleHi : cat.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                    {lang === 'hi' ? cat.descHi : cat.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {lang === 'hi' ? 'मार्जिन:' : 'Margin:'}{' '}
                    <strong className="text-slate-800">{cat.margin}</strong>
                  </span>
                  <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>{lang === 'hi' ? 'अध्ययन करें' : 'Feasibility'}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Capabilities 3 Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800/80 px-3 py-1 rounded-full">
              {lang === 'hi' ? 'संस्थागत वास्तुकला' : 'Core Architecture'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">
              {lang === 'hi' 
                ? 'सिर्फ जानकारी नहीं, बैंक-रेडी वित्तीय रणनीति' 
                : 'Not Just Information — Bank-Ready Financial Strategy'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">
                {lang === 'hi' ? 'सटीक गणितीय संरचना' : 'Deterministic Loan Structuring'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'सरकारी दिशा-निर्देशों के आधार पर 10% मार्जिन, 90% लोन शेयर, त्रैमासिक भुगतान चक्र और महिला उद्यमियों के लिए 1% तक ब्याज छूट।'
                  : 'Calculates exact 10% margin, 90% debt share, quarterly repayment cycles, and women enterprise interest rebates per official norms.'}
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">
                {lang === 'hi' ? '5–10 किमी हाइपर-लोकल व्यवहार्यता' : 'Hyper-Local Feasibility (5-10km)'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'स्थानीय बाजार पहुंच, कच्चा माल उपलब्धता, प्रतिस्पर्धी घनत्व, यूनिट लागत व विस्तृत SWOT विश्लेषण की एआई आधारित रिपोर्ट।'
                  : 'AI evaluates regional catchment radius, raw material access, competitive density, and delivers an actionable SWOT report.'}
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">
                {lang === 'hi' ? 'सत्यापित सरकारी स्कीमें' : 'Verified Direct Scheme Routing'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'NSFDC, मुद्रा, PMEGP, स्टैंड-अप इंडिया जैसी केंद्रीय व राज्य योजनाओं से स्वचालित मिलान और आधिकारिक पोर्टल लिंक।'
                  : 'Direct routing to authentic schemes with zero middlemen fees and verified ministry guidelines in Supabase.'}
              </p>
            </div>

          </div>

          <div className="mt-10 text-center relative z-10">
            <Link
              to="/advisory"
              className="inline-flex items-center space-x-2 bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
            >
              <span>{lang === 'hi' ? 'अभी अपना प्रोजेक्ट प्लान तैयार करें' : 'Create Your Business Feasibility Plan'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
