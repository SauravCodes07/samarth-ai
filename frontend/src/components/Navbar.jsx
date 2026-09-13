import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Landmark, 
  Globe, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Calculator, 
  User, 
  LogOut, 
  LogIn, 
  X, 
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Building2
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

  return (
    <>
      <header className="bg-gradient-to-r from-[#072a66] via-[#0B3D91] to-[#041a3d] text-white shadow-lg sticky top-0 z-50 backdrop-blur-md">
        {/* Top Gov Trust Bar */}
        <div className="bg-[#041a3d]/90 py-1.5 px-4 text-xs flex justify-between items-center text-slate-200 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#138808] animate-pulse"></span>
            <span className="font-semibold tracking-wide">SIH 2026 Problem Statement ID: 26091</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-slate-300">NSFDC & MoSJE Concessional Credit Guidelines</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="inline-flex items-center space-x-1 text-[#FF9933] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>10% Margin • 90% Loan Guaranteed Rules</span>
            </span>
            {isConfigured && (
              <span className="hidden md:inline-flex items-center space-x-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Supabase Live Connected</span>
              </span>
            )}
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Brand & Logo */}
          <Link to="/" className="flex items-center space-x-3 text-white group">
            <div className="w-11 h-11 rounded-xl bg-white text-[#0B3D91] flex items-center justify-center font-bold shadow-md border-2 border-[#FF9933] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,153,51,0.5)]">
              <Landmark className="w-6 h-6 text-[#0B3D91]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-amber-200 transition-colors">
                  {lang === 'hi' ? 'समर्थ (SAMARTH)' : 'SAMARTH AI'}
                </span>
                <span className="bg-gradient-to-r from-[#FF9933] to-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-blue-100/90 font-medium">
                {lang === 'hi'
                  ? 'हाइपर-लोकल बिजनेस एडवाइजरी एवं स्कीम कैलकुलेटर'
                  : 'Hyper-Local Business Advisory & Scheme Calculator'}
              </p>
            </div>
          </Link>

          {/* Action Links & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              to="/schemes"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                location.pathname === '/schemes'
                  ? 'bg-white/20 text-[#FF9933] shadow-inner border border-white/20'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'hi' ? 'सरकारी योजनाएं' : 'All Schemes'}
              </span>
            </Link>

            <Link
              to="/calculator"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                location.pathname === '/calculator'
                  ? 'bg-white/20 text-[#FF9933] shadow-inner border border-white/20'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#FF9933]" />
              <span className="hidden md:inline">
                {lang === 'hi' ? 'स्मार्ट कैलकुलेटर' : 'Scheme Calculator'}
              </span>
            </Link>

            <Link
              to="/advisory"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-md transform hover:-translate-y-0.5 ${
                location.pathname === '/advisory'
                  ? 'bg-[#FF9933] text-black shadow-[0_0_15px_rgba(255,153,51,0.5)]'
                  : 'bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>
                {lang === 'hi' ? 'व्यवहार्यता रिपोर्ट' : 'Feasibility Report'}
              </span>
            </Link>

            {/* Bilingual Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-white/20 transition-all duration-200"
              title="Toggle Hindi / English"
            >
              <Globe className="w-4 h-4 text-[#FF9933]" />
              <span>{lang === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Supabase User Auth State / Button */}
            {user ? (
              <div className="flex items-center space-x-2 bg-white/10 pl-3 pr-1.5 py-1 rounded-xl border border-white/15">
                <span className="text-xs text-blue-100 max-w-[90px] truncate">
                  {user.email?.split('@')[0] || 'User'}
                </span>
                <button
                  onClick={logout}
                  className="p-1 text-slate-300 hover:text-rose-300 transition-colors"
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
                className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-white/20 transition-all duration-200"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Supabase Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 relative overflow-hidden">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#0B3D91] mb-2 shadow-xs">
                <Landmark className="w-6 h-6 text-[#0B3D91]" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {authMode === 'login' 
                  ? (lang === 'hi' ? 'उद्यमी पोर्टल लॉगिन' : 'Entrepreneur Portal Login') 
                  : (lang === 'hi' ? 'नया खाता बनाएं' : 'Create Beneficiary Account')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'hi' 
                  ? 'Supabase डेटाबेस से सुरक्षित सिंक्रोनाइज़ेशन' 
                  : 'Live Supabase Auth & Database Synchronization'}
              </p>
            </div>

            {authError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="beneficiary@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#072a66] hover:from-[#093275] hover:to-[#041a3d] text-white font-bold text-sm shadow-md transition-all duration-200 disabled:opacity-50"
              >
                {authLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="font-bold text-[#0B3D91] hover:underline"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="font-bold text-[#0B3D91] hover:underline"
                  >
                    Sign in here
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
