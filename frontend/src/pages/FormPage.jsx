import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { submitAdvisoryRequest } from '../services/api';
import { logInquiryToSupabase } from '../services/supabaseClient';
import ResultCard from '../components/ResultCard';
import MicButton from '../components/MicButton';
import VoiceAssistantModal from '../components/VoiceAssistantModal';
import { 
  Store, 
  Milk, 
  Scissors, 
  Truck, 
  SunMedium, 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  IndianRupee, 
  Loader2, 
  User, 
  MapPin, 
  Briefcase, 
  HelpCircle, 
  AlertTriangle, 
  Landmark,
  Coins,
  Calculator,
  Compass,
  Lock,
  Mic
} from 'lucide-react';

const FormPage = () => {
  const { lang } = useLanguage();
  const { user, loginWithGoogle, login } = useAuth();
  const location = useLocation();
  const prefilled = location.state?.prefilledScheme;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Input Mode: By Available Margin (10%) OR By Total Project Cost
  const [inputMode, setInputMode] = useState('margin'); // 'margin' or 'project_cost'

  // Form State
  const [formData, setFormData] = useState({
    business_type: 'Dairy Farm',
    business_title: prefilled ? prefilled.scheme_name : '',
    margin_capital: 100000, // Available Margin Money (10% standard)
    investment_amount: 1000000, // Total Feasible Project Cost (Margin / 10%)
    gender: 'General',
    state: prefilled?.state && prefilled.state !== 'Central / All India' ? prefilled.state : 'Maharashtra',
    district: '',
    experience_level: '1-3 years'
  });

  useEffect(() => {
    if (prefilled) {
      const maxC = prefilled.max_cost || 1000000;
      setFormData(prev => ({
        ...prev,
        business_title: prefilled.scheme_name,
        investment_amount: maxC,
        margin_capital: Math.round(maxC * 0.10),
        state: prefilled.state && prefilled.state !== 'Central / All India' ? prefilled.state : prev.state
      }));
    }
  }, [prefilled]);

  // Sync Margin and Project Cost
  const handleMarginChange = (val) => {
    const margin = Number(val) || 0;
    const projectCost = margin * 10;
    setFormData(prev => ({
      ...prev,
      margin_capital: margin,
      investment_amount: projectCost
    }));
  };

  const handleProjectCostChange = (val) => {
    const cost = Number(val) || 0;
    const margin = Math.round(cost * 0.10);
    setFormData(prev => ({
      ...prev,
      investment_amount: cost,
      margin_capital: margin
    }));
  };

  const businessTypes = [
    { id: 'Dairy Farm', name: 'डेयरी व दूध उत्पादन', nameMr: 'डेअरी व दुग्ध व्यवसाय', nameEn: 'Dairy & Milk Farming', icon: Milk },
    { id: 'Grocery / Kirana Store', name: 'किराना व जनरल स्टोर', nameMr: 'किराणा व जनरल स्टोअर', nameEn: 'Grocery / Kirana Shop', icon: Store },
    { id: 'Tailoring & Boutique', name: 'सिलाई व बुटीक सेंटर', nameMr: 'शिलाई व बुटीक केंद्र (४% सवलत)', nameEn: 'Tailoring & Boutique', icon: Scissors },
    { id: 'E-Rickshaw / Transport', name: 'ई-रिक्शा व वाहन सेवा', nameMr: 'ई-रिक्षा वाहतूक सेवा', nameEn: 'E-Rickshaw / Transport', icon: Truck },
    { id: 'Solar & Renewable Energy', name: 'सोलर व हरित व्यवसाय', nameMr: 'सौर ऊर्जा व्यवसाय', nameEn: 'Solar & Clean Energy', icon: SunMedium },
    { id: 'Agri Processing / Mill', name: 'आटा/तेल मिल व प्रसंस्करण', nameMr: 'पिठाची/तेलाची गिरणी', nameEn: 'Flour/Oil Mill Processing', icon: Sprout },
    { id: 'Handicrafts / Artisan', name: 'हस्तशिल्प व दस्तकारी', nameMr: 'हस्तकला व कारागीर', nameEn: 'Handicrafts & Artisan', icon: Briefcase },
    { id: 'Other Micro Business', name: 'अन्य छोटा व्यवसाय', nameMr: 'इतर लघु व्यवसाय', nameEn: 'Other Micro Business', icon: Store }
  ];

  const presetMarginAmounts = [
    { label: '₹14,000 (1.4L Project)', margin: 14000, cost: 140000, scheme: 'Micro Finance (6.5%)' },
    { label: '₹50,000 (5L Project)', margin: 50000, cost: 500000, scheme: 'Term Loan (8%)' },
    { label: '₹1,00,000 (10L Project)', margin: 100000, cost: 1000000, scheme: 'Term Loan (8%)' },
    { label: '₹2,50,000 (25L Project)', margin: 250000, cost: 2500000, scheme: 'Term Loan (8%)' },
    { label: '₹5,00,000 (50L Project)', margin: 500000, cost: 5000000, scheme: 'Term Loan (8%)' }
  ];

  const [voiceFeedback, setVoiceFeedback] = useState(null);

  const handleVoiceTranscript = (text) => {
    if (!text || !text.trim()) return;
    const lower = text.toLowerCase();
    const detected = [];

    let updatedType = null;
    if (lower.includes('dairy') || lower.includes('doodh') || lower.includes('दूध') || lower.includes('गाय') || lower.includes('भैंस') || lower.includes('पशु')) {
      updatedType = 'Dairy Farm';
      detected.push('डेयरी / Dairy Farm');
    } else if (lower.includes('kirana') || lower.includes('grocery') || lower.includes('किराना') || lower.includes('दुकान') || lower.includes('store') || lower.includes('shop')) {
      updatedType = 'Grocery / Kirana Store';
      detected.push('किराना स्टोर / Grocery');
    } else if (lower.includes('tailor') || lower.includes('silai') || lower.includes('सिलाई') || lower.includes('बुटीक') || lower.includes('boutique') || lower.includes('कपड़ा')) {
      updatedType = 'Tailoring & Boutique';
      detected.push('सिलाई / Tailoring');
    } else if (lower.includes('rickshaw') || lower.includes('रिक्शा') || lower.includes('ऑटो') || lower.includes('auto') || lower.includes('transport') || lower.includes('गाड़ी')) {
      updatedType = 'E-Rickshaw / Transport';
      detected.push('ई-रिक्शा / Transport');
    } else if (lower.includes('solar') || lower.includes('सोलर') || lower.includes('सौर') || lower.includes('energy')) {
      updatedType = 'Solar & Renewable Energy';
      detected.push('सोलर / Solar');
    } else if (lower.includes('mill') || lower.includes('चक्की') || lower.includes('आटा') || lower.includes('तेल') || lower.includes('flour') || lower.includes('oil')) {
      updatedType = 'Agri Processing / Mill';
      detected.push('आटा/तेल मिल / Mill');
    } else if (lower.includes('artisan') || lower.includes('हस्तशिल्प') || lower.includes('दस्तकारी') || lower.includes('craft')) {
      updatedType = 'Handicrafts / Artisan';
      detected.push('हस्तशिल्प / Handicrafts');
    }

    // Gender detection
    let updatedGender = null;
    if (lower.includes('महिला') || lower.includes('स्त्री') || lower.includes('woman') || lower.includes('women') || lower.includes('female') || lower.includes('girl') || lower.includes('aurat')) {
      updatedGender = 'Female';
      detected.push('महिला उद्यमी (Special 4% Subsidized Rebate)');
    }

    // State detection
    let updatedState = null;
    const statesMap = {
      'uttar pradesh': 'Uttar Pradesh', 'उत्तर प्रदेश': 'Uttar Pradesh', 'यूपी': 'Uttar Pradesh',
      'rajasthan': 'Rajasthan', 'राजस्थान': 'Rajasthan',
      'bihar': 'Bihar', 'बिहार': 'Bihar',
      'madhya pradesh': 'Madhya Pradesh', 'मध्य प्रदेश': 'Madhya Pradesh', 'एमपी': 'Madhya Pradesh',
      'maharashtra': 'Maharashtra', 'महाराष्ट्र': 'Maharashtra',
      'gujarat': 'Gujarat', 'गुजरात': 'Gujarat',
      'haryana': 'Haryana', 'हरियाणा': 'Haryana',
      'punjab': 'Punjab', 'पंजाब': 'Punjab',
      'delhi': 'Delhi', 'दिल्ली': 'Delhi',
      'west bengal': 'West Bengal', 'बंगाल': 'West Bengal'
    };
    for (const [k, v] of Object.entries(statesMap)) {
      if (lower.includes(k)) {
        updatedState = v;
        detected.push(`राज्य: ${v}`);
        break;
      }
    }

    // Amount extraction
    let updatedMargin = null;
    let updatedCost = null;

    // Check for Lakhs (e.g. 1.5 लाख, 2 lakh, एक लाख)
    const lakhMatch = lower.match(/(\d+(?:\.\d+)?)\s*(लाख|lakh|lac)/);
    let amount = null;
    if (lakhMatch) {
      amount = parseFloat(lakhMatch[1]) * 100000;
    } else if (lower.includes('एक लाख') || lower.includes('one lakh')) {
      amount = 100000;
    } else if (lower.includes('दो लाख') || lower.includes('two lakh')) {
      amount = 200000;
    } else if (lower.includes('पांच लाख') || lower.includes('5 लाख') || lower.includes('five lakh')) {
      amount = 500000;
    } else if (lower.includes('दस लाख') || lower.includes('10 लाख') || lower.includes('ten lakh')) {
      amount = 1000000;
    } else {
      // Thousands (हजार / thousand)
      const thousandMatch = lower.match(/(\d+)\s*(हजार|thousand|k)/);
      if (thousandMatch) {
        amount = parseInt(thousandMatch[1], 10) * 1000;
      } else {
        const rawNum = lower.match(/\b(\d{4,8})\b/);
        if (rawNum) {
          amount = parseInt(rawNum[1], 10);
        }
      }
    }

    if (amount) {
      // Decide if the user mentioned margin capital or total project cost
      if (lower.includes('margin') || lower.includes('मार्जिन') || lower.includes('पूंजी') || lower.includes('बचत') || lower.includes('पास')) {
        updatedMargin = amount;
        updatedCost = amount * 10;
        detected.push(`उपलब्ध मार्जिन: ₹${amount.toLocaleString('en-IN')} (प्रोजेक्ट: ₹${(amount * 10).toLocaleString('en-IN')})`);
      } else {
        updatedCost = amount;
        updatedMargin = Math.round(amount * 0.10);
        detected.push(`कुल प्रोजेक्ट लागत: ₹${amount.toLocaleString('en-IN')} (मार्जिन: ₹${Math.round(amount * 0.10).toLocaleString('en-IN')})`);
      }
    }

    // Apply updates to form
    setFormData(prev => ({
      ...prev,
      business_title: text,
      ...(updatedType && { business_type: updatedType }),
      ...(updatedGender && { gender: updatedGender }),
      ...(updatedState && { state: updatedState }),
      ...(updatedMargin && { margin_capital: updatedMargin, investment_amount: updatedCost })
    }));

    setVoiceFeedback({
      transcript: text,
      detected: detected.length > 0 ? detected : ['विवरण दर्ज कर लिया गया है (Details Recorded)']
    });

    // Speak confirmation back to user if supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utter = new SpeechSynthesisUtterance(
          lang === 'hi' 
            ? 'आपकी आवाज दर्ज कर ली गई है और फॉर्म भर दिया गया है।'
            : 'Voice input captured and form details filled successfully.'
        );
        utter.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
      } catch (e) {}
    }
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        business_type: formData.business_type,
        business_title: formData.business_title || formData.business_type,
        margin_capital: Number(formData.margin_capital),
        investment_amount: Number(formData.investment_amount),
        gender: formData.gender,
        state: formData.state,
        district: formData.district || 'Rural Block',
        experience_level: formData.experience_level,
        preferred_language: lang
      };

      const res = await submitAdvisoryRequest(payload);
      setResultData(res);

      // Log into Supabase live database
      logInquiryToSupabase({
        business_type: payload.business_type,
        business_title: payload.business_title,
        margin_capital: payload.margin_capital,
        investment_amount: res?.loan_structure?.total_project_cost || payload.investment_amount,
        loan_amount: res?.loan_structure?.loan_amount || 0,
        monthly_emi: res?.loan_structure?.monthly_emi || 0,
        state: payload.state,
        district: payload.district,
        experience_level: payload.experience_level
      });

    } catch (err) {
      console.error('API Advisory Error:', err);
      setError(
        err.response?.data?.detail ||
        (lang === 'hi'
          ? 'सर्वर से संपर्क करने में समस्या आई। कृपया बैकएंड कनेक्शन जांचें।'
          : 'Unable to connect to advisory service. Please check your backend connection.')
      );
    } finally {
      setLoading(false);
    }
  };

  // Preview numbers
  const currentCost = Number(formData.investment_amount) || 0;
  const currentMargin = Number(formData.margin_capital) || 0;
  const currentLoan = Math.max(0, currentCost - currentMargin);
  const isMicroFinance = currentCost <= 140000;

  if (resultData) {
    return (
      <div className="py-8 px-4 sm:px-6">
        <ResultCard 
          data={resultData} 
          onReset={() => setResultData(null)}
          userState={formData.state}
          userDistrict={formData.district}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* Step Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
              step >= 1 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
            }`}>
              1
            </div>
            <span className={`text-xs sm:text-sm font-semibold ${step === 1 ? 'text-blue-700' : 'text-slate-600'}`}>
              {lang === 'hi' ? 'व्यवसाय का चयन' : 'Trade Category'}
            </span>
          </div>

          <div className="h-0.5 w-8 sm:w-16 bg-slate-200"></div>

          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
              step >= 2 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
            }`}>
              2
            </div>
            <span className={`text-xs sm:text-sm font-semibold ${step === 2 ? 'text-blue-700' : 'text-slate-600'}`}>
              {lang === 'hi' ? '10% मार्जिन पूंजी' : 'Margin Budget (10%)'}
            </span>
          </div>

          <div className="h-0.5 w-8 sm:w-16 bg-slate-200"></div>

          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
              step >= 3 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
            }`}>
              3
            </div>
            <span className={`text-xs sm:text-sm font-semibold ${step === 3 ? 'text-blue-700' : 'text-slate-600'}`}>
              {lang === 'hi' ? 'स्थान व प्रोफाइल' : 'Profile & Location'}
            </span>
          </div>
        </div>
      </div>

      {/* Voice Assistant Strip */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              {lang === 'mr' ? 'आवाजाने किंवा १-क्लिक नमुन्याने फॉर्म भरा (Voice Assistant)' : lang === 'hi' ? 'आवाज से बोलकर फॉर्म भरें (Voice Assistant)' : 'Voice-Enabled Form Input (Web Speech API)'}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === 'mr'
                ? 'उदा: "माझ्याकडे १ लाख रुपये आहेत, मला डेअरी फार्म सुरू करायचा आहे"'
                : lang === 'hi'
                ? 'उदा: "मेरे पास 1 लाख रुपये हैं, मुझे डेयरी फार्म शुरू करना है"'
                : 'e.g. "I have 1 Lakh margin money, want to start a Dairy Farm"'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsVoiceModalOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-102"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'आवाज सहाय्यक उघडा' : lang === 'hi' ? 'वॉइस असिस्टेंट खोलें' : 'Open Voice Assistant'}</span>
          </button>
          <MicButton onTranscript={handleVoiceTranscript} />
        </div>
      </div>

      {voiceFeedback && (
        <div className="bg-emerald-50/90 border border-emerald-300 p-4 rounded-xl text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {lang === 'mr' ? 'आवाज तपशील नोंदवला' : lang === 'hi' ? 'वॉइस इनपुट प्राप्त हुआ' : 'Voice Input Captured'}
                </span>
                <span className="text-xs italic text-emerald-700 font-medium">"{voiceFeedback.transcript}"</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {voiceFeedback.detected.map((item, idx) => (
                  <span key={idx} className="bg-white/80 border border-emerald-200 text-emerald-900 text-xs font-semibold px-2.5 py-1 rounded-md shadow-2xs">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setVoiceFeedback(null)} 
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 self-end sm:self-center px-2 py-1 rounded hover:bg-emerald-100/60"
          >
            {lang === 'mr' ? 'बंद करा' : lang === 'hi' ? 'हटाएं' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Official Beneficiary Authentication Gate */}
      {!user && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-7 rounded-3xl border border-blue-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'अधिकृत अहवालासाठी लॉगिन आवश्यक' : lang === 'hi' ? 'आधिकारिक रिपोर्ट हेतु प्रमाणीकरण आवश्यक' : 'Authentication Required'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              {lang === 'mr' ? 'बँक-योग्य DPR अहवाल व कर्ज सवलत सुरक्षित करण्यासाठी लॉगिन करा' : lang === 'hi' ? 'बैंक-योग्य DPR रिपोर्ट व सब्सिडी सुरक्षित रखने हेतु लॉगिन करें' : 'Sign In to Unlock Bank-Ready DPR & Subsidy Feasibility'}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              {lang === 'mr' 
                ? 'शासकीय सवलतीचे कर्ज, ४% महिला सवलत आणि बँकेत सादर करण्यासाठी आवश्यक असलेला DPR अहवाल सुरक्षित करण्यासाठी कृपया लॉगिन करा.'
                : lang === 'hi'
                ? 'सरकारी रियायती लोन, 4% महिला छूट और बैंक में जमा करने योग्य विस्तृत प्रोजेक्ट रिपोर्ट (DPR) तैयार करने हेतु लॉगिन करें।'
                : 'Sign in with Google or email to generate bank-compliant Detailed Project Reports, store your advisory records, and apply for government subsidies.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{lang === 'mr' ? 'गुगलने लॉगिन करा' : lang === 'hi' ? 'गूगल से लॉगिन करें' : 'Continue with Google'}</span>
            </button>

            <button
              type="button"
              onClick={() => login('beneficiary@samarth.gov.in', 'Demo123!')}
              className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white font-bold rounded-xl text-xs border border-blue-400/30 flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <span>{lang === 'mr' ? '१-क्लिक सत्यापित लाभार्थी मोड' : lang === 'hi' ? '1-क्लिक सत्यापित लाभार्थी मोड' : '1-Click Beneficiary Access'}</span>
            </button>
          </div>
        </div>
      )}


      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
        
        {/* STEP 1: Trade / Business Category */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-black text-[#0B3D91]">
                {lang === 'hi' ? 'चरण 1: आप कौन सा ग्रामीण व्यवसाय शुरू या बढ़ाना चाहते हैं?' : 'Step 1: Which business do you plan to establish or expand?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {lang === 'hi' ? 'प्रस्तावित व्यावसायिक क्षेत्र चुनें (Proposed Business Category):' : 'Select your proposed business category:'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {businessTypes.map((b) => {
                const Icon = b.icon;
                const isSelected = formData.business_type === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, business_type: b.id })}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2.5 transition-all duration-200 card-hover-lift ${
                      isSelected
                        ? 'border-[#0B3D91] bg-blue-50/80 ring-2 ring-[#0B3D91] shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#0B3D91] text-white shadow-xs' : 'bg-slate-100 text-[#0B3D91]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0B3D91]" />}
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">
                        {lang === 'hi' ? b.name : b.nameEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Business Title Details */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'hi' ? 'व्यवसाय का नाम या संक्षिप्त विचार (वैकल्पिक):' : 'Specific Enterprise Name / Idea (Optional):'}
              </label>
              <input
                type="text"
                value={formData.business_title}
                onChange={(e) => setFormData({ ...formData, business_title: e.target.value })}
                placeholder={lang === 'hi' ? 'उदा: 4 मुर्राह भैंसों की मिनी डेयरी, किराना सुपरस्टोर...' : 'e.g., 4 Buffaloes Mini Dairy, Ready-made stitching shop...'}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gradient-to-r from-[#0B3D91] to-[#072a66] hover:from-[#093275] hover:to-[#041a3d] text-white font-bold rounded-xl flex items-center space-x-2 text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <span>{lang === 'hi' ? 'अगला: मार्जिन पूंजी दर्ज करें' : 'Next: Margin Capital'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Smart Financial Calculator & Scheme Router Inputs */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-black text-[#0B3D91]">
                {lang === 'hi' ? 'चरण 2: आपके पास कुल कितनी मार्जिन पूंजी (10%) उपलब्ध है?' : 'Step 2: How much Available Margin Capital (10%) do you possess?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {lang === 'hi'
                  ? 'सरकारी नियमों के तहत आपको कुल प्रोजेक्ट लागत का केवल 10% मार्जिन मनी देना होता है; बाकी 90% लोन मिलता है।'
                  : 'Under government schemes, you contribute a 10% margin fraction while SCAs fund the remaining 90% as a concessional loan.'}
              </p>
            </div>

            {/* Input Mode Selector Pill */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl max-w-sm">
              <button
                type="button"
                onClick={() => setInputMode('margin')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  inputMode === 'margin'
                    ? 'bg-white text-[#0B3D91] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'मार्जिन पूंजी से (10%)' : 'By Margin Capital (10%)'}
              </button>
              <button
                type="button"
                onClick={() => setInputMode('project_cost')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  inputMode === 'project_cost'
                    ? 'bg-white text-[#0B3D91] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'hi' ? 'कुल प्रोजेक्ट लागत से' : 'By Total Project Cost'}
              </button>
            </div>

            {/* Mode A: Enter Available Margin Capital */}
            {inputMode === 'margin' ? (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'hi' ? 'आपकी उपलब्ध मार्जिन पूंजी (Available Margin Capital in ₹):' : 'Available Margin Capital (in ₹):'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={formData.margin_capital}
                    onChange={(e) => handleMarginChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-amber-300 text-lg font-black text-amber-950 focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-amber-50/40"
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {lang === 'hi' ? `उदा: ₹1,00,000 मार्जिन पूंजी = ₹10,00,000 कुल प्रोजेक्ट लागत (₹9,00,000 लोन)` : `Example: ₹1,00,000 margin establishes a ₹10,00,000 project cost and ₹9,00,000 loan eligibility.`}
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'hi' ? 'कुल प्रोजेक्ट लागत (Total Project Cost in ₹):' : 'Total Project Cost (in ₹):'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-bold text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="10000"
                    max="5000000"
                    step="5000"
                    value={formData.investment_amount}
                    onChange={(e) => handleProjectCostChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-blue-300 text-lg font-black text-[#0B3D91] focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-blue-50/40"
                  />
                </div>
              </div>
            )}

            {/* Quick Presets for SIH 2026 Problem Guidelines */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'hi' ? 'त्वरित योजना प्रीसेट (SIH 2026 Norms):' : 'Quick Scheme Presets (SIH 2026 Rules):'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {presetMarginAmounts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        margin_capital: p.margin,
                        investment_amount: p.cost
                      }));
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.margin_capital === p.margin
                        ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-extrabold text-xs">{p.label}</div>
                    <div className={`text-[10px] mt-0.5 ${formData.margin_capital === p.margin ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                      {p.scheme}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Financial Structuring & Scheme Auto-Selection Preview */}
            <div className="bg-gradient-to-br from-slate-900 to-[#072a66] text-white p-5 rounded-2xl space-y-4 shadow-lg border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#FF9933] uppercase tracking-wider flex items-center space-x-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'स्वचालित योजना चयन (Scheme Auto-Selection)' : 'Automated Scheme Router'}</span>
                </span>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${isMicroFinance ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-950'}`}>
                  {isMicroFinance ? 'Logic A: Micro Finance' : 'Logic B: Term Loan'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                  <span className="text-[11px] text-slate-300 block font-medium">
                    {lang === 'hi' ? 'व्यवहार्य प्रोजेक्ट लागत' : 'Feasible Project Cost'}
                  </span>
                  <div className="text-xl font-black text-white">
                    ₹{currentCost.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400">Available / 10%</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-amber-300/30">
                  <span className="text-[11px] text-amber-200 block font-medium">
                    {lang === 'hi' ? 'आपकी 10% मार्जिन मनी' : 'Your 10% Margin Share'}
                  </span>
                  <div className="text-xl font-black text-amber-300">
                    ₹{currentMargin.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-amber-200/70">Own capital required</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-emerald-300/30">
                  <span className="text-[11px] text-emerald-200 block font-medium">
                    {lang === 'hi' ? '90% सरकारी रियायती लोन' : '90% Loan Eligibility'}
                  </span>
                  <div className="text-xl font-black text-emerald-300">
                    ₹{currentLoan.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-200/70">
                    {isMicroFinance ? 'Rate: 6.5% • 3 Yrs (3m Mor)' : 'Rate: 8.0% • 7 Yrs (6m Mor)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl flex items-center space-x-1.5 text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-gradient-to-r from-[#0B3D91] to-[#072a66] hover:from-[#093275] hover:to-[#041a3d] text-white font-bold rounded-xl flex items-center space-x-2 text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <span>{lang === 'hi' ? 'अगला: स्थान व स्थानीय प्रोफाइल' : 'Next: Local Profile'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Beneficiary Profile & Geographic Location */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-black text-[#0B3D91]">
                {lang === 'hi' ? 'चरण 3: अपनी भौगोलिक स्थिति (ग्राम/ब्लॉक) एवं प्रोफाइल बताएं' : 'Step 3: Geographic Location & Beneficiary Profile'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {lang === 'hi'
                  ? 'हाइपर-लोकल बाजार पहुंच, प्रतिस्पर्धा मैपिंग और स्थानीय मांग का विश्लेषण करने के लिए आवश्यक:'
                  : 'Essential to generate 5-10 km radius market reach, competitor density, and pricing analysis:'}
              </p>
            </div>

            {/* Gender / Category (For Women Concession) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'hi' ? 'आवेदक श्रेणी (Gender / Beneficiary Category):' : 'Beneficiary Category:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'General', label: 'पुरुष / सामान्य', labelEn: 'Male / General' },
                  { id: 'Female', label: 'महिला (1% छूट पात्र)', labelEn: 'Female (1% Rebate)' },
                  { id: 'Other', label: 'SHG समूह / अन्य', labelEn: 'SHG / Group' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g.id })}
                    className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                      formData.gender === g.id
                        ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'hi' ? g.label : g.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience in Trade */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'hi' ? 'इस कार्य में अनुभव स्तर:' : 'Experience in this trade:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['New', '1-3 years', '3+ years'].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience_level: exp })}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                      formData.experience_level === exp
                        ? 'bg-[#138808] text-white border-[#138808] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {exp === 'New' ? (lang === 'hi' ? 'नया व्यवसाय (0 वर्ष)' : 'New Venture') :
                     exp === '1-3 years' ? (lang === 'hi' ? '1 से 3 वर्ष' : '1-3 Years') :
                     (lang === 'hi' ? '3+ वर्ष का अनुभव' : '3+ Years')}
                  </button>
                ))}
              </div>
            </div>

            {/* Geographic Location: State & District/Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'hi' ? 'राज्य (State):' : 'State:'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Uttar Pradesh, Bihar, Rajasthan, MP..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'hi' ? 'जिला / ब्लॉक / ग्राम पंचायत (Village / Block):' : 'Village / Block / District:'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder={lang === 'hi' ? 'उदा: वाराणसी (चिरईगांव ब्लॉक)' : 'e.g. Varanasi (Chiraigaon Block)'}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl flex items-center space-x-1.5 text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-gradient-to-r from-[#138808] to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold rounded-xl flex items-center space-x-2 text-base shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{lang === 'hi' ? 'हाइपर-लोकल रिपोर्ट तैयार हो रही है...' : 'Synthesizing Feasibility Study...'}</span>
                  </>
                ) : (
                  <>
                    <span>{lang === 'hi' ? 'व्यवहार्यता अध्ययन व वित्तीय योजना तैयार करें' : 'Generate Full Feasibility & Loan Plan'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onApplyTranscript={handleVoiceTranscript}
      />
    </div>
  );
};

export default FormPage;
