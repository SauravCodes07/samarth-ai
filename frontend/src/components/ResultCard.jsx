import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  CheckCircle2, 
  IndianRupee, 
  Percent, 
  Calendar, 
  Clock, 
  TrendingUp, 
  FileDown, 
  RotateCcw, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Landmark,
  Layers,
  Volume2,
  VolumeX,
  MapPin,
  Compass,
  Target,
  Users,
  Building2,
  AlertTriangle,
  ArrowRight,
  PieChart,
  Tag,
  Store,
  ExternalLink,
  Sliders,
  Activity,
  Gauge,
  BarChart3
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { speakText, stopSpeaking } from '../utils/speechUtils';
import DistrictFinder from './DistrictFinder';

const ResultCard = ({ data, onReset, userState = "Uttar Pradesh", userDistrict = "" }) => {
  const { lang } = useLanguage();
  const reportRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('hyperlocal'); // 'hyperlocal', 'financial', 'actionplan', 'simulator'
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Interactive What-If Simulator States
  const [simPriceMult, setSimPriceMult] = useState(1.0);
  const [simVolumeMult, setSimVolumeMult] = useState(1.0);
  const [simExpRatio, setSimExpRatio] = useState(50);
  const [simMarginPercent, setSimMarginPercent] = useState(data?.loan_structure?.margin_percent || 10);
  const [simTenureYears, setSimTenureYears] = useState(data?.loan_structure?.tenure_years || 5);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  if (!data) return null;

  const {
    matched_scheme = {},
    alternate_schemes = [],
    loan_structure = {},
    business_viability = {},
    hyper_local_feasibility = {},
    ai_advisory_text = '',
    ai_advisory_text_hi = '',
    business_action_plan = [],
    business_action_plan_hi = [],
    application_steps = [],
    application_steps_hi = [],
    disclaimer = 'Institutional AI-assisted business feasibility study and financial structuring plan.'
  } = (data || {});

  const totalCost = Number(loan_structure?.total_project_cost || 0);
  const marginMoneyVal = Number(loan_structure?.margin_money || 0);
  const loanAmountVal = Number(loan_structure?.loan_amount || 0);
  const monthlyEmiVal = Number(loan_structure?.monthly_emi || 0);
  const quarterlyInstallmentVal = Number(loan_structure?.quarterly_installment || 0);

  const schemeName = matched_scheme?.scheme_name || 'Government Concessional Scheme';
  const schemeNameHi = matched_scheme?.scheme_name_hi || schemeName;

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SIH2026_Feasibility_Report_${schemeName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Could not export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const narrative = (lang === 'mr' || lang === 'hi') ? (ai_advisory_text_hi || ai_advisory_text) : ai_advisory_text;
  const actionPlan = (lang === 'mr' || lang === 'hi') ? (business_action_plan_hi || business_action_plan || []) : (business_action_plan || []);
  const appSteps = (lang === 'mr' || lang === 'hi') ? (application_steps_hi || application_steps || []) : (application_steps || []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `${schemeName}. ${narrative}`;
      speakText(
        textToSpeak,
        lang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const swot = hyper_local_feasibility?.swot_analysis;
  const comp = hyper_local_feasibility?.competitor_mapping;
  const pmv = hyper_local_feasibility?.product_market_value;

  const consumerCount = Number(hyper_local_feasibility?.target_consumer_base_count ?? hyper_local_feasibility?.immediate_consumer_base ?? 5000);
  const marketReachText = (lang === 'mr' || lang === 'hi')
    ? (hyper_local_feasibility?.market_reach_5_to_10km_hi || hyper_local_feasibility?.market_reach_5_to_10km || hyper_local_feasibility?.market_reach || '')
    : (hyper_local_feasibility?.market_reach_5_to_10km || hyper_local_feasibility?.market_reach || '');

  const oppAnalysisText = (lang === 'mr' || lang === 'hi')
    ? (hyper_local_feasibility?.opportunity_analysis_hi || hyper_local_feasibility?.opportunity_analysis || '')
    : (hyper_local_feasibility?.opportunity_analysis || '');

  const distChannels = (lang === 'mr' || lang === 'hi')
    ? (hyper_local_feasibility?.distribution_channels_hi || hyper_local_feasibility?.distribution_channels || hyper_local_feasibility?.primary_distribution_channels || [])
    : (hyper_local_feasibility?.distribution_channels || hyper_local_feasibility?.primary_distribution_channels || []);

  const strengthsList = (lang === 'mr' || lang === 'hi') ? (swot?.strengths_hi || swot?.strengths || []) : (swot?.strengths || []);
  const weaknessesList = (lang === 'mr' || lang === 'hi') ? (swot?.weaknesses_hi || swot?.weaknesses || []) : (swot?.weaknesses || []);
  const oppsList = (lang === 'mr' || lang === 'hi') ? (swot?.opportunities_hi || swot?.opportunities || []) : (swot?.opportunities || []);
  const threatsList = (lang === 'mr' || lang === 'hi') ? (swot?.threats_hi || swot?.threats || []) : (swot?.threats || []);
  const threatsIdentList = (lang === 'mr' || lang === 'hi') ? (hyper_local_feasibility?.threats_identification_hi || hyper_local_feasibility?.threats_identification || []) : (hyper_local_feasibility?.threats_identification || []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md card-hover-lift transition-colors">
        <div className="flex items-center space-x-2.5 text-[#0B3D91] dark:text-blue-400">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#138808] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg block text-slate-900 dark:text-white leading-tight">
              {lang === 'mr' ? 'हायपर-लोकल व्यवसाय व्यवहार्यता व वित्तीय अहवाल' : lang === 'hi' ? 'हाइपर-लोकल व्यवसाय व्यवहार्यता एवं वित्तीय रिपोर्ट' : 'Hyper-Local Feasibility & Scheme Report'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'mr' ? 'संस्थागत व्यावसायिक व सवलतीचे शासकीय कर्ज अहवाल' : lang === 'hi' ? 'संस्थागत स्तर की व्यावसायिक व वित्तीय रणनीति' : 'Enterprise Financial Advisory & Concessional Lending Report'}
            </span>
          </div>
        </div>


        <div className="flex items-center space-x-2.5">
          {/* Audio Playback */}
          <button
            onClick={toggleSpeech}
            className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse shadow-md'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/60'
            }`}
            title="Listen to advice"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />}
            <span>{isSpeaking ? (lang === 'mr' ? 'आवाज थांबवा' : lang === 'hi' ? 'आवाज रोकें' : 'Stop Audio') : (lang === 'mr' ? 'सल्ला ऐका' : lang === 'hi' ? 'सलाह सुनें' : 'Listen Voice')}</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'नवीन अर्ज' : lang === 'hi' ? 'नया फॉर्म' : 'Start Over'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0B3D91] to-[#072a66] hover:from-[#093275] hover:to-[#041a3d] rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-[#FF9933]" />
            <span>{isExporting ? (lang === 'mr' ? 'डाउनलोड होत आहे...' : lang === 'hi' ? 'डाउनलोड हो रहा है...' : 'Exporting...') : (lang === 'mr' ? 'PDF अहवाल डाउनलोड करा' : lang === 'hi' ? 'PDF रिपोर्ट डाउनलोड करें' : 'Download PDF Report')}</span>
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center space-x-2 bg-slate-200/70 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-300/60 dark:border-slate-700 max-w-xl transition-colors">
        <button
          onClick={() => setActiveTab('hyperlocal')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeTab === 'hyperlocal'
              ? 'bg-white dark:bg-slate-700 text-[#0B3D91] dark:text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4 text-[#FF9933]" />
          <span>{lang === 'mr' ? 'मॉड्यूल १: व्यवसाय अहवाल' : lang === 'hi' ? 'मॉड्यूल 1: व्यवहार्यता रिपोर्ट' : 'Module 1: Hyper-Local Study'}</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeTab === 'financial'
              ? 'bg-white dark:bg-slate-700 text-[#0B3D91] dark:text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <IndianRupee className="w-4 h-4 text-[#138808] dark:text-emerald-400" />
          <span>{lang === 'mr' ? 'मॉड्यूल २: कर्ज व EMI' : lang === 'hi' ? 'मॉड्यूल 2: लोन संरचना व EMI' : 'Module 2: Scheme & Loan Math'}</span>
        </button>

        <button
          onClick={() => setActiveTab('actionplan')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeTab === 'actionplan'
              ? 'bg-white dark:bg-slate-700 text-[#0B3D91] dark:text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>{lang === 'mr' ? 'कृती आराखडा' : lang === 'hi' ? 'एक्शन प्लान' : 'Action Plan'}</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-white dark:bg-slate-700 text-[#0B3D91] dark:text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-500" />
          <span>{lang === 'mr' ? 'DPR सिम्युलेटर' : lang === 'hi' ? 'वित्तीय सिम्युलेटर' : 'DPR Simulator'}</span>
        </button>
      </div>

      {/* Printable Report Container */}
      <div ref={reportRef} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6 transition-colors">
        
        {/* Certificate Style Official Banner */}
        <div className="border-b-2 border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/50 text-[#0B3D91] dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-lg text-xs font-bold mb-2 shadow-2xs">
              <Landmark className="w-4 h-4 text-[#0B3D91] dark:text-blue-400" />
              <span>{matched_scheme.agency || 'State Channelizing Agency (SCA)'}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-amber-600 dark:text-amber-400 font-extrabold">{loan_structure.scheme_type}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B3D91] dark:text-blue-400 tracking-tight">
              {(lang === 'mr' || lang === 'hi') ? schemeNameHi : schemeName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
              {(lang === 'mr' || lang === 'hi') ? (matched_scheme?.description_hi || matched_scheme?.description) : matched_scheme?.description}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-[#138808] text-white px-5 py-4 rounded-2xl text-center shadow-lg flex-shrink-0 min-w-[170px]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100 block">
              {loan_structure?.scheme_type === 'Micro Finance Scheme' 
                ? (lang === 'mr' ? 'मायक्रो फायनान्स (<= १.४ लाख)' : lang === 'hi' ? 'माइक्रो फाइनेंस (<= 1.4 लाख)' : 'Micro Finance (<= 1.4L)') 
                : (lang === 'mr' ? 'मुदत कर्ज (> १.४ लाख)' : lang === 'hi' ? 'टर्म लोन (> 1.4 लाख)' : 'Term Loan (> 1.4L)')}
            </span>
            <div className="text-3xl font-black text-white mt-0.5">
              {loan_structure?.effective_interest_rate || 5.0}% <span className="text-xs font-normal text-emerald-100">p.a.</span>
            </div>
            <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">
              {loan_structure?.tenure_years || 5} {lang === 'mr' ? 'वर्षे परतफेड' : lang === 'hi' ? 'वर्ष पुनर्भुगतान' : 'Years Tenure'}
            </span>
          </div>
        </div>

        {/* 4-Stat Numbers Grid: Module 2 Core Math */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#138808]" />
              <span>{lang === 'mr' ? 'नियम-आधारित वित्तीय रचना (१०% स्वभांडवल -> ९०% सवलतीचे शासकीय कर्ज)' : lang === 'hi' ? 'नियम-आधारित वित्तीय संरचना (10% मार्जिन मनी -> 90% लोन)' : 'Financial Structuring (10% Margin Money -> 90% Concessional Loan)'}</span>
            </h2>
            <span className="bg-blue-100 text-[#0B3D91] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              DETERMINISTIC FORMULAS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Box 1: Total Feasible Project Cost */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl card-hover-lift">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>{lang === 'mr' ? 'एकूण प्रकल्प खर्च' : lang === 'hi' ? 'कुल प्रोजेक्ट लागत' : 'Feasible Project Cost'}</span>
                <IndianRupee className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                ₹{totalCost.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {lang === 'mr' ? 'उपलब्ध भांडवल / १०% च्या आधारे' : lang === 'hi' ? 'उपलब्ध पूंजी / 10% के आधार पर' : 'Calculated: Margin Capital / 10%'}
              </p>
            </div>

            {/* Box 2: 10% Margin Money */}
            <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl card-hover-lift">
              <div className="flex items-center justify-between text-xs text-amber-950 font-bold mb-1">
                <span>{lang === 'mr' ? '१०% स्वभांडवल (तुमचा हिस्सा)' : lang === 'hi' ? '10% मार्जिन मनी (आपकी जेब से)' : '10% Margin Money (Your Share)'}</span>
                <span className="bg-[#FF9933] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  {loan_structure?.margin_percent || 10}%
                </span>
              </div>
              <div className="text-2xl font-black text-amber-950">
                ₹{marginMoneyVal.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-amber-800 mt-1 font-medium">
                {lang === 'mr' ? 'केवळ एवढी रक्कम तुम्हाला स्वतः उभी करायची आहे' : lang === 'hi' ? 'केवल इतना आपको स्वयं वहन करना है' : 'Upfront entrepreneur equity needed'}
              </p>
            </div>

            {/* Box 3: 90% Govt Concessional Loan */}
            <div className="bg-blue-50 border border-blue-300 p-4 rounded-2xl card-hover-lift">
              <div className="flex items-center justify-between text-xs text-blue-950 font-bold mb-1">
                <span>{lang === 'mr' ? '९०% शासकीय सवलतीचे कर्ज' : lang === 'hi' ? '90% सरकारी रियायती लोन' : '90% Govt Concessional Loan'}</span>
                <span className="bg-[#0B3D91] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  {loan_structure?.loan_percent || 90}%
                </span>
              </div>
              <div className="text-2xl font-black text-[#0B3D91]">
                ₹{loanAmountVal.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-blue-800 mt-1 font-medium">
                {lang === 'mr' ? 'राज्य चॅनेलाइजिंग एजन्सी (SCA) द्वारे स्वीकृत' : lang === 'hi' ? 'राज्य एजेंसी (SCA) द्वारा स्वीकृत' : 'Funded via State Channelizing Agency'}
              </p>
            </div>

            {/* Box 4: Monthly & Quarterly Repayment with Moratorium */}
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl card-hover-lift">
              <div className="flex items-center justify-between text-xs text-emerald-950 font-bold mb-1">
                <span>{lang === 'mr' ? 'मासिक / त्रैमासिक हप्ता' : lang === 'hi' ? 'मासिक / त्रैमासिक किश्त' : 'Monthly / Quarterly EMI'}</span>
                <span className="text-[11px] text-emerald-800 font-bold bg-emerald-200/60 px-1.5 py-0.5 rounded">
                  {loan_structure?.moratorium_months || 6}m {lang === 'mr' ? 'सवलत' : lang === 'hi' ? 'छूट' : 'Moratorium'}
                </span>
              </div>
              <div className="text-2xl font-black text-[#138808]">
                ₹{monthlyEmiVal.toLocaleString('en-IN')} <span className="text-xs text-emerald-700 font-normal">/{lang === 'mr' ? 'महिना' : lang === 'hi' ? 'माह' : 'mo'}</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1 font-medium">
                {lang === 'mr' ? `त्रैमासिक हप्ता: ₹${quarterlyInstallmentVal.toLocaleString('en-IN')}` : lang === 'hi' ? `त्रैमासिक: ₹${quarterlyInstallmentVal.toLocaleString('en-IN')}` : `Quarterly: ₹${quarterlyInstallmentVal.toLocaleString('en-IN')}`}
              </p>
            </div>

          </div>
        </div>

        {/* TAB 1: MODULE 1 HYPER-LOCAL FEASIBILITY STUDY */}
        {activeTab === 'hyperlocal' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Sub-section A: Market Reach (5-10 km) & Opportunity Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Market Reach 5-10 km */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-5 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex items-center space-x-2 text-[#0B3D91]">
                  <Compass className="w-5 h-5 text-[#FF9933]" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {lang === 'mr' ? '१. स्थानिक बाजार पोहोच (५-१० किमी परिसर)' : lang === 'hi' ? '1. स्थानीय बाजार पहुंच (5-10 किमी दायरा)' : '1. Market Reach (5–10 km Radius)'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {marketReachText}
                </p>
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 bg-white p-2.5 rounded-xl border border-blue-200">
                  <Users className="w-4 h-4 text-[#0B3D91]" />
                  <span>{lang === 'mr' ? `अंदाजे स्थानिक ग्राहक संख्या: ${consumerCount.toLocaleString('en-IN')} नागरिक` : lang === 'hi' ? `अनुमानित प्रत्यक्ष उपभोक्ता आधार: ${consumerCount.toLocaleString('en-IN')} निवासी` : `Estimated Local Consumer Base: ~${consumerCount.toLocaleString('en-IN')} residents`}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    {lang === 'mr' ? 'प्राथमिक विक्री चॅनेल्स:' : lang === 'hi' ? 'प्राथमिक वितरण चैनल:' : 'Primary Distribution Channels:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {distChannels.map((ch, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#138808] flex-shrink-0 mt-0.5" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Opportunity Analysis */}
              <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-950">
                  <Target className="w-5 h-5 text-[#138808]" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {lang === 'mr' ? '२. न वापरलेली स्थानिक व्यवसायाची संधी (Opportunity Analysis)' : lang === 'hi' ? '2. अप्रयुक्त स्थानीय अवसर (Opportunity Analysis)' : '2. Opportunity Analysis (Underserved Niches)'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {oppAnalysisText}
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {lang === 'mr' ? 'बाजारपेठेतील मागणीतील तफावत (Unserved Demand Gap):' : lang === 'hi' ? 'अधिशेष मांग अंतर (Unserved Demand Gap):' : 'Unserved Demand Gap:'}
                  </span>
                  <p className="text-xs text-slate-700">
                    {(lang === 'mr' || lang === 'hi') ? (comp?.unserved_demand_gap_hi || comp?.unserved_demand_gap) : comp?.unserved_demand_gap}
                  </p>
                </div>
              </div>

            </div>

            {/* Sub-section B: 3. General Business Analysis (SWOT) Breakdown */}
            {swot && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-[#0B3D91]" />
                    <span>{lang === 'mr' ? '३. सर्वसमावेशक व्यवसाय विश्लेषण (SWOT मॅट्रिक्स)' : lang === 'hi' ? '3. सामान्य व्यवसाय विश्लेषण (SWOT मेट्रिक्स)' : '3. General Business Analysis (SWOT Matrix)'}</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {lang === 'mr' ? 'लघु उद्योगाच्या बजेटनुसार सानुकूलित' : lang === 'hi' ? 'प्रोजेक्ट बजट के अनुरूप तैयार' : 'Tailored to micro-enterprise budget'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* Strengths */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-2 card-hover-lift">
                    <div className="flex items-center space-x-1.5 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>{lang === 'mr' ? 'सामर्थ्य (Strengths)' : lang === 'hi' ? 'ताकत (Strengths)' : 'Strengths'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {strengthsList.map((s, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2 card-hover-lift">
                    <div className="flex items-center space-x-1.5 text-amber-950 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>{lang === 'mr' ? 'कमतरता (Weaknesses)' : lang === 'hi' ? 'कमजोरियां (Weaknesses)' : 'Weaknesses'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {weaknessesList.map((w, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-amber-700 font-bold">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-300 space-y-2 card-hover-lift">
                    <div className="flex items-center space-x-1.5 text-blue-950 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      <span>{lang === 'mr' ? 'संधी (Opportunities)' : lang === 'hi' ? 'अवसर (Opportunities)' : 'Opportunities'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {oppsList.map((o, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-blue-700 font-bold">•</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-300 space-y-2 card-hover-lift">
                    <div className="flex items-center space-x-1.5 text-rose-950 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span>{lang === 'mr' ? 'धोके व आव्हाने (Threats)' : lang === 'hi' ? 'चुनौतियां (Threats)' : 'Threats'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {threatsList.map((t, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-rose-700 font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {/* Sub-section C: 4. Threats Identification & 5. Competitor Density */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Threats Identification */}
              <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm sm:text-base">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>{lang === 'mr' ? '४. स्थानिक धोके व अडचणी (Threats Identification)' : lang === 'hi' ? '4. स्थानीय जोखिम व खतरे (Threats Identification)' : '4. Local Threats & Bottlenecks'}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {lang === 'mr'
                    ? 'कच्च्या मालाचा तुटवडा, हंगामी मागणी आणि एकाच खरेदीदारावर अवलंबित्व यांसारखे प्रत्यक्ष धोके:'
                    : lang === 'hi'
                    ? 'आपूर्ति श्रृंखला रुकावट, मौसमी मांग और एकल खरीदार पर निर्भरता से जुड़े वास्तविक जोखिम:'
                    : 'Pinpointed risks such as supply chain bottlenecks, seasonal swings, and single-buyer dependency:'}
                </p>
                <ul className="space-y-2 text-xs text-slate-800">
                  {threatsIdentList.map((th, idx) => (
                    <li key={idx} className="p-2.5 rounded-xl bg-white border border-rose-200 flex items-start space-x-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{th}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competitor Mapping */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm sm:text-base">
                  <Building2 className="w-5 h-5 text-[#0B3D91]" />
                  <span>{lang === 'mr' ? '५. स्थानिक स्पर्धा नकाशा (Competitor Mapping)' : lang === 'hi' ? '5. प्रतिस्पर्धी मैपिंग (Competitor Mapping)' : '5. Competitor Mapping & Density'}</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-600 font-medium">
                    {lang === 'mr' ? 'तालुक्यातील अंदाजे समान व्यवसाय:' : lang === 'hi' ? 'ब्लॉक में अनुमानित समान व्यवसाय:' : 'Estimated Competitors in Block:'}
                  </span>
                  <span className="text-sm font-black text-[#0B3D91] bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {comp?.estimated_competitors_in_block} {lang === 'mr' ? 'उद्योग' : lang === 'hi' ? 'इकाइयां' : 'Units'}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-600 font-medium">
                    {lang === 'mr' ? 'बाजारपेठ संपृक्तता (Saturation):' : lang === 'hi' ? 'बाजार संतृप्ति स्तर (Saturation):' : 'Market Saturation:'}
                  </span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {(lang === 'mr' || lang === 'hi') ? (comp?.saturation_level_hi || comp?.saturation_level) : comp?.saturation_level}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-200">
                  {(lang === 'mr' || lang === 'hi') ? (comp?.density_analysis_hi || comp?.density_analysis) : comp?.density_analysis}
                </p>

                {/* Live Detected Competitor & Commercial POI List */}
                {comp?.nearby_poi_list && comp.nearby_poi_list.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                      <span>{lang === 'hi' ? 'कैचमेंट में पहचाने गए व्यापारिक केंद्र:' : 'Detected Establishments in Catchment:'}</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-extrabold text-[10px]">
                        {comp.is_live_data ? 'Live Geo-Tagged' : 'Spatial Model'}
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {comp.nearby_poi_list.map((poi, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900 block">{poi.name}</span>
                            <span className="text-[10px] text-slate-500">{poi.category} • {poi.address || `${poi.distance_km} km away`}</span>
                          </div>
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 font-extrabold text-[11px] rounded-lg shrink-0">
                            {poi.distance_km} km
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Sub-section D: 6. Product Market Value & Pricing Strategy */}
            {pmv && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 border border-amber-300 space-y-3">
                <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm sm:text-base">
                  <Tag className="w-5 h-5 text-amber-700" />
                  <span>{lang === 'mr' ? '६. उत्पादन बाजार मूल्य व किंमत धोरण (Pricing Strategy)' : lang === 'hi' ? '6. उत्पाद बाजार मूल्य व मूल्य निर्धारण (Product Market Value)' : '6. Product Market Value & Pricing Strategy'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold text-amber-900 block mb-1">
                      {lang === 'mr' ? 'सुचवलेली किंमत रचना:' : lang === 'hi' ? 'सुझावित मूल्य निर्धारण:' : 'Suggested Pricing:'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      {(lang === 'mr' || lang === 'hi') ? (pmv.suggested_pricing_strategy_hi || pmv.suggested_pricing_strategy) : pmv.suggested_pricing_strategy}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold text-amber-900 block mb-1">
                      {lang === 'mr' ? 'नफा प्रमाण (Unit Margin):' : lang === 'hi' ? 'इकाई लाभ मार्जिन (Unit Margin):' : 'Unit Margin Potential:'}
                    </span>
                    <div className="text-xl font-black text-[#138808]">
                      ~{pmv.estimated_unit_margin_percent}%
                    </div>
                    <span className="text-[10px] text-slate-500">{lang === 'mr' ? 'थेट खर्च वजा करून निव्वळ नफा' : lang === 'hi' ? 'लागत घटाकर सकल मार्जिन' : 'Gross margin over direct costs'}</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold text-amber-900 block mb-1">
                      {lang === 'mr' ? 'स्थानिक खरेदी क्षमता संदर्भ:' : lang === 'hi' ? 'क्षेत्रीय क्रय शक्ति संदर्भ:' : 'Purchasing Power Context:'}
                    </span>
                    <p className="text-xs text-slate-700">
                      {(lang === 'mr' || lang === 'hi') ? (pmv.purchasing_power_context_hi || pmv.purchasing_power_context) : pmv.purchasing_power_context}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: MODULE 2 DETAILED FINANCIAL REPAYMENT SCHEDULE */}
        {activeTab === 'financial' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Working Capital & Financial Viability Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  {lang === 'mr' ? 'आवश्यक खेळते भांडवल (Working Capital):' : lang === 'hi' ? 'आवश्यक कार्यशील पूंजी (Working Capital):' : 'Working Capital Reserve:'}
                </span>
                <div className="text-xl font-extrabold text-[#0B3D91]">
                  ₹{(loan_structure?.working_capital_required || Math.round((loan_structure?.total_project_cost || 100000) * 0.18)).toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-500">~18% liquid liquidity buffer</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  {lang === 'mr' ? 'अंदाजे मासिक विक्री:' : lang === 'hi' ? 'अनुमानित मासिक बिक्री:' : 'Est. Monthly Revenue:'}
                </span>
                <div className="text-xl font-extrabold text-slate-900">
                  ₹{(business_viability?.estimated_monthly_revenue || Math.round((loan_structure?.monthly_emi || 1000) * 3.8)).toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-500">NABARD/KVIC rural benchmarks</span>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-500">
                <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider block mb-1">
                  {lang === 'mr' ? 'हप्ता (EMI) भरल्यानंतर निव्वळ नफा:' : lang === 'hi' ? 'EMI के बाद शुद्ध मासिक बचत:' : 'Net Profit After EMI:'}
                </span>
                <div className="text-2xl font-black text-[#138808]">
                  ₹{(business_viability?.estimated_net_monthly_profit || Math.round((loan_structure?.monthly_emi || 1000) * 1.6)).toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-800 font-bold">Viability Score: {business_viability?.viability_score || 90}/100</span>
              </div>
            </div>

            {/* Quarterly Repayment Schedule factoring in Moratorium */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#0B3D91]" />
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {lang === 'mr' 
                      ? `त्रैमासिक हप्ता परतफेड तक्ता (${loan_structure.moratorium_months} महिने सवलतीसह)` 
                      : lang === 'hi' 
                      ? `त्रैमासिक पुनर्भुगतान अनुसूची (${loan_structure.moratorium_months} माह मोरेटोरियम सहित)` 
                      : `Quarterly Repayment Schedule (${loan_structure.moratorium_months}-Month Moratorium Factored)`}
                  </h4>
                </div>
                <span className="text-xs bg-[#0B3D91] text-white px-2.5 py-1 rounded-full font-bold">
                  {loan_structure.tenure_years * 4} {lang === 'mr' ? 'एकूण तिमाही हप्ते' : lang === 'hi' ? 'कुल किश्तें' : 'Total Quarters'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0B3D91] text-white">
                      <th className="p-3 font-bold rounded-l">{lang === 'mr' ? 'तिमाही (हप्ता)' : lang === 'hi' ? 'तिमाही (Quarter)' : 'Quarter'}</th>
                      <th className="p-3 font-bold">{lang === 'mr' ? 'कालावधी' : lang === 'hi' ? 'अवधि' : 'Months'}</th>
                      <th className="p-3 font-bold">{lang === 'mr' ? 'हप्ता रक्कम' : lang === 'hi' ? 'किश्त राशि (Installment)' : 'Installment'}</th>
                      <th className="p-3 font-bold">{lang === 'mr' ? 'भरलेले मुद्दल' : lang === 'hi' ? 'मूलधन (Principal)' : 'Principal'}</th>
                      <th className="p-3 font-bold">{lang === 'mr' ? 'व्याज' : lang === 'hi' ? 'ब्याज (Interest)' : 'Interest'}</th>
                      <th className="p-3 font-bold rounded-r">{lang === 'mr' ? 'शिल्लक कर्ज' : lang === 'hi' ? 'बकाया लोन (Balance)' : 'Closing Balance'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {loan_structure.quarterly_schedule?.map((row) => {
                      const displayLabel = lang === 'mr'
                        ? (row.months_label || '').replace(/Month/g, 'महिना').replace(/Moratorium/g, 'सवलत कालावधी')
                        : lang === 'hi'
                        ? (row.months_label || '').replace(/Month/g, 'माह').replace(/Moratorium/g, 'मोरेटोरियम')
                        : row.months_label;

                      return (
                        <tr key={row.quarter} className={row.is_moratorium ? "bg-amber-50/60 font-semibold" : "hover:bg-slate-50"}>
                          <td className="p-3 font-bold text-[#0B3D91]">
                            Q{row.quarter} {row.is_moratorium && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded ml-1 font-bold">{lang === 'mr' ? 'सवलत' : lang === 'hi' ? 'मोरेटोरियम' : 'Moratorium'}</span>}
                          </td>
                          <td className="p-3 text-slate-600">{displayLabel}</td>
                          <td className="p-3 font-bold text-slate-900">₹{row.installment_amount.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-emerald-700">₹{row.principal_paid.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-amber-700">₹{row.interest_paid.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-slate-800 font-extrabold">₹{row.remaining_balance.toLocaleString('en-IN')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: AI ADVISORY NARRATIVE & ACTION ROADMAP */}
        {activeTab === 'actionplan' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* AI Advisory Narrative Box */}
            <div className="bg-slate-50 border border-slate-300 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#FF9933]" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    {lang === 'mr' ? 'समर्थ AI सल्लागार संपूर्ण विश्लेषण' : lang === 'hi' ? 'सरल भाषा में संपूर्ण वित्तीय सलाह व व्याख्या' : 'Plain Language Business & Financial Advisory'}
                  </h3>
                </div>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  AI EXPLANATION
                </span>
              </div>
              <div className="text-sm text-slate-700 space-y-2 whitespace-pre-line leading-relaxed">
                {narrative}
              </div>
            </div>

            {/* 4 Key Steps for Business Success */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                {lang === 'mr' ? 'व्यवसाय यशासाठी ४ महत्त्वपूर्ण टप्पे' : lang === 'hi' ? 'व्यवसाय सफलता के लिए 4 मुख्य कदम' : '4 Key Steps for Micro-Enterprise Success'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {actionPlan && actionPlan.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0B3D91] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Procedure (SCA / DIC) */}
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3">
              <h4 className="font-extrabold text-sm text-emerald-950 uppercase tracking-wider">
                {lang === 'mr' ? 'शासकीय कर्ज मंजुरी अर्ज प्रक्रिया (SCA / बँक टप्पे)' : lang === 'hi' ? 'लोन स्वीकृति हेतु आवेदन प्रक्रिया (SCA / बैंक चरण)' : 'Application & Loan Sanction Roadmap'}
              </h4>
              <ul className="space-y-2">
                {appSteps && appSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#138808] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Required */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
              <h5 className="font-bold text-xs text-amber-900 uppercase tracking-wider mb-1">
                {lang === 'mr' ? 'आवश्यक कागदपत्रे (Required Documents):' : lang === 'hi' ? 'आवश्यक दस्तावेज (Required Documents):' : 'Mandatory Documents:'}
              </h5>
              <p className="text-xs text-amber-950 font-medium">
                {matched_scheme.documents_required || 'Aadhaar Card, Category Certificate, Income Certificate, Project Quotation, Bank Passbook'}
              </p>
            </div>

          </div>
        )}

        {/* TAB 4: INTERACTIVE WHAT-IF FINANCIAL SIMULATOR & BANK DPR APPRAISAL */}
        {activeTab === 'simulator' && (() => {
          const baseRevenue = business_viability?.estimated_monthly_revenue || ((loan_structure?.total_project_cost || 100000) * 0.24);
          const simRevenue = Math.round(baseRevenue * simPriceMult * simVolumeMult);
          const simExpenses = Math.round(simRevenue * (simExpRatio / 100));
          const simNetOperatingIncome = Math.max(0, simRevenue - simExpenses);

          const simProjectCost = loan_structure?.total_project_cost || 100000;
          const simMarginMoney = Math.round(simProjectCost * (simMarginPercent / 100));
          const simLoanAmount = Math.max(0, simProjectCost - simMarginMoney);
          const simAnnualRate = loan_structure?.effective_interest_rate || 5.0;
          const simMonthlyRate = (simAnnualRate / 100) / 12;
          const simTotalMonths = simTenureYears * 12;
          
          const simEMI = simMonthlyRate > 0 && simLoanAmount > 0
            ? Math.round((simLoanAmount * simMonthlyRate * Math.pow(1 + simMonthlyRate, simTotalMonths)) / (Math.pow(1 + simMonthlyRate, simTotalMonths) - 1))
            : Math.round(simLoanAmount / Math.max(1, simTotalMonths));

          const simNetProfit = Math.round(simNetOperatingIncome - simEMI);
          const simDSCR = simEMI > 0 ? (simNetOperatingIncome / simEMI).toFixed(2) : '3.50';
          const simBreakEvenMonths = simNetProfit > 0 ? Math.max(2, Math.round(simMarginMoney / simNetProfit)) : 36;
          const simViabilityScore = Math.min(99, Math.max(40, Math.round(Number(simDSCR) * 36)));

          const isBankFeasible = Number(simDSCR) >= 1.4 && simNetProfit > 4000;

          return (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Simulator Header */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg">
                        {lang === 'hi' ? 'इंटरैक्टिव बैंक डीपीआर व वित्तीय संवेदनशीलता सिम्युलेटर' : 'Interactive Bank DPR Sensitivity Simulator'}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {lang === 'hi' 
                          ? 'बिक्री मूल्य, दैनिक ग्राहक संख्या, मार्जिन % और लोन अवधि बदलकर लाभ व DSCR का लाइव परीक्षण करें।' 
                          : 'Adjust pricing, volume, margin %, and tenure to test real-time cash flow & bank appraisal safety.'}
                      </p>
                    </div>
                  </div>

                  <div className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center space-x-1.5 ${
                    isBankFeasible ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                  }`}>
                    <Activity className="w-4 h-4" />
                    <span>{isBankFeasible ? 'बैंक ऋण योग्य (DSCR Safe > 1.4)' : 'मार्जिन बढ़ाने की सलाह (Caution)'}</span>
                  </div>
                </div>

                {/* Real-time KPI Result Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                    <span className="text-[11px] text-slate-300 block">अनुमानित मासिक टर्नओवर</span>
                    <div className="text-xl font-black text-white">₹{simRevenue.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-slate-400">खर्च: ₹{simExpenses.toLocaleString('en-IN')} ({simExpRatio}%)</span>
                  </div>

                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                    <span className="text-[11px] text-amber-200 block">पुनर्गणित मासिक EMI</span>
                    <div className="text-xl font-black text-amber-300">₹{simEMI.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-amber-200/70">{simTenureYears} वर्ष • {simAnnualRate}%</span>
                  </div>

                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-emerald-400/30">
                    <span className="text-[11px] text-emerald-200 block">EMI पश्चात शुद्ध मासिक बचत</span>
                    <div className="text-xl font-black text-emerald-300">₹{simNetProfit.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-emerald-200/70">ब्रेक-ईवन: ~{simBreakEvenMonths} माह</span>
                  </div>

                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-blue-400/30">
                    <span className="text-[11px] text-blue-200 block">बैंक DSCR अनुपात</span>
                    <div className="text-xl font-black text-blue-300">{simDSCR}x</div>
                    <span className="text-[10px] text-blue-200/70">व्यवहार्यता: {simViabilityScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                
                {/* Slider 1: Price Multiplier */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>उत्पाद / सेवा बिक्री मूल्य स्तर (Price Adjustment):</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-blue-700 font-extrabold">
                      {Math.round((simPriceMult - 1.0) * 100) > 0 ? `+${Math.round((simPriceMult - 1.0) * 100)}%` : `${Math.round((simPriceMult - 1.0) * 100)}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.05"
                    value={simPriceMult}
                    onChange={(e) => setSimPriceMult(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>-20% (डिस्काउंट मूल्य)</span>
                    <span>सामान्य दर</span>
                    <span>+30% (प्रीमियम गुणवत्ता)</span>
                  </div>
                </div>

                {/* Slider 2: Daily Sales / Customer Volume */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>दैनिक ग्राहक संख्या व बिक्री मात्रा (Volume):</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-emerald-700 font-extrabold">
                      {Math.round((simVolumeMult - 1.0) * 100) > 0 ? `+${Math.round((simVolumeMult - 1.0) * 100)}%` : `${Math.round((simVolumeMult - 1.0) * 100)}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.05"
                    value={simVolumeMult}
                    onChange={(e) => setSimVolumeMult(Number(e.target.value))}
                    className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>-30% (शुरुआती मंदी)</span>
                    <span>अनुमानित स्तर</span>
                    <span>+50% (उच्च मांग)</span>
                  </div>
                </div>

                {/* Slider 3: Operating Expense Ratio */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>परिचालन व कच्चा माल लागत अनुपात (Expense %):</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-amber-700 font-extrabold">
                      {simExpRatio}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="75"
                    step="1"
                    value={simExpRatio}
                    onChange={(e) => setSimExpRatio(Number(e.target.value))}
                    className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>30% (सेवा आधारित)</span>
                    <span>50% (मानक अनुपात)</span>
                    <span>75% (थोक व्यापार)</span>
                  </div>
                </div>

                {/* Slider 4: Margin Capital % Contribution */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>उद्यमी स्वभांडवल मार्जिन हिस्सा (Margin Contribution):</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-purple-700 font-extrabold">
                      {simMarginPercent}% (₹{simMarginMoney.toLocaleString('en-IN')})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={simMarginPercent}
                    onChange={(e) => setSimMarginPercent(Number(e.target.value))}
                    className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>5% (न्यूनतम सरकारी)</span>
                    <span>10% (मानक)</span>
                    <span>25% (अधिक स्वपूंजी)</span>
                  </div>
                </div>

                {/* Slider 5: Repayment Tenure */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>ऋण पुनर्भुगतान अवधि (Tenure):</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-indigo-700 font-extrabold">
                      {simTenureYears} वर्ष ({simTenureYears * 12} माह)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="7"
                    step="1"
                    value={simTenureYears}
                    onChange={(e) => setSimTenureYears(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>3 वर्ष (माइक्रो फाइनेंस)</span>
                    <span>5 वर्ष (मानक टर्म लोन)</span>
                    <span>7 वर्ष (दीर्घकालिक)</span>
                  </div>
                </div>

              </div>

              {/* Bank Credit Appraisal Certification Card */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start space-x-3.5">
                <ShieldCheck className="w-6 h-6 text-[#0B3D91] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-[#0B3D91]">
                    संस्थागत बैंक क्रेडिट मूल्यांकन टिप्पणी (Institutional Bank Appraisal Summary)
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    प्रस्तावित परियोजना का DSCR अनुपात <strong className="text-slate-900">{simDSCR}x</strong> है, जो भारतीय रिजर्व बैंक (RBI) एवं नाबार्ड (NABARD) द्वारा निर्धारित न्यूनतम 1.25x के मानक से अधिक है। परियोजना का मासिक ब्याज एवं मूलधन भुगतान जोखिम-रहित श्रेणी में आता है।
                  </p>
                </div>
              </div>

            </div>
          );
        })()}

        {/* Footer Official Disclaimer */}
        <div className="pt-4 text-center text-xs text-slate-400 border-t border-slate-100">
          {disclaimer}
        </div>

      </div>

      {/* Embedded District Assistance Directory */}
      <DistrictFinder defaultState={userState} defaultDistrict={userDistrict} />
    </div>
  );
};

export default ResultCard;
