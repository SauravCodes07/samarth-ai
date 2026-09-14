import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  IndianRupee, 
  Percent, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw,
  Layers,
  FileSpreadsheet,
  Coins,
  BadgeCheck
} from 'lucide-react';

const CalculatorPage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Mode: By Available Margin (10%) OR By Total Cost
  const [calcMode, setCalcMode] = useState('margin'); // 'margin' or 'cost'
  const [marginInput, setMarginInput] = useState(100000);
  const [totalCost, setTotalCost] = useState(1000000);
  const [marginPercent, setMarginPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(8.0);
  const [tenureYears, setTenureYears] = useState(7);
  const [moratoriumMonths, setMoratoriumMonths] = useState(6);
  const [isWomenApplicant, setIsWomenApplicant] = useState(false);
  const [showAmortization, setShowAmortization] = useState(true);

  // Sync when margin changes
  const handleMarginChange = (val) => {
    const m = Number(val) || 0;
    setMarginInput(m);
    const cost = m * 10;
    setTotalCost(cost);
    // Auto-select SIH scheme parameters
    if (cost <= 140000) {
      setInterestRate(6.5);
      setTenureYears(3);
      setMoratoriumMonths(3);
    } else {
      setInterestRate(8.0);
      setTenureYears(7);
      setMoratoriumMonths(6);
    }
  };

  // Sync when total cost changes
  const handleTotalCostChange = (val) => {
    const c = Number(val) || 0;
    setTotalCost(c);
    setMarginInput(Math.round(c * (marginPercent / 100)));
    if (c <= 140000) {
      setInterestRate(6.5);
      setTenureYears(3);
      setMoratoriumMonths(3);
    } else {
      setInterestRate(8.0);
      setTenureYears(7);
      setMoratoriumMonths(6);
    }
  };

  // SIH 2026 Presets
  const presets = [
    { label: "Micro Finance Scheme (<= 1.40L)", cost: 140000, margin: 14000, rate: 6.5, years: 3, mor: 3 },
    { label: "Term Loan - 5 Lakh Project", cost: 500000, margin: 50000, rate: 8.0, years: 7, mor: 6 },
    { label: "Term Loan - 10 Lakh (SIH Benchmark)", cost: 1000000, margin: 100000, rate: 8.0, years: 7, mor: 6 },
    { label: "Term Loan - 25 Lakh Enterprise", cost: 2500000, margin: 250000, rate: 8.0, years: 7, mor: 6 },
    { label: "Term Loan - Maximum 50 Lakh", cost: 5000000, margin: 500000, rate: 8.0, years: 7, mor: 6 }
  ];

  const applyPreset = (p) => {
    setTotalCost(p.cost);
    setMarginInput(p.margin);
    setMarginPercent(10);
    setInterestRate(p.rate);
    setTenureYears(p.years);
    setMoratoriumMonths(p.mor);
  };

  // Calculations
  const effectiveRate = isWomenApplicant ? Math.max(1.0, interestRate - 1.0) : interestRate;
  const marginMoney = calcMode === 'margin' ? marginInput : Math.round(totalCost * (marginPercent / 100.0));
  
  // Max loan caps per scheme
  const maxCap = totalCost <= 140000 ? 125000 : 4500000;
  const loanAmount = Math.min(totalCost - marginMoney, maxCap);

  // Reducing balance EMI
  const calculateEMI = (principal, annualRate, years) => {
    if (principal <= 0 || years <= 0) return 0;
    const monthlyRate = (annualRate / 100.0) / 12.0;
    const totalMonths = years * 12;
    if (monthlyRate === 0) return Math.round(principal / totalMonths);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI(loanAmount, effectiveRate, tenureYears);
  const quarterlyInstallment = Math.round(monthlyEMI * 3);
  const totalRepayment = monthlyEMI * (tenureYears * 12);
  const totalInterest = Math.max(0, totalRepayment - loanAmount);
  const workingCapital = Math.round(totalCost * 0.18);

  const schemeName = totalCost <= 140000 ? "Micro Finance Scheme" : "Term Loan Scheme";

  // Generate Quarter-by-Quarter Amortization Schedule with Moratorium
  const generateQuarterlyAmortization = () => {
    let balance = loanAmount;
    const schedule = [];
    const quarterlyRate = (effectiveRate / 100.0) / 4.0;
    const totalQuarters = tenureYears * 4;
    const morQuarters = Math.max(0, Math.floor(moratoriumMonths / 3));
    const activeQuarters = Math.max(1, totalQuarters - morQuarters);

    let quarterlyPayment = quarterlyInstallment;
    if (quarterlyRate > 0) {
      const num = loanAmount * quarterlyRate * Math.pow(1 + quarterlyRate, activeQuarters);
      const denom = Math.pow(1 + quarterlyRate, activeQuarters) - 1;
      quarterlyPayment = denom !== 0 ? Math.round(num / denom) : Math.round(loanAmount / activeQuarters);
    }

    const displayQuarters = Math.min(12, totalQuarters);

    for (let q = 1; q <= displayQuarters; q++) {
      const mStart = (q - 1) * 3 + 1;
      const mEnd = q * 3;

      if (q <= morQuarters) {
        const intDue = Math.round(balance * quarterlyRate);
        schedule.push({
          quarter: q,
          label: `Month ${mStart}-${mEnd} (Moratorium)`,
          isMor: true,
          installment: 0,
          principalPaid: 0,
          interestPaid: intDue,
          closingBalance: balance
        });
      } else {
        const intPaid = Math.round(balance * quarterlyRate);
        const princPaid = Math.min(balance, Math.round(quarterlyPayment - intPaid));
        balance = Math.max(0, balance - princPaid);
        schedule.push({
          quarter: q,
          label: `Month ${mStart}-${mEnd}`,
          isMor: false,
          installment: princPaid + intPaid,
          principalPaid: princPaid,
          interestPaid: intPaid,
          closingBalance: balance
        });
      }
    }
    return schedule;
  };

  const amortizationSchedule = generateQuarterlyAmortization();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 border border-blue-200/80 px-3 py-1 rounded-full text-xs font-bold">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'hi' ? 'स्मार्ट वित्तीय कैलकुलेटर एवं स्कीम राउटर' : 'Institutional Loan Structuring Engine'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? '10% मार्जिन मनी एवं 90% लोन कैलकुलेटर' : '10% Margin Money & 90% Concessional Loan Calculator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {lang === 'hi'
              ? 'अपनी उपलब्ध 10% पूंजी दर्ज करें; सिस्टम स्वचालित रूप से अधिकतम प्रोजेक्ट लागत (पूंजी/10%), 90% लोन पात्रता और मोरेटोरियम सहित त्रैमासिक किश्तों की गणना करेगा।'
              : 'Enter your available margin money; the engine calculates total feasible project cost, 90% loan eligibility, scheme routing, and quarterly repayment obligations with moratorium.'}
          </p>
        </div>

        <button
          onClick={() => {
            setMarginInput(100000);
            setTotalCost(1000000);
            setInterestRate(8.0);
            setTenureYears(7);
            setMoratoriumMonths(6);
            setIsWomenApplicant(false);
          }}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex-shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>{lang === 'hi' ? 'डिफ़ॉल्ट ₹10L पर रीसेट करें' : 'Reset to Benchmark (₹10L)'}</span>
        </button>
      </div>

      {/* Preset Chips */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          {lang === 'hi' ? 'सरकारी स्कीम प्रीसेट:' : 'Official Scheme Presets:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                totalCost === p.cost
                  ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-sm'
                  : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0B3D91] border-slate-200'
              }`}
            >
              <span>{p.label}</span>
              <span className="opacity-80 font-normal">({(p.cost / 100000).toFixed(1)}L @ {p.rate}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#FF9933]" />
              <span>{lang === 'hi' ? 'मार्जिन व प्रोजेक्ट लागत पैरामीटर' : 'Capital & Scheme Parameters'}</span>
            </h2>

            {/* Mode Toggle */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setCalcMode('margin')}
                className={`px-2.5 py-1 rounded-lg transition-all ${calcMode === 'margin' ? 'bg-white text-[#0B3D91] shadow-2xs' : 'text-slate-500'}`}
              >
                10% Margin
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('cost')}
                className={`px-2.5 py-1 rounded-lg transition-all ${calcMode === 'cost' ? 'bg-white text-[#0B3D91] shadow-2xs' : 'text-slate-500'}`}
              >
                Project Cost
              </button>
            </div>
          </div>

          {/* Slider 1: Available Margin Capital (10%) */}
          <div className="space-y-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="flex justify-between items-center">
              <label className="text-xs sm:text-sm font-bold text-amber-950">
                {lang === 'hi' ? 'उपलब्ध मार्जिन पूंजी (Available Margin Capital):' : 'Available Margin Capital (10%):'}
              </label>
              <div className="bg-white border border-amber-300 px-3 py-1 rounded-xl shadow-2xs">
                <span className="text-base font-black text-amber-950">
                  ₹{marginInput.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="5000"
              max="500000"
              step="5000"
              value={marginInput}
              onChange={(e) => handleMarginChange(e.target.value)}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF9933]"
            />
            <div className="flex justify-between text-[11px] text-amber-800 font-medium">
              <span>₹10,000</span>
              <span>₹1,00,000 (SIH Example)</span>
              <span>₹2.5 Lakh</span>
              <span>₹5 Lakh (Max)</span>
            </div>
          </div>

          {/* Slider 2: Feasible Total Project Cost */}
          <div className="space-y-2 p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
            <div className="flex justify-between items-center">
              <label className="text-xs sm:text-sm font-bold text-blue-950">
                {lang === 'hi' ? 'व्यवहार्य कुल प्रोजेक्ट लागत (Total Project Cost):' : 'Feasible Project Cost (Margin / 10%):'}
              </label>
              <div className="bg-white border border-blue-300 px-3 py-1 rounded-xl shadow-2xs">
                <span className="text-base font-black text-[#0B3D91]">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 ml-1">
                  ({(totalCost / 100000).toFixed(2)} Lakh)
                </span>
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="25000"
              value={totalCost}
              onChange={(e) => handleTotalCostChange(e.target.value)}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D91]"
            />
            <div className="flex justify-between text-[11px] text-blue-800 font-medium">
              <span>₹1.40L (Micro Tier)</span>
              <span>₹10.0L (Term Tier)</span>
              <span>₹25.0L</span>
              <span>₹50.0L (Max Cap)</span>
            </div>
          </div>

          {/* Scheme Auto-Routing Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-[#FF9933] block">
                AUTOMATIC SCHEME ROUTER
              </span>
              <div className="text-sm font-black text-white flex items-center space-x-1.5 mt-0.5">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                <span>{schemeName}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {totalCost <= 140000 
                  ? 'Logic A: 6.5% interest, 3-year tenure, 3-month moratorium' 
                  : 'Logic B: 8.0% interest, 7-year tenure, 6-month moratorium'}
              </p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${totalCost <= 140000 ? 'bg-emerald-500 text-white' : 'bg-[#FF9933] text-black'}`}>
              {effectiveRate}% p.a.
            </span>
          </div>

          {/* Women Rebate Toggle */}
          <div className="p-4 bg-pink-50 border border-pink-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="calcWomen"
                checked={isWomenApplicant}
                onChange={(e) => setIsWomenApplicant(e.target.checked)}
                className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
              />
              <label htmlFor="calcWomen" className="text-xs sm:text-sm font-bold text-pink-950 cursor-pointer">
                {lang === 'hi' ? 'महिला उद्यमी / SHG (1% अतिरिक्त ब्याज छूट लागू करें)' : 'Women Beneficiary / SHG (Apply 1% Special Rebate)'}
              </label>
            </div>
            <span className="text-xs font-bold text-pink-700 bg-white px-2.5 py-0.5 rounded-lg border border-pink-200">
              -1.0% Rate
            </span>
          </div>

        </div>

        {/* Right Column: Live Calculation Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Card */}
          <div className="bg-gradient-to-br from-[#0B3D91] via-[#072a66] to-[#041a3d] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-blue-500/20 space-y-4">
            <div className="flex items-center justify-between text-blue-200 text-xs font-bold uppercase tracking-wider">
              <span>{lang === 'hi' ? 'अनुमानित मासिक किश्त (EMI)' : 'Monthly Equated Installment'}</span>
              <span className="bg-[#138808] text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                100% MATH
              </span>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline space-x-1">
                <span>₹{monthlyEMI.toLocaleString('en-IN')}</span>
                <span className="text-xs text-blue-200 font-normal">/{lang === 'hi' ? 'माह' : 'mo'}</span>
              </div>
              <p className="text-xs text-blue-200 mt-1 font-medium">
                {lang === 'hi'
                  ? `त्रैमासिक भुगतान: ₹${quarterlyInstallment.toLocaleString('en-IN')} (${moratoriumMonths} माह की छूट के बाद शुरू)`
                  : `Quarterly payment: ₹${quarterlyInstallment.toLocaleString('en-IN')} (after ${moratoriumMonths}m moratorium)`}
              </p>
            </div>

            {/* Visual Ratio Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-blue-200 font-semibold">
                <span>10% Margin: ₹{marginMoney.toLocaleString('en-IN')}</span>
                <span>90% Loan: ₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full h-3.5 bg-white/20 rounded-full overflow-hidden flex">
                <div style={{ width: '10%' }} className="bg-[#FF9933] h-full" title="Margin"></div>
                <div style={{ width: '90%' }} className="bg-emerald-400 h-full" title="Concessional Loan"></div>
              </div>
            </div>

            {/* 3 Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span className="text-[11px] text-blue-200 block font-medium">
                  {lang === 'hi' ? 'स्वीकृत 90% लोन' : '90% Loan Disbursed'}
                </span>
                <span className="text-base font-black text-white">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span className="text-[11px] text-blue-200 block font-medium">
                  {lang === 'hi' ? 'कार्यशील पूंजी (18%)' : 'Working Capital (18%)'}
                </span>
                <span className="text-base font-black text-amber-300">
                  ₹{workingCapital.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/advisory', {
                  state: {
                    prefilledScheme: {
                      scheme_name: schemeName,
                      max_cost: totalCost
                    }
                  }
                });
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#FF9933] to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg mt-4"
            >
              <span>{lang === 'hi' ? 'पूर्ण व्यवहार्यता रिपोर्ट तैयार करें' : 'Generate Full Feasibility Report'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Quarterly Amortization Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#0B3D91]">
            <FileSpreadsheet className="w-5 h-5 text-[#FF9933]" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              {lang === 'hi' ? `त्रैमासिक पुनर्भुगतान विवरण (${moratoriumMonths} माह मोरेटोरियम अवधि सहित)` : `Quarterly Repayment Schedule (${moratoriumMonths}-Month Moratorium Period Factored)`}
            </h3>
          </div>
          <span className="text-xs bg-[#0B3D91] text-white px-3 py-1 rounded-full font-bold">
            {tenureYears} Years ({tenureYears * 4} Quarters)
          </span>
        </div>

        <div className="p-5 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B3D91] text-white">
                <th className="p-3 font-bold rounded-l">{lang === 'hi' ? 'तिमाही (Quarter)' : 'Quarter'}</th>
                <th className="p-3 font-bold">{lang === 'hi' ? 'अवधि' : 'Months'}</th>
                <th className="p-3 font-bold">{lang === 'hi' ? 'किश्त राशि' : 'Installment Paid'}</th>
                <th className="p-3 font-bold">{lang === 'hi' ? 'मूलधन' : 'Principal'}</th>
                <th className="p-3 font-bold">{lang === 'hi' ? 'ब्याज' : 'Interest'}</th>
                <th className="p-3 font-bold rounded-r">{lang === 'hi' ? 'बकाया लोन' : 'Closing Balance'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {amortizationSchedule.map((row) => (
                <tr key={row.quarter} className={row.isMor ? "bg-amber-50/70 font-semibold" : "hover:bg-slate-50"}>
                  <td className="p-3 font-bold text-[#0B3D91]">
                    Q{row.quarter} {row.isMor && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded ml-1">Moratorium</span>}
                  </td>
                  <td className="p-3 text-slate-600">{row.label}</td>
                  <td className="p-3 font-extrabold text-slate-900">₹{row.installment.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-emerald-700">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-amber-700">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-800 font-black">₹{row.closingBalance.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CalculatorPage;
