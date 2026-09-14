import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SpotlightCard from '../components/ui/SpotlightCard';
import ShineButton from '../components/ui/ShineButton';
import BackgroundBeams from '../components/ui/BackgroundBeams';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  BadgeCheck, 
  Landmark, 
  Calendar, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  LogOut, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Coins,
  FileCheck,
  Building
} from 'lucide-react';

const ProfilePage = () => {
  const { lang } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            {lang === 'mr' ? 'कृपया प्रथम लॉगिन करा' : lang === 'hi' ? 'कृपया पहले लॉगिन करें' : 'Please Sign In'}
          </h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            {lang === 'mr' 
              ? 'आपले प्रोफाइल आणि सरकारी योजनांची पात्रता पाहण्यासाठी खात्यात प्रवेश करा.' 
              : lang === 'hi' 
              ? 'अपना प्रोफाइल और सरकारी योजनाओं की पात्रता देखने के लिए खाते में प्रवेश करें।' 
              : 'Sign in to access your beneficiary profile, saved schemes, and credit entitlements.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
          >
            {lang === 'mr' ? 'मुख्य पृष्ठावर जा' : lang === 'hi' ? 'होम पेज पर जाएं' : 'Go to Home'}
          </button>
        </div>
      </div>
    );
  }

  const initial = user.email?.[0]?.toUpperCase() || 'U';
  const username = user.email?.split('@')[0] || 'Beneficiary';

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden card-glow-interactive relative">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
            <BackgroundBeams />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white text-blue-900 flex items-center justify-center text-3xl font-black shadow-xl border-2 border-amber-300">
                  {initial}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{username}</h1>
                    <BadgeCheck className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-xs text-blue-200 mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-radar"></span>
                      <CheckCircle2 className="w-3 h-3" />
                      {lang === 'mr' ? 'सत्यापित अर्जदार (MoSJE)' : lang === 'hi' ? 'सत्यापित लाभार्थी (MoSJE)' : 'Verified Beneficiary'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      <Landmark className="w-3 h-3" />
                      {lang === 'mr' ? 'ग्रामीण MSME श्रेणी' : lang === 'hi' ? 'ग्रामीण MSME श्रेणी' : 'Rural MSME Category'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{lang === 'mr' ? 'लॉगआउट करा' : lang === 'hi' ? 'लॉगआउट करें' : 'Sign Out'}</span>
              </button>
            </div>
          </div>

          {/* Quick Entitlements Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/70 p-4 sm:p-5">
            <div className="py-2 sm:py-0 sm:px-4">
              <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                {lang === 'mr' ? 'किमान स्वतःचे भांडवल' : lang === 'hi' ? 'न्यूनतम मार्जिन पूंजी' : 'Minimum Margin Share'}
              </span>
              <div className="flex items-baseline space-x-1.5 mt-0.5">
                <span className="text-xl font-black text-blue-700">10%</span>
                <span className="text-xs text-slate-600 font-medium">({lang === 'mr' ? '९०% सरकारी कर्ज' : lang === 'hi' ? '90% सरकारी लोन' : '90% Govt Loan'})</span>
              </div>
            </div>

            <div className="py-2 sm:py-0 sm:px-4">
              <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                {lang === 'mr' ? 'हप्ता सवलत (मोरेटोरियम)' : lang === 'hi' ? 'मोरेटोरियम अवधि' : 'Moratorium Holiday'}
              </span>
              <div className="flex items-baseline space-x-1.5 mt-0.5">
                <span className="text-xl font-black text-amber-600">6 – 12</span>
                <span className="text-xs text-slate-600 font-medium">{lang === 'mr' ? 'महिने' : lang === 'hi' ? 'माह' : 'Months'}</span>
              </div>
            </div>

            <div className="py-2 sm:py-0 sm:px-4">
              <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                {lang === 'mr' ? 'सवलतीचा व्याजदर' : lang === 'hi' ? 'रियायती ब्याज दर' : 'Concessional Interest'}
              </span>
              <div className="flex items-baseline space-x-1.5 mt-0.5">
                <span className="text-xl font-black text-emerald-600">4% – 8%</span>
                <span className="text-xs text-slate-600 font-medium">{lang === 'mr' ? 'वार्षिक' : lang === 'hi' ? 'वार्षिक' : 'p.a.'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Website Features Access */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span>{lang === 'mr' ? 'मुख्य वेबसाइट सुविधा व साधने' : lang === 'hi' ? 'मुख्य वेबसाइट सुविधाएं व टूल्स' : 'Main Portal Tools & Services'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Schemes Directory Card */}
              <SpotlightCard 
                onClick={() => navigate('/schemes')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group card-glow-interactive"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {lang === 'mr' ? 'सरकारी योजना निर्देशिका' : lang === 'hi' ? 'सरकारी योजनाएं डायरेक्टरी' : 'Schemes Directory'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {lang === 'mr' 
                    ? 'MoSJE, PMEGP, मुद्रा आणि ग्रामीण स्वयंरोजगार योजना शोधा.' 
                    : lang === 'hi' 
                    ? 'MoSJE, PMEGP, मुद्रा और ग्रामीण योजनाओं की पूर्ण सूची देखें।' 
                    : 'Explore all verified concessional credit schemes from MoSJE and MyScheme.'}
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'mr' ? 'योजना पहा' : lang === 'hi' ? 'योजनाएं देखें' : 'View Schemes'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </SpotlightCard>

              {/* Loan & EMI Calculator Card */}
              <SpotlightCard 
                onClick={() => navigate('/calculator')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group card-glow-interactive"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                  {lang === 'mr' ? 'कर्ज व मोरेटोरियम गणक' : lang === 'hi' ? 'स्मार्ट लोन व EMI कैलकुलेटर' : 'Smart Loan & EMI Calculator'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {lang === 'mr' 
                    ? '१०% भांडवल आणि ६ महिन्यांच्या हप्ता सवलतीसह अचूक EMI गणना करा.' 
                    : lang === 'hi' 
                    ? '10% मार्जिन पूंजी और 6 माह की किश्त छूट के साथ सटीक गणना करें।' 
                    : 'Calculate loan breakdown, 10% margin, and EMI with moratorium relief.'}
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'mr' ? 'कॅल्क्युलेटर उघडा' : lang === 'hi' ? 'कैलकुलेटर खोलें' : 'Open Calculator'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </SpotlightCard>

              {/* AI Feasibility & Bank DPR Card */}
              <SpotlightCard 
                onClick={() => navigate('/advisory')}
                className="sm:col-span-2 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-blue-800 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden card-glow-interactive"
              >
                <BackgroundBeams />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'mr' ? 'फ्लॅगशिप AI टूल' : lang === 'hi' ? 'फ्लैगशिप AI टूल' : 'Flagship AI Tool'}</span>
                    </div>
                    <h3 className="text-lg font-black text-white">
                      {lang === 'mr' ? 'AI व्यवसाय व्यवहार्यता व बँक DPR अहवाल' : lang === 'hi' ? 'एआई व्यवसाय व्यवहार्यता व बैंक DPR रिपोर्ट' : 'AI Feasibility Study & Bank DPR Report'}
                    </h3>
                    <p className="text-xs text-blue-200 max-w-xl leading-relaxed">
                      {lang === 'mr'
                        ? 'डेअरी, किराणा किंवा शिलाईसाठी अधिकृत बँक-मान्य DPR अहवाल PDF त्वरित तयार करा.'
                        : lang === 'hi'
                        ? 'डेयरी, किराना या सिलाई व्यवसाय हेतु आधिकारिक बैंक-मान्य DPR रिपोर्ट तुरंत प्राप्त करें।'
                        : 'Generate official, bank-ready Detailed Project Reports with MoSJE subsidy mapping.'}
                    </p>
                  </div>
                  <ShineButton
                    variant="gold"
                    onClick={() => navigate('/advisory')}
                    className="space-x-2 px-4 py-2.5 text-xs shrink-0"
                  >
                    <span>{lang === 'mr' ? 'DPR तयार करा' : lang === 'hi' ? 'DPR बनाएं' : 'Generate DPR'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </ShineButton>
                </div>
              </SpotlightCard>

            </div>
          </div>

          {/* Account & Verification Sidebar */}
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'mr' ? 'खाते व सुरक्षा माहिती' : lang === 'hi' ? 'खाता व सुरक्षा विवरण' : 'Account & Security'}</span>
            </h2>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'लाभार्थी आयडी' : lang === 'hi' ? 'लाभार्थी आईडी' : 'Beneficiary ID'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {user.id ? `${user.id.substring(0, 16)}...` : 'BENEFICIARY-101'}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'डेटा संकालन स्थिती' : lang === 'hi' ? 'डेटा सिंक स्थिति' : 'Database Status'}
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{lang === 'mr' ? 'सुपाबेस क्लाउडशी जोडलेले' : lang === 'hi' ? 'सुपाबेस क्लाउड से कनेक्टेड' : 'Connected to Supabase'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'शासकीय पडताळणी' : lang === 'hi' ? 'सरकारी सत्यापन' : 'Government Verification'}
                </span>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {lang === 'mr'
                    ? 'MoSJE आणि MyScheme नियमांनुसार १०% मार्जिन सवलतीसाठी पात्र.'
                    : lang === 'hi'
                    ? 'MoSJE एवं MyScheme नियमों के अनुसार 10% मार्जिन छूट हेतु सत्यापित।'
                    : 'Verified under MoSJE guidelines for 10% beneficiary margin eligibility.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 rounded-xl text-xs transition-colors border border-rose-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'खाते लॉगआउट करा' : lang === 'hi' ? 'खाता लॉगआउट करें' : 'Sign Out'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
