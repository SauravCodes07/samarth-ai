import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
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
  Globe,
  Settings,
  Sun,
  Moon,
  Phone,
  MapPin
} from 'lucide-react';
import UserProfileModal from './UserProfileModal';

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
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
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [userState, setUserState] = useState('Maharashtra');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (authMode === 'login') {
        const res = await login(email, password);
        if (res.error) throw res.error;
      } else {
        if (!fullName.trim()) {
          throw new Error(lang === 'mr' ? 'कृपया आपले पूर्ण नाव प्रविष्ट करा.' : lang === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
        }
        if (password.length < 6) {
          throw new Error(lang === 'mr' ? 'पासवर्ड किमान ६ अक्षरांचा असावा.' : lang === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.');
        }
        if (password !== confirmPassword) {
          throw new Error(lang === 'mr' ? 'पासवर्ड जुळत नाही. कृपया पुन्हा तपासा.' : lang === 'hi' ? 'पासवर्ड मेल नहीं खाते। कृपया पुनः जांचें।' : 'Passwords do not match. Please verify.');
        }
        if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
          throw new Error(lang === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर टाका.' : lang === 'hi' ? 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
        }
        const res = await register(email, password, {
          full_name: fullName.trim(),
          phone: phone.trim(),
          state: userState
        });
        if (res.error) throw res.error;
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFullName('');
      setPhone('');
      // Route user into the main portal immediately upon login
      if (location.pathname === '/') {
        navigate('/schemes');
      }
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
      if (location.pathname === '/') {
        navigate('/schemes');
      }
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
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/90 shadow-xs transition-colors duration-300">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition-all overflow-hidden relative shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Samarth AI Logo" 
                  className="w-full h-full object-cover scale-145 drop-shadow-xs transition-transform"
                />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center space-x-1.5 whitespace-nowrap">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lang === 'mr' ? 'समर्थ AI' : lang === 'hi' ? 'समर्थ AI' : 'Samarth AI'}
                  </span>
                  <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/60 dark:border-blue-700/50 px-1.5 py-0.2 rounded-md">
                    Enterprise
                  </span>
                </div>
                <span className="hidden xl:inline text-[10px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  {lang === 'mr' ? 'राष्ट्रीय सूक्ष्म व लघु उद्योग वित्तीय सल्लागार' : lang === 'hi' ? 'उद्यम वित्तीय सलाहकार मंच' : 'National MSME Financial Advisory'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 shrink-0">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => {
                      if (!user) {
                        setAuthMode('login');
                        setShowAuthModal(true);
                      } else {
                        navigate(link.path);
                      }
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-700/50 shadow-2xs'
                        : link.highlight
                        ? 'text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{getNavLabel(link)}</span>
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-radar"></span>
                    )}
                    {!user && (
                      <Lock className="w-3 h-3 text-amber-500/80 ml-0.5" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center space-x-2 shrink-0">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="relative p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-amber-400 hover:scale-105 transition-all shadow-2xs cursor-pointer"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* 3-Language Segmented Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/80">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    lang === 'hi' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => setLang('mr')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    lang === 'mr' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  मराठी
                </button>
              </div>

              {/* Authentication Button & Profile Trigger */}
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="shine-button flex items-center space-x-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/80 py-1.5 px-2.5 rounded-xl text-xs font-bold text-blue-900 dark:text-blue-200 transition-all cursor-pointer shadow-2xs group whitespace-nowrap"
                    title={lang === 'mr' ? 'माझे प्रोफाइल पहा' : lang === 'hi' ? 'मेरा प्रोफाइल देखें' : 'View Beneficiary Profile'}
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black group-hover:scale-105 transition-transform shrink-0">
                      {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                      {lang === 'mr' ? 'प्रोफाइल' : lang === 'hi' ? 'प्रोफाइल' : 'Profile'}
                    </span>
                  </button>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
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
                  className="shine-button inline-flex items-center space-x-1.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'लॉगिन' : lang === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Controls */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-amber-400"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                <button onClick={() => setLang('en')} className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>EN</button>
                <button onClick={() => setLang('hi')} className={`px-1.5 py-0.5 rounded ${lang === 'hi' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>हि</button>
                <button onClick={() => setLang('mr')} className={`px-1.5 py-0.5 rounded ${lang === 'mr' ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>म</button>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] px-4 py-3 space-y-2 shadow-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!user) {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    } else {
                      navigate(link.path);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{getNavLabel(link)}</span>
                  </div>
                  {!user && (
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="flex items-center space-x-2 text-left cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{lang === 'mr' ? 'प्रोफाइल उघडा' : lang === 'hi' ? 'प्रोफाइल खोलें' : 'Open Profile'}</span>
                    </div>
                  </button>
                  <button onClick={logout} className="text-xs text-rose-600 dark:text-rose-400 font-medium px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 relative max-h-[92vh] overflow-y-auto transition-colors">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-3 shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {authMode === 'login' 
                  ? (lang === 'mr' ? 'आपल्या खात्यात प्रवेश करा' : lang === 'hi' ? 'अपने खाते में प्रवेश करें' : 'Sign In to Your Account') 
                  : (lang === 'mr' ? 'नवीन लाभार्थी खाते बनवा' : lang === 'hi' ? 'नया लाभार्थी खाता बनाएं' : 'Create Beneficiary Account')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {authMode === 'login'
                  ? (lang === 'mr' ? 'आपल्या शासकीय योजना व कर्ज गणना पुन्हा पाहण्यासाठी' : lang === 'hi' ? 'अपनी सुरक्षित योजनाओं व वित्तीय रिपोर्ट तक पहुँचें' : 'Access your saved loan structures and advisory reports')
                  : (lang === 'mr' ? '१०% मार्जिन सवलतीसह शासकीय योजना अहवाल सुरक्षित साठवण्यासाठी' : lang === 'hi' ? '10% मार्जिन छूट व सरकारी स्कीम रिपोर्ट सुरक्षित रखने हेतु' : 'Save and track your loan structures and advisory reports')}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">
                {authError}
              </div>
            )}

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="w-full mb-4 flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 rounded-xl text-sm transition-all shadow-2xs hover:shadow-xs disabled:opacity-50 cursor-pointer"
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
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-medium">
                  {lang === 'mr' ? 'किंवा ईमेल द्वारे' : lang === 'hi' ? 'या ईमेल द्वारा' : 'Or continue with email'}
                </span>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'mr' ? 'पूर्ण नाव (Full Name) *' : lang === 'hi' ? 'पूरा नाम (Full Name) *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={lang === 'mr' ? 'उदा: राहुल गणेश पाटील' : lang === 'hi' ? 'उदा: राहुल शर्मा' : 'e.g. Rahul Sharma'}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'mr' ? 'मोबाईल नंबर' : lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          maxLength={10}
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {lang === 'mr' ? 'राज्य (State)' : lang === 'hi' ? 'राज्य (State)' : 'State'}
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={userState}
                          onChange={(e) => setUserState(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                        >
                          {['Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Madhya Pradesh', 'Rajasthan', 'Bihar', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'West Bengal', 'Punjab', 'Haryana', 'All India / Other'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'mr' ? 'ईमेल पत्ता (Email Address) *' : lang === 'hi' ? 'ईमेल पता (Email Address) *' : 'Email Address *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'mr' ? 'पासवर्ड (Password) *' : lang === 'hi' ? 'पासवर्ड (Password) *' : 'Password *'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'mr' ? 'पासवर्ड निश्चित करा (Confirm Password) *' : lang === 'hi' ? 'पासवर्ड की पुष्टि करें (Confirm Password) *' : 'Confirm Password *'}
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer mt-2"
              >
                {authLoading 
                  ? (lang === 'mr' ? 'प्रतीक्षा करा...' : lang === 'hi' ? 'प्रतीक्षा करें...' : 'Processing...') 
                  : authMode === 'login' 
                    ? (lang === 'mr' ? 'लॉगिन करा' : lang === 'hi' ? 'लॉगिन करें' : 'Sign In') 
                    : (lang === 'mr' ? 'नोंदणी पूर्ण करा (Complete Registration)' : lang === 'hi' ? 'खाता बनाएं (Complete Registration)' : 'Complete Registration')}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
              {authMode === 'login' ? (
                <>
                  <span>{lang === 'mr' ? 'खाते नाही? ' : lang === 'hi' ? 'खाता नहीं है? ' : "Don't have an account? "}</span>
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    {lang === 'mr' ? 'नवीन खाते बनवा (Sign Up)' : lang === 'hi' ? 'नया खाता बनाएं (Sign Up)' : 'Sign Up'}
                  </button>
                </>
              ) : (
                <>
                  <span>{lang === 'mr' ? 'आधीच खाते आहे? ' : lang === 'hi' ? 'पहले से खाता है? ' : 'Already have an account? '}</span>
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    {lang === 'mr' ? 'लॉगिन करा (Sign In)' : lang === 'hi' ? 'लॉगिन करें (Sign In)' : 'Sign In'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Beneficiary Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default Navbar;
