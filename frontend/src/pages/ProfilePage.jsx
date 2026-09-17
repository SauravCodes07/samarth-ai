import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { fetchRecentInquiries, subscribeToInquiries } from '../services/supabaseClient';
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
  Building,
  Activity,
  Radio,
  Lock
} from 'lucide-react';

const ProfilePage = () => {
  const { lang } = useLanguage();
  const { user, logout, updateUserProfile, changeUserPassword } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  // Profile Form state
  const [editFullName, setEditFullName] = useState(user?.user_metadata?.full_name || user?.full_name || '');
  const [editPhone, setEditPhone] = useState(user?.user_metadata?.phone || user?.phone || '');
  const [editState, setEditState] = useState(user?.user_metadata?.state || user?.state || 'Central / All India');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileNotice, setProfileNotice] = useState({ type: '', text: '' });

  // Password Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState({ type: '', text: '' });

  // Settings Tab: 'profile' | 'password'
  const [settingsTab, setSettingsTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setEditFullName(user.user_metadata?.full_name || user.full_name || '');
      setEditPhone(user.user_metadata?.phone || user.phone || '');
      setEditState(user.user_metadata?.state || user.state || 'Central / All India');
    }
  }, [user]);

  useEffect(() => {
    let unsubscribe = () => {};

    const loadInquiries = async () => {
      setLoadingInquiries(true);
      const data = await fetchRecentInquiries(6);
      setInquiries(data);
      setLoadingInquiries(false);
    };

    loadInquiries();

    unsubscribe = subscribeToInquiries((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        setInquiries(prev => [payload.new, ...prev.slice(0, 5)]);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-xl transition-colors">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            {lang === 'mr' ? 'कृपया प्रथम लॉगिन करा' : lang === 'hi' ? 'कृपया पहले लॉगिन करें' : 'Please Sign In'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {lang === 'mr' 
              ? 'आपले प्रोफाइल आणि सरकारी योजनांची पात्रता पाहण्यासाठी खात्यात प्रवेश करा.' 
              : lang === 'hi' 
              ? 'अपना प्रोफाइल और सरकारी योजनाओं की पात्रता देखने के लिए खाते में प्रवेश करें।' 
              : 'Sign in to access your profile, saved schemes, and administrative settings.'}
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

  const isAdmin = localStorage.getItem('samarth_admin_user') || user?.role === 'Admin' || user?.email === 'ghansushayal@gmail.com';
  const displayName = user.user_metadata?.full_name || user.full_name || (isAdmin ? 'Chief Nodal Officer & Administrator' : user.email?.split('@')[0]);
  const initial = displayName[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'A';
  const username = displayName;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileNotice({ type: '', text: '' });
    setIsUpdatingProfile(true);

    try {
      await updateUserProfile({
        full_name: editFullName.trim(),
        phone: editPhone.trim(),
        state: editState.trim()
      });
      setProfileNotice({
        type: 'success',
        text: lang === 'mr' ? 'प्रोफाइल माहिती यशस्वीरीत्या अद्ययावत केली.' : lang === 'hi' ? 'प्रोफाइल विवरण सफलतापूर्वक अपडेट किया गया।' : 'Profile details updated successfully.'
      });
    } catch (err) {
      setProfileNotice({
        type: 'error',
        text: err.message || 'Failed to update profile.'
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordNotice({ type: '', text: '' });

    if (!currentPassword.trim()) {
      setPasswordNotice({ type: 'error', text: 'Please enter your current password.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordNotice({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ type: 'error', text: 'New passwords do not match. Please verify.' });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      setPasswordNotice({
        type: 'success',
        text: lang === 'mr' ? 'पासवर्ड यशस्वीरीत्या बदलला आहे.' : lang === 'hi' ? 'पासवर्ड सफलतापूर्वक बदल दिया गया है।' : 'Password updated successfully!'
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordNotice({
        type: 'error',
        text: err.response?.data?.detail || err.message || 'Incorrect current password or update failed.'
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden card-glow-interactive relative transition-colors">
          <div className={`text-white p-6 sm:p-8 relative overflow-hidden border-b border-white/10 ${isAdmin ? 'bg-gradient-to-r from-[#0B3D91] via-[#1E3A8A] to-[#0F172A]' : 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950'}`}>
            <BackgroundBeams />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl font-black shadow-xl border-2 ${isAdmin ? 'bg-amber-400 text-slate-950 border-white' : 'bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 border-amber-300 dark:border-amber-400'}`}>
                  {initial}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{username}</h1>
                    <BadgeCheck className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-xs text-blue-200 dark:text-blue-300 mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {isAdmin ? (
                      <>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Chief Nodal Officer & Administrator</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                          <Landmark className="w-3 h-3" />
                          <span>MoSJE / SCA Ingestion Authority</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-radar"></span>
                          <CheckCircle2 className="w-3 h-3" />
                          {lang === 'mr' ? 'सत्यापित अर्जदार (MoSJE)' : lang === 'hi' ? 'सत्यापित लाभार्थी (MoSJE)' : 'Verified Beneficiary'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          <Landmark className="w-3 h-3" />
                          {lang === 'mr' ? 'ग्रामीण MSME श्रेणी' : lang === 'hi' ? 'ग्रामीण MSME श्रेणी' : 'Rural MSME Category'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="inline-flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Scheme Ingestion Portal</span>
                  </button>
                )}
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
          </div>

          {/* Interactive Profile & Security Tab Switcher */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 px-6 pt-3 flex space-x-6">
            <button
              type="button"
              onClick={() => setSettingsTab('profile')}
              className={`pb-3 text-xs font-extrabold flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
                settingsTab === 'profile'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{lang === 'mr' ? 'वैयक्तिक माहिती बदला' : lang === 'hi' ? 'प्रोफाइल विवरण बदलें' : 'Edit Profile Information'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSettingsTab('password')}
              className={`pb-3 text-xs font-extrabold flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
                settingsTab === 'password'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{lang === 'mr' ? 'पासवर्ड बदला' : lang === 'hi' ? 'पासवर्ड बदलें' : 'Change Password'}</span>
            </button>
          </div>

          {/* Tab 1: Edit Profile Information Form */}
          {settingsTab === 'profile' && (
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 transition-colors">
              <form onSubmit={handleProfileUpdate} className="max-w-2xl space-y-4">
                {profileNotice.text && (
                  <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${profileNotice.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{profileNotice.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'mr' ? 'पूर्ण नाव' : lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'mr' ? 'मोबाईल नंबर' : lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'mr' ? 'राज्य / अधिकार क्षेत्र' : lang === 'hi' ? 'राज्य / अधिकार क्षेत्र' : 'State / Jurisdiction'}
                    </label>
                    <input
                      type="text"
                      value={editState}
                      onChange={(e) => setEditState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      placeholder="State of operation"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'mr' ? 'ईमेल पत्ता (बदलता येत नाही)' : lang === 'hi' ? 'ईमेल पता (अपरिवर्तनीय)' : 'Email Address (Registered)'}
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isUpdatingProfile ? 'Saving Changes...' : (lang === 'mr' ? 'बदल जतन करा' : lang === 'hi' ? 'बदलाव सुरक्षित करें' : 'Save Profile Changes')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: Change Password Form */}
          {settingsTab === 'password' && (
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 transition-colors">
              <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
                {passwordNotice.text && (
                  <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${passwordNotice.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{passwordNotice.text}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'mr' ? 'सध्याचा पासवर्ड' : lang === 'hi' ? 'वर्तमान पासवर्ड' : 'Current Password'}
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    placeholder="Enter existing password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'mr' ? 'नवीन पासवर्ड (किमान ६ अक्षरे)' : lang === 'hi' ? 'नया पासवर्ड (कम से कम 6 अक्षर)' : 'New Password (min 6 characters)'}
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    placeholder="Enter new strong password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'mr' ? 'नवीन पासवर्डची पुष्टी करा' : lang === 'hi' ? 'नए पासवर्ड की पुष्टि करें' : 'Confirm New Password'}
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    placeholder="Re-enter new password"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isUpdatingPassword ? 'Updating Password...' : (lang === 'mr' ? 'पासवर्ड अद्ययावत करा' : lang === 'hi' ? 'पासवर्ड अपडेट करें' : 'Update Password')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Entitlements Bar (For Beneficiaries) */}
          {!isAdmin && (
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 sm:p-5 transition-colors">
              <div className="py-2 sm:py-0 sm:px-4">
                <span className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'किमान स्वतःचे भांडवल' : lang === 'hi' ? 'न्यूनतम मार्जिन पूंजी' : 'Minimum Margin Share'}
                </span>
                <div className="flex items-baseline space-x-1.5 mt-0.5">
                  <span className="text-xl font-black text-blue-700 dark:text-blue-400">10%</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">({lang === 'mr' ? '९०% सरकारी कर्ज' : lang === 'hi' ? '90% सरकारी लोन' : '90% Govt Loan'})</span>
                </div>
              </div>

              <div className="py-2 sm:py-0 sm:px-4">
                <span className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'हप्ता सवलत (मोरेटोरियम)' : lang === 'hi' ? 'मोरेटोरियम अवधि' : 'Moratorium Holiday'}
                </span>
                <div className="flex items-baseline space-x-1.5 mt-0.5">
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">6 – 12</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{lang === 'mr' ? 'महिने' : lang === 'hi' ? 'माह' : 'Months'}</span>
                </div>
              </div>

              <div className="py-2 sm:py-0 sm:px-4">
                <span className="text-[11px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'सवलतीचा व्याजदर' : lang === 'hi' ? 'रियायती ब्याज दर' : 'Concessional Interest'}
                </span>
                <div className="flex items-baseline space-x-1.5 mt-0.5">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">4% – 8%</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{lang === 'mr' ? 'वार्षिक' : lang === 'hi' ? 'वार्षिक' : 'p.a.'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Website Features Access */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'mr' ? 'मुख्य वेबसाइट सुविधा व साधने' : lang === 'hi' ? 'मुख्य वेबसाइट सुविधाएं व टूल्स' : 'Main Portal Tools & Services'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Schemes Directory Card */}
              <SpotlightCard 
                onClick={() => navigate('/schemes')}
                className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-2xs hover:shadow-lg transition-all cursor-pointer group card-glow-interactive"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {lang === 'mr' ? 'सरकारी योजना निर्देशिका' : lang === 'hi' ? 'सरकारी योजनाएं डायरेक्टरी' : 'Schemes Directory'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {lang === 'mr' 
                    ? 'MoSJE, PMEGP, मुद्रा आणि ग्रामीण स्वयंरोजगार योजना शोधा.' 
                    : lang === 'hi' 
                    ? 'MoSJE, PMEGP, मुद्रा और ग्रामीण योजनाओं की पूर्ण सूची देखें।' 
                    : 'Explore all verified concessional credit schemes from MoSJE and MyScheme.'}
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'mr' ? 'योजना पहा' : lang === 'hi' ? 'योजनाएं देखें' : 'View Schemes'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </SpotlightCard>

              {/* Loan & EMI Calculator Card */}
              <SpotlightCard 
                onClick={() => navigate('/calculator')}
                className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-2xs hover:shadow-lg transition-all cursor-pointer group card-glow-interactive"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {lang === 'mr' ? 'कर्ज व मोरेटोरियम गणक' : lang === 'hi' ? 'स्मार्ट लोन व EMI कैलकुलेटर' : 'Smart Loan & EMI Calculator'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {lang === 'mr' 
                    ? '१०% भांडवल आणि ६ महिन्यांच्या हप्ता सवलतीसह अचूक EMI गणना करा.' 
                    : lang === 'hi' 
                    ? '10% मार्जिन पूंजी और 6 माह की किश्त छूट के साथ सटीक गणना करें।' 
                    : 'Calculate loan breakdown, 10% margin, and EMI with moratorium relief.'}
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'mr' ? 'कॅल्क्युलेटर उघडा' : lang === 'hi' ? 'कैलकुलेटर खोलें' : 'Open Calculator'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </SpotlightCard>

              {/* AI Feasibility & Bank DPR Card */}
              <SpotlightCard 
                onClick={() => navigate('/advisory')}
                className="sm:col-span-2 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-blue-800/80 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden card-glow-interactive"
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
                    <p className="text-xs text-blue-200 dark:text-blue-300 max-w-xl leading-relaxed">
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

            {/* LIVE REAL-TIME CLOUD INQUIRIES FEED */}
            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{lang === 'mr' ? 'थेट क्लाउड चौकशी व अहवाल इतिहास (Real-Time)' : lang === 'hi' ? 'लाइव क्लाउड पूछताछ व डीपीआर इतिहास (Real-Time)' : 'Live Cloud Inquiries & Feasibility History (Real-Time)'}</span>
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {lang === 'mr' ? 'थेट जोडणी सुरू' : lang === 'hi' ? 'लाइव सिंक सक्रिय' : 'Real-Time Active'}
                </span>
              </div>

              {loadingInquiries ? (
                <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {lang === 'mr' ? 'क्लाउडवरून डेटा लोड होत आहे...' : lang === 'hi' ? 'क्लाउड से डेटा लोड हो रहा है...' : 'Connecting to Supabase live stream...'}
                </div>
              ) : inquiries.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {lang === 'mr' ? 'अद्याप कोणतीही चौकशी नोंदवली गेली नाही.' : lang === 'hi' ? 'अभी तक कोई पूछताछ दर्ज नहीं हुई है।' : 'No inquiries recorded yet. Generate your first DPR to see it live!'}
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto pr-1">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50/80 dark:hover:bg-slate-800/60 px-2 rounded-lg transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{inq.business_type}</span>
                          {inq.business_title && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px] sm:max-w-[200px]">({inq.business_title})</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {inq.state || 'All India'} {inq.district ? `• ${inq.district}` : ''} • {new Date(inq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-blue-700 dark:text-blue-400 block">₹{Number(inq.investment_amount || 0).toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Margin: ₹{Number(inq.margin_capital || 0).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Account & Verification Sidebar */}
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'mr' ? 'खाते व सुरक्षा माहिती' : lang === 'hi' ? 'खाता व सुरक्षा विवरण' : 'Account & Security'}</span>
            </h2>

            <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
              
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'लाभार्थी आयडी' : lang === 'hi' ? 'लाभार्थी आईडी' : 'Beneficiary ID'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {user.id ? `${user.id.substring(0, 16)}...` : 'BENEFICIARY-101'}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'डेटा संकालन स्थिती' : lang === 'hi' ? 'डेटा सिंक स्थिति' : 'Database Status'}
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{lang === 'mr' ? 'सुपाबेस क्लाउडशी जोडलेले' : lang === 'hi' ? 'सुपाबेस क्लाउड से कनेक्टेड' : 'Connected to Supabase'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'शासकीय पडताळणी' : lang === 'hi' ? 'सरकारी सत्यापन' : 'Government Verification'}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {lang === 'mr'
                    ? 'MoSJE आणि MyScheme नियमांनुसार १०% मार्जिन सवलतीसाठी पात्र.'
                    : lang === 'hi'
                    ? 'MoSJE एवं MyScheme नियमों के अनुसार 10% मार्जिन छूट हेतु सत्यापित।'
                    : 'Verified under MoSJE guidelines for 10% beneficiary margin eligibility.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold py-2.5 rounded-xl text-xs transition-colors border border-rose-200 dark:border-rose-800 cursor-pointer"
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
