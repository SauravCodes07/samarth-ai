import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  HeartHandshake, 
  CheckCircle2, 
  Info,
  Scale
} from 'lucide-react';

const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-auto">
      
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {lang === 'hi' ? '100% सटीक गणितीय ढांचा' : '100% Deterministic Financials'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'hi' 
                  ? 'सरकारी दिशानिर्देशों के अनुरूप 10% मार्जिन व 90% ऋण संरचना' 
                  : 'Calculated strictly adhering to MoSJE & NSFDC lending guidelines'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {lang === 'hi' ? 'दलालों से शून्य निर्भरता' : 'Zero Middleman Dependency'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'hi' 
                  ? 'सीधे आधिकारिक सरकारी पोर्टलों और बैंक शाखाओं से संपर्क' 
                  : 'Direct, transparent scheme information with verified source links'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {lang === 'hi' ? 'सरल व समावेशी भाषा' : 'Inclusive Multi-Lingual Advisory'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'hi' 
                  ? 'बिना किसी जटिल बैंकिंग शब्दों के स्पष्ट रिपोर्ट' 
                  : 'Plain-language summaries in Hindi & English tailored for rural founders'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight">Samarth AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'hi'
                ? 'भारत के सूक्ष्म एवं ग्रामीण उद्यमियों के लिए संस्थागत वित्तीय सलाहकार व स्मार्ट स्कीम मैपिंग मंच।'
                : 'National digital advisory infrastructure bridging the financial literacy gap for rural and micro-enterprises across Bharat.'}
            </p>
            <div className="pt-2 flex items-center space-x-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Supabase Production Cloud Live</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              {lang === 'hi' ? 'वित्तीय टूल्स' : 'Financial Engines'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/calculator" className="hover:text-white transition-colors">
                  {lang === 'hi' ? '10% मार्जिन लोन कैलकुलेटर' : 'Smart Loan & EMI Calculator'}
                </Link>
              </li>
              <li>
                <Link to="/advisory" className="hover:text-white transition-colors">
                  {lang === 'hi' ? 'हाइपर-लोकल व्यवहार्यता रिपोर्ट' : 'Hyper-Local Feasibility Engine'}
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-white transition-colors">
                  {lang === 'hi' ? 'सरकारी स्कीम डायरेक्टरी' : 'Government Schemes Directory'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Schemes */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              {lang === 'hi' ? 'प्रमुख योजनाएं' : 'Featured Schemes'}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Micro Finance Scheme (MFS) - NSFDC</li>
              <li>Mahila Samriddhi Yojana (4% p.a.)</li>
              <li>Laghu Vyavasay Yojana (LVY)</li>
              <li>Term Loan Scheme (TLS Tier 1 & 2)</li>
              <li>Pradhan Mantri MUDRA Yojana (PMMY)</li>
              <li>Prime Minister Employment Gen. (PMEGP)</li>
            </ul>
          </div>

          {/* Regulatory & Disclaimer */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              {lang === 'hi' ? 'सत्यापन व दिशानिर्देश' : 'Verification & Sources'}
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              {lang === 'hi'
                ? 'यह प्रणाली सामाजिक न्याय एवं अधिकारिता मंत्रालय (MoSJE) व NSFDC के रियायती वित्तीय मानदंडों पर आधारित है।'
                : 'Grounded on official concessional credit guidelines from MoSJE, NSFDC, MSME and National SC/ST Hub.'}
            </p>
            <a 
              href="https://nsfdc.nic.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs"
            >
              <span>NSFDC Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Samarth AI Platform. All rights reserved.</p>
          <p className="text-slate-500">
            Enterprise GovTech Suite • Smart India Hackathon 2026 (PS ID: 26091)
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
