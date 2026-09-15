import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, LogIn, ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading, openAuthModal } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      openAuthModal('login');
    }
  }, [loading, user, openAuthModal]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500">
          {lang === 'mr' ? 'खाते पडताळणी सुरू आहे...' : lang === 'hi' ? 'खाता सत्यापन हो रहा है...' : 'Verifying authentication...'}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'mr' ? 'खाते लॉगिन आवश्यक आहे' : lang === 'hi' ? 'खाता लॉगिन आवश्यक है' : 'Sign In Required'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'mr' 
                ? 'शासकीय योजना, ईएमआय गणक आणि व्यवसाय व्यवहार्यता अहवाल पाहण्यासाठी कृपया आधी आपल्या खात्यात लॉगिन करा.'
                : lang === 'hi'
                ? 'सरकारी योजनाएं, ईएमआई कैलकुलेटर और एआई प्रोजेक्ट रिपोर्ट देखने के लिए कृपया पहले अपने खाते में लॉगिन करें।'
                : 'To access the Government Schemes Directory, EMI Calculator, and Feasibility Studies, please sign in to your beneficiary account.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{lang === 'mr' ? 'आत्ताच लॉगिन करा' : lang === 'hi' ? 'अभी लॉगिन करें' : 'Sign In Now'}</span>
          </button>

          <p className="text-[11px] text-slate-400">
            {lang === 'mr' ? 'नवीन आहात? लॉगिन विंडोमधून नवीन खाते बनवा' : lang === 'hi' ? 'नए उपयोगकर्ता हैं? लॉगिन विंडो से नया खाता बनाएं' : 'New beneficiary? Create an account in 10 seconds'}
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
