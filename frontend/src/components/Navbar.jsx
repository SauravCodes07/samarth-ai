import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  User, 
  LogOut, 
  LogIn, 
  X, 
  Menu,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  Globe
} from 'lucide-react';

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const { 
    user, 
    login, 
    register, 
    loginWithGoogle, 
    logout, 
    isConfigured, 
    showAuthModal, 
    setShowAuthModal, 
    authMode, 
    setAuthMode 
  } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (authMode === 'login') {
        const res = await login(email, password);
        if (res.error) throw res.error;
      } else {
        const res = await register(email, password);
        if (res.error) throw res.error;
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res?.error) {
        throw res.error;
      }
      setShowAuthModal(false);
    } catch (err) {
      setAuthError(err.message || 'Google sign-in failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const navLinks = [
    { 
      path: '/schemes', 
      labelEn: 'Schemes Directory', 
      labelHi: 'सरकारी योजनाएं', 
      labelMr: 'सरकारी योजना',
      icon: BookOpen 
    },
    { 
      path: '/calculator', 
      labelEn: 'Loan & EMI Calculator', 
      labelHi: 'स्मार्ट कैलकुलेटर', 
      labelMr: 'कर्ज व EMI गणक',
      icon: Calculator 
    },
    { 
      path: '/advisory', 
      labelEn: 'AI Feasibility Study', 
      labelHi: 'एआई व्यवहार्यता रिपोर्ट', 
      labelMr: 'एआय व्यवसाय अहवाल',
      icon: Sparkles,
      highlight: true
    },
  ];

  const getNavLabel = (link) => {
    if (lang === 'mr') return link.labelMr;
    if (lang === 'hi') return link.labelHi;
    return link.labelEn;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition-all overflow-hidden relative">
                <img 
                  src="/logo.png" 
                  alt="Samarth AI Logo" 
                  className="w-full h-full object-cover scale-145 drop-shadow-xs transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {lang === 'mr' ? 'समर्थ AI' : lang === 'hi' ? 'समर्थ AI' : 'Samarth AI'}
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                    Enterprise
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {lang === 'mr' ? 'राष्ट्रीय सूक्ष्म व लघु उद्योग वित्तीय सल्लागार' : lang === 'hi' ? 'उद्यम वित्तीय सलाहकार मंच' : 'National MSME Financial Advisory'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-blue-700 bg-blue-50/80 border border-blue-200/80'
                        : link.highlight
                        ? 'text-slate-800 hover:text-blue-700 hover:bg-slate-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{getNavLabel(link)}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* 3-Language Segmented Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'en' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'hi' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => setLang('mr')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'mr' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  मराठी
                </button>
              </div>

              {/* Authentication Button */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-slate-100/90 border border-slate-200 py-1 px-2.5 rounded-lg text-xs font-medium text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="max-w-[110px] truncate">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'लॉगिन' : lang === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                <button onClick={() => setLang('en')} className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-white text-blue-700' : 'text-slate-600'}`}>EN</button>
                <button onClick={() => setLang('hi')} className={`px-1.5 py-0.5 rounded ${lang === 'hi' ? 'bg-white text-blue-700' : 'text-slate-600'}`}>हि</button>
                <button onClick={() => setLang('mr')} className={`px-1.5 py-0.5 rounded ${lang === 'mr' ? 'bg-white text-blue-700' : 'text-slate-600'}`}>म</button>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{getNavLabel(link)}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-600 truncate">{user.email}</span>
                  <button onClick={logout} className="text-xs text-rose-600 font-medium">
                    {lang === 'mr' ? 'लॉगआउट' : lang === 'hi' ? 'लॉगआउट' : 'Log out'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="w-full text-center bg-slate-900 text-white py-2 rounded-lg text-xs font-semibold"
                >
                  {lang === 'mr' ? 'खाते लॉगिन / नोंदणी' : lang === 'hi' ? 'खाता लॉगिन / रजिस्टर' : 'Sign In / Register'}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modern Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {authMode === 'login' 
                  ? (lang === 'mr' ? 'आपल्या खात्यात प्रवेश करा' : lang === 'hi' ? 'अपने खाते में प्रवेश करें' : 'Sign In to Your Account') 
                  : (lang === 'mr' ? 'नवीन खाते तयार करा' : lang === 'hi' ? 'नया खाता बनाएं' : 'Create an Account')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'mr'
                  ? 'आपल्या शासकीय योजना व आर्थिक गणना सुरक्षित ठेवण्यासाठी'
                  : lang === 'hi' 
                  ? 'अपनी योजनाओं व वित्तीय गणनाओं को सुरक्षित रखने के लिए' 
                  : 'Save and track your loan structures and advisory reports'}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                {authError}
              </div>
            )}

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="w-full mb-4 flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-2.5 rounded-lg text-sm transition-all shadow-2xs hover:shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{lang === 'mr' ? 'गूगल द्वारे सुरू ठेवा' : lang === 'hi' ? 'गूगल के साथ जारी रखें' : 'Continue with Google'}</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">
                  {lang === 'mr' ? 'किंवा ईमेल द्वारे' : lang === 'hi' ? 'या ईमेल द्वारा' : 'Or continue with email'}
                </span>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'mr' ? 'ईमेल पत्ता' : lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'mr' ? 'पासवर्ड' : lang === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer"
              >
                {authLoading 
                  ? (lang === 'mr' ? 'प्रतीक्षा करा...' : lang === 'hi' ? 'प्रतीक्षा करें...' : 'Processing...') 
                  : authMode === 'login' 
                    ? (lang === 'mr' ? 'लॉगिन करा' : lang === 'hi' ? 'लॉगिन करें' : 'Sign In') 
                    : (lang === 'mr' ? 'नोंदणी करा' : lang === 'hi' ? 'रजिस्टर करें' : 'Create Account')}
              </button>

              <button
                type="button"
                onClick={async () => {
                  await login('beneficiary@samarth.gov.in', 'Demo123!');
                  setShowAuthModal(false);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-xs transition-all border border-slate-200 cursor-pointer"
              >
                {lang === 'mr' ? '१-क्लिक चाचणी मोड (Demo Login)' : lang === 'hi' ? '1-क्लिक टेस्ट मोड (डेमो लॉगिन)' : '1-Click Quick Demo Login'}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <>
                  <span>{lang === 'mr' ? 'खाते नाही? ' : lang === 'hi' ? 'खाता नहीं है? ' : "Don't have an account? "}</span>
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {lang === 'mr' ? 'नवीन खाते बनवा' : lang === 'hi' ? 'नया खाता बनाएं' : 'Sign Up'}
                  </button>
                </>
              ) : (
                <>
                  <span>{lang === 'mr' ? 'आधीच खाते आहे? ' : lang === 'hi' ? 'पहले से खाता है? ' : 'Already have an account? '}</span>
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {lang === 'mr' ? 'लॉगिन करा' : lang === 'hi' ? 'लॉगिन करें' : 'Sign In'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
