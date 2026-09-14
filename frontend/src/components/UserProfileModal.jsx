import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Award, 
  LogOut, 
  X, 
  Landmark, 
  FileText,
  BadgeCheck
} from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Beneficiary';
  const initial = displayName[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';
  const username = displayName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 via-[#0B3D91] to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#0B3D91] flex items-center justify-center text-2xl font-black shadow-lg border-2 border-amber-300">
              {initial}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-white">{username}</h3>
                <BadgeCheck className="w-5 h-5 text-amber-300" />
              </div>
              <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mt-1">
                {lang === 'mr' ? 'सत्यापित अर्जदार' : lang === 'hi' ? 'सत्यापित लाभार्थी' : 'Verified Beneficiary'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Email Info */}
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {lang === 'mr' ? 'नोंदणीकृत ईमेल' : lang === 'hi' ? 'पंजीकृत ईमेल' : 'Registered Email'}
                </span>
                <span className="text-xs font-bold text-slate-800">{user.email}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>

          {/* Ministry / Scheme Eligibility Badges */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'mr' ? 'पात्रता स्थिती (MoSJE & MSME)' : lang === 'hi' ? 'पात्रता स्थिति (MoSJE & MSME)' : 'Credit Advisory Entitlements'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col justify-between">
                <span className="text-[10px] text-blue-600 font-bold">10% Margin Share</span>
                <span className="font-extrabold text-slate-900 mt-1">
                  {lang === 'mr' ? '१०% भांडवल पात्र' : lang === 'hi' ? '10% मार्जिन योग्य' : 'Eligible'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 flex flex-col justify-between">
                <span className="text-[10px] text-amber-700 font-bold">Moratorium Period</span>
                <span className="font-extrabold text-slate-900 mt-1">
                  {lang === 'mr' ? '६-१२ महिने हप्ता सवलत' : lang === 'hi' ? '6-12 माह मोरेटोरियम' : '6–12 Months'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center space-x-2 text-xs text-slate-600 p-2 rounded-lg bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'mr' ? 'सर्व अहवाल सुपाबेस क्लाउडवर सुरक्षित' : lang === 'hi' ? 'सभी रिपोर्ट्स सुपाबेस क्लाउड पर सुरक्षित' : 'All reports synced & saved securely'}</span>
            </div>
          </div>

          {/* Sign Out Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 rounded-xl text-xs transition-colors border border-rose-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'mr' ? 'खाते लॉगआउट करा' : lang === 'hi' ? 'खाता लॉगआउट करें' : 'Sign Out of Account'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfileModal;
