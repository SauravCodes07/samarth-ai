import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Database, 
  Cpu, 
  Edit3, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  LogOut, 
  Eye, 
  Layers, 
  Lock,
  Building2,
  Percent,
  IndianRupee,
  RefreshCw,
  User
} from 'lucide-react';
import { 
  adminLogin, 
  ingestCircularText, 
  ingestCircularPdf, 
  fetchPendingSchemes, 
  fetchAllAdminSchemes, 
  verifyAndPublishScheme, 
  updateAdminScheme, 
  deleteAdminScheme 
} from '../services/api';

const AdminPage = () => {
  const navigate = useNavigate();
  // Auth state
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('samarth_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('ingest'); // 'ingest', 'pending', 'registry'
  const [ingestMode, setIngestMode] = useState('text'); // 'text', 'pdf'
  const [circularText, setCircularText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [sourceUrl, setSourceUrl] = useState('https://myscheme.gov.in');
  const [targetState, setTargetState] = useState('Central / All India');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestResult, setIngestResult] = useState(null);

  // Queue state
  const [pendingList, setPendingList] = useState([]);
  const [allSchemes, setAllSchemes] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Editing modal/inline
  const [editingScheme, setEditingScheme] = useState(null);

  useEffect(() => {
    if (adminUser) {
      loadQueueData();
    }
  }, [adminUser]);

  const loadQueueData = async () => {
    setLoadingList(true);
    try {
      const pending = await fetchPendingSchemes();
      const all = await fetchAllAdminSchemes();
      setPendingList(pending);
      setAllSchemes(all);
    } catch (e) {
      console.warn('Queue loading notice:', e);
    } finally {
      setLoadingList(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await adminLogin(email, password);
      if (res.admin) {
        setAdminUser(res.admin);
      }
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Invalid administrative credentials. Use master key Samarth@2026.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('samarth_admin_token');
    localStorage.removeItem('samarth_admin_user');
    setAdminUser(null);
  };

  const handleQuickDemoLogin = async () => {
    setEmail('ghansushayal@gmail.com');
    setPassword('Samarth@2026');
    setLoginLoading(true);
    try {
      const res = await adminLogin('ghansushayal@gmail.com', 'Samarth@2026');
      if (res.admin) {
        setAdminUser(res.admin);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleIngestSubmit = async (e) => {
    e.preventDefault();
    setIsIngesting(true);
    setIngestResult(null);
    setActionNotice('');

    try {
      let res;
      if (ingestMode === 'pdf') {
        if (!selectedFile) {
          alert('Please select a PDF file.');
          setIsIngesting(false);
          return;
        }
        res = await ingestCircularPdf(selectedFile, sourceUrl, targetState);
      } else {
        if (!circularText.trim()) {
          alert('Please paste circular or gazette text.');
          setIsIngesting(false);
          return;
        }
        res = await ingestCircularText(circularText, sourceUrl, targetState);
      }

      if (res.success) {
        setIngestResult(res);
        setActionNotice('Scheme successfully parsed by Hugging Face NLP and added to the Verification Queue!');
        loadQueueData();
      }
    } catch (err) {
      alert('Ingestion error: ' + (err.message || 'Check server connection.'));
    } finally {
      setIsIngesting(false);
    }
  };

  const handleVerifyPublish = async (schemeId) => {
    setActionNotice('Publishing scheme to live citizen advisory...');
    try {
      const res = await verifyAndPublishScheme(schemeId);
      if (res.success) {
        setActionNotice(`Scheme verified and published successfully! It is now LIVE on citizen advisory.`);
        loadQueueData();
      }
    } catch (err) {
      alert('Verification error');
    }
  };

  const handleDelete = async (schemeId) => {
    if (!window.confirm('Are you sure you want to deactivate this scheme?')) return;
    try {
      await deleteAdminScheme(schemeId);
      loadQueueData();
    } catch (e) {
      console.warn(e);
    }
  };

  // 1. Unauthenticated Login Screen
  if (!adminUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0B3D91] dark:text-blue-400 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold block">
              Government of India • Ministry of Social Justice
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Nodal Officer Admin Portal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hugging Face Scheme Gazette Ingestion & PostgreSQL Verification Pipeline
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Email (Nodal ID)
              </label>
              <input
                type="email"
                required
                placeholder="ghansushayal@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Security Key / Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#0B3D91] hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-70"
            >
              {loginLoading ? 'Authenticating Nodal Credentials...' : 'Authenticate & Access Gateway'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>1-Click Evaluator Nodal Officer Login</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. Authenticated Nodal Admin Portal
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#0B3D91] via-[#1E3A8A] to-[#0F172A] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-xs text-amber-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Nodal Officer Governance Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Scheme Ingestion & Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Authenticated as: <strong className="text-white">{adminUser.email}</strong> • {adminUser.role}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-3.5 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer text-white shadow-xs"
            title="Open Admin Profile & Settings"
          >
            <User className="w-3.5 h-3.5" />
            <span>My Profile</span>
          </button>
          <button
            onClick={loadQueueData}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Portal</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Pending Review</span>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {pendingList.length}
          </div>
          <p className="text-[11px] text-slate-400">Awaiting Nodal verification</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Live Schemes</span>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {allSchemes.filter(s => s.is_active).length}
          </div>
          <p className="text-[11px] text-slate-400">Published to citizen advisory</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span>AI Pipeline</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
            Hugging Face NLP
          </div>
          <p className="text-[11px] text-slate-400">Mistral / LayoutLM Parser</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold">
            <Database className="w-4 h-4 text-blue-500" />
            <span>Database Engine</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
            PostgreSQL (Cloud)
          </div>
          <p className="text-[11px] text-slate-400">SQLAlchemy ORM Pooled</p>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice('')} className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('ingest')}
          className={`pb-3 px-4 text-sm font-extrabold cursor-pointer border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'ingest'
              ? 'border-[#0B3D91] text-[#0B3D91] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>1. Hugging Face Ingestion Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 px-4 text-sm font-extrabold cursor-pointer border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'pending'
              ? 'border-[#0B3D91] text-[#0B3D91] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          <span>2. Verification Queue ({pendingList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registry')}
          className={`pb-3 px-4 text-sm font-extrabold cursor-pointer border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'registry'
              ? 'border-[#0B3D91] text-[#0B3D91] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-500" />
          <span>3. Live Schemes Registry ({allSchemes.length})</span>
        </button>
      </div>

      {/* TAB 1: INGESTION STUDIO */}
      {activeTab === 'ingest' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Gazette / Circular Ingestion Studio</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Upload an official Government Gazette PDF or paste policy circular text. Hugging Face extracts financial thresholds and eligibility parameters automatically.
              </p>
            </div>

            {/* Ingestion Mode Toggle */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setIngestMode('text')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  ingestMode === 'text' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-700 dark:text-white' : 'text-slate-500'
                }`}
              >
                Paste Circular / Gazette Text
              </button>
              <button
                type="button"
                onClick={() => setIngestMode('pdf')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  ingestMode === 'pdf' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-700 dark:text-white' : 'text-slate-500'
                }`}
              >
                Upload Official PDF (.pdf)
              </button>
            </div>

            <form onSubmit={handleIngestSubmit} className="space-y-4">
              {ingestMode === 'text' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Government Policy / Circular Text
                  </label>
                  <textarea
                    rows={7}
                    required
                    placeholder="e.g. Government of India Notification: Pradhan Mantri Vishwakarma Scheme provides collateral-free concessional loans up to Rs. 3,00,000 for traditional artisans. Margin money is 5% with subsidized interest rate of 5.0% and 1.0% additional rebate for women..."
                    value={circularText}
                    onChange={(e) => setCircularText(e.target.value)}
                    className="w-full p-3.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/40">
                  <UploadCloud className="w-10 h-10 text-blue-600 mx-auto" />
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Select Government Circular PDF
                    </label>
                    <span className="text-[11px] text-slate-400">PDFs up to 10MB</span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="text-xs text-slate-600 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-xs text-emerald-600 font-bold">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Official Portal Source URL
                  </label>
                  <input
                    type="text"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://myscheme.gov.in"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Applicable Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={targetState}
                    onChange={(e) => setTargetState(e.target.value)}
                    placeholder="Central / All India"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isIngesting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center space-x-2"
              >
                {isIngesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Parsing Document with Hugging Face NLP Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Execute Hugging Face Scheme Extraction</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Extraction Preview */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Extracted Schema Preview</span>
            </h3>

            {ingestResult?.scheme ? (
              <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[11px] font-bold">
                    Verification Status: {ingestResult.scheme.verification_status}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Pipeline: {ingestResult.pipeline || 'Hugging Face NLP'}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    {ingestResult.scheme.scheme_name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {ingestResult.scheme.ministry} • {ingestResult.scheme.category}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 font-bold block">Max Loan</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      ₹{Number(ingestResult.scheme.max_cost).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 font-bold block">Margin Money</span>
                    <span className="text-xs font-black text-blue-600">
                      {ingestResult.scheme.margin_percent}%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 font-bold block">Interest ROI</span>
                    <span className="text-xs font-black text-emerald-600">
                      {ingestResult.scheme.interest_rate}%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 font-bold block">Moratorium</span>
                    <span className="text-xs font-black text-purple-600">
                      {ingestResult.scheme.moratorium_months} Months
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  <strong>Eligibility: </strong> {ingestResult.scheme.eligibility}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleVerifyPublish(ingestResult.scheme.id)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Publish to Live Citizen Advisory Now</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Ready to ingest. Upload a circular or paste text on the left to trigger the Hugging Face NLP pipeline.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PENDING VERIFICATION QUEUE */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Nodal Officer Verification Queue ({pendingList.length})
            </h3>
            <span className="text-xs text-slate-500">
              Schemes extracted by AI must be officially verified before appearing on citizen apps.
            </span>
          </div>

          {pendingList.length === 0 ? (
            <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">All Schemes Verified!</h4>
              <p className="text-xs text-slate-500">No pending schemes in the verification queue.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingList.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 rounded-md border border-amber-200 mr-2">
                        Pending Verification
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {scheme.ministry || 'Ministry of Social Justice'}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                        {scheme.scheme_name}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVerifyPublish(scheme.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify & Publish Live</span>
                      </button>
                      <button
                        onClick={() => handleDelete(scheme.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl cursor-pointer transition-all"
                        title="Reject / Deactivate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Financial Quick Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Max Cost</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{Number(scheme.max_cost).toLocaleString()}</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Margin %</span>
                      <span className="font-bold text-blue-600">{scheme.margin_percent}%</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Interest ROI</span>
                      <span className="font-bold text-emerald-600">{scheme.interest_rate}%</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Women Rebate</span>
                      <span className="font-bold text-purple-600">{scheme.interest_rebate_women}%</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Moratorium</span>
                      <span className="font-bold text-amber-600">{scheme.moratorium_months} Months</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LIVE REGISTRY */}
      {activeTab === 'registry' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Official Schemes Registry ({allSchemes.length})
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              ✓ Connected to Live PostgreSQL Database
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allSchemes.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      s.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {s.is_active ? 'LIVE in Citizen Advisory' : 'Archived'}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">
                      {s.scheme_name}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">#{s.id}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {s.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">
                    Max: <strong>₹{Number(s.max_cost).toLocaleString()}</strong> • ROI: <strong>{s.interest_rate}%</strong>
                  </span>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                    {s.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
