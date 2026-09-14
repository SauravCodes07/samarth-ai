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
  const { lang, toggleLanguage } = useLanguage();
  const { user, login, register, logout, isConfigured } = useAuth();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
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

  const navLinks = [
    { 
      path: '/schemes', 
      labelEn: 'Schemes Directory', 
      labelHi: 'सरकारी योजनाएं', 
      icon: BookOpen 
    },
    { 
      path: '/calculator', 
      labelEn: 'Loan & EMI Calculator', 
      labelHi: 'स्मार्ट कैलकुलेटर', 
      icon: Calculator 
    },
    { 
      path: '/advisory', 
      labelEn: 'AI Feasibility Study', 
      labelHi: 'एआई व्यवहार्यता रिपोर्ट', 
      icon: Sparkles,
      highlight: true
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-700 text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                <Building2 className="w-5 h-5 text-blue-100" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {lang === 'hi' ? 'समर्थ AI' : 'Samarth AI'}
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                    Enterprise
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {lang === 'hi' ? 'उद्यम वित्तीय सलाहकार मंच' : 'National MSME Financial Advisory'}
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
                    <span>{lang === 'hi' ? link.labelHi : link.labelEn}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
                title="Toggle Language / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
              </button>

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
                  <span>{lang === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
              >
                {lang === 'hi' ? 'EN' : 'हि'}
              </button>
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
                  <span>{lang === 'hi' ? link.labelHi : link.labelEn}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-600 truncate">{user.email}</span>
                  <button onClick={logout} className="text-xs text-rose-600 font-medium">
                    {lang === 'hi' ? 'लॉगआउट' : 'Log out'}
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
                  {lang === 'hi' ? 'खाता लॉगिन / रजिस्टर' : 'Sign In / Register'}
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
                  ? (lang === 'hi' ? 'अपने खाते में प्रवेश करें' : 'Sign In to Your Account') 
                  : (lang === 'hi' ? 'नया खाता बनाएं' : 'Create an Account')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'hi' 
                  ? 'अपनी योजनाओं व वित्तीय गणनाओं को सुरक्षित रखने के लिए' 
                  : 'Save and track your loan structures and advisory reports'}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
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
                  {lang === 'hi' ? 'पासवर्ड' : 'Password'}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-50"
              >
                {authLoading 
                  ? (lang === 'hi' ? 'प्रतीक्षा करें...' : 'Processing...') 
                  : authMode === 'login' 
                    ? (lang === 'hi' ? 'लॉगिन करें' : 'Sign In') 
                    : (lang === 'hi' ? 'रजिस्टर करें' : 'Create Account')}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <>
                  <span>{lang === 'hi' ? 'खाता नहीं है? ' : "Don't have an account? "}</span>
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {lang === 'hi' ? 'नया खाता बनाएं' : 'Sign Up'}
                  </button>
                </>
              ) : (
                <>
                  <span>{lang === 'hi' ? 'पहले से खाता है? ' : 'Already have an account? '}</span>
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {lang === 'hi' ? 'लॉगिन करें' : 'Sign In'}
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
