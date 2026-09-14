import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  ArrowRight,
  Calculator,
  BookOpen,
  Volume2,
  VolumeX,
  RotateCcw,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import MicButton from './MicButton';

// Comprehensive MSME, Banking, and Government Scheme Knowledge Base
const KNOWLEDGE_BASE = [
  {
    keywords: ['moratorium', 'मोरेटोरियम', 'छूट', 'grace period', 'repayment holiday'],
    titleEn: 'What is a Moratorium Period?',
    titleHi: 'मोरेटोरियम (किश्त छूट अवधि) क्या है?',
    answerEn: `**Moratorium Period (किश्त छूट अवधि)** is a grace period granted by the bank during which you are **not required to pay loan EMIs** immediately after disbursement.

### Why is it given?
When you start a new enterprise (like a Dairy Farm, Tailoring Shop, or Flour Mill), it takes 3 to 6 months to install machinery, purchase cattle/stock, and generate profit. The government grants a moratorium so you don't face repayment stress before earning!

### Details under Samarth AI schemes:
- **Typical Duration:** 6 to 12 Months (e.g. 6 months for NBCFDC / NSFDC schemes).
- **Benefit:** You focus only on business operations during initial launch.
- **Repayment:** Your monthly or quarterly EMIs begin only after the moratorium period ends.`,
    answerHi: `**मोरेटोरियम (Moratorium Period)** बैंक द्वारा दी जाने वाली **किश्त छूट की अवधि** है, जिसमें लोन मिलने के तुरंत बाद आपको ईएमआई (EMI) नहीं चुकानी होती है।

### यह क्यों दिया जाता है?
जब आप कोई नया व्यापार (जैसे डेयरी फार्म, सिलाई केंद्र, या आटा मिल) शुरू करते हैं, तो मशीन लगाने, पशु खरीदने और कमाई शुरू होने में 3 से 6 महीने लग जाते हैं। सरकार यह छूट देती है ताकि बिना कमाई के आप पर कर्ज चुकाने का दबाव न आए!

### समर्थ एआई योजनाओं में नियम:
- **अवधि:** आमतौर पर 6 से 12 महीने की छूट मिलती है।
- **लाभ:** शुरुआती महीनों में आप पूरी तरह से अपने व्यापार को जमाने पर ध्यान दे सकते हैं।
- **अदायगी:** मोरेटोरियम खत्म होने के बाद ही आपकी सामान्य मासिक या त्रैमासिक किश्तें शुरू होती हैं।`,
    cta: { textEn: 'Check Feasibility & Moratorium', textHi: 'मोरेटोरियम गणना जांचें', path: '/advisory' }
  },
  {
    keywords: ['margin', 'मार्जिन', 'margin money', 'down payment', 'own contribution', 'पूंजी'],
    titleEn: 'What is Margin Money (10%)?',
    titleHi: 'मार्जिन मनी (मार्जिन पूंजी) क्या है?',
    answerEn: `**Margin Money (मार्जिन पूंजी)** is the small fraction of the total project cost that **you (the entrepreneur) contribute from your own pocket**. The remaining 85% to 95% is funded by the Government & Bank loan.

### Example:
- **Total Project Cost:** ₹5,00,000 (₹5 Lakh)
- **10% Margin Money Required:** ₹50,000 (Your investment)
- **Govt / Bank Loan (90%):** ₹4,50,000 at concessional interest rate.

### Under National Concessional Schemes:
For target MSME categories, the government keeps margin requirements as low as **5% to 10%**, making it feasible to start with minimal savings!`,
    answerHi: `**मार्जिन मनी (Margin Money)** कुल प्रोजेक्ट लागत का वह छोटा हिस्सा है जो **उद्यमी को स्वयं अपनी जेब से लगाना होता है**। बाकी 85% से 95% राशि सरकार और बैंक लोन के रूप में देते हैं।

### उदाहरण:
- **कुल प्रोजेक्ट लागत:** ₹5,00,000 (5 लाख रुपये)
- **10% मार्जिन मनी:** मात्र ₹50,000 (आपकी पूंजी)
- **सरकारी बैंक लोन (90%):** ₹4,50,000 (रियायती ब्याज दर पर)

### सरकारी योजनाओं में विशेष लाभ:
पिछड़े वर्गों और छोटे उद्यमियों के लिए सरकार ने मार्जिन मनी मात्र **5% से 10%** रखी है, ताकि कम पूंजी में भी बड़ा व्यवसाय खड़ा किया जा सके।`,
    cta: { textEn: 'Calculate Loan & Margin', textHi: 'मार्जिन व लोन कैलकुलेटर', path: '/calculator' }
  },
  {
    keywords: ['women', 'mahila', 'महिला', 'female', 'mahila samriddhi', 'स्त्री'],
    titleEn: 'Special Schemes & Subsidies for Women Entrepreneurs',
    titleHi: 'महिला उद्यमियों के लिए विशेष सरकारी योजनाएं व 4% ब्याज छूट',
    answerEn: `Women entrepreneurs receive exclusive financial incentives under Government of India initiatives:

### 1. Mahila Samriddhi Yojana (MoSJE / NBCFDC)
- **Ultra-Low Interest Rate:** **4.0% per annum** (compared to 9-12% in commercial banks).
- **Project Limit:** Up to ₹1,40,000 for micro-enterprises and self-help group members.
- **Margin Money:** Only 5% required.

### 2. Stand-Up India & Mudra Yojana (Tarun / Kishore)
- Collateral-free credit from ₹1 Lakh up to ₹1 Crore for greenfield enterprises.
- 0.25% to 1% additional interest rebate for women across major PSBs.`,
    answerHi: `भारत सरकार द्वारा महिला उद्यमियों को स्वावलंबी बनाने हेतु विशेष वित्तीय लाभ दिए जाते हैं:

### 1. महिला समृद्धि योजना (सामाजिक न्याय एवं अधिकारिता मंत्रालय)
- **अत्यधिक रियायती ब्याज:** मात्र **4.0% वार्षिक ब्याज** (सामान्य बैंक 10-12% लेते हैं)।
- **प्रोजेक्ट लागत:** ₹1,40,000 तक का सूक्ष्म व्यवसाय ऋण।
- **मार्जिन मनी:** मात्र 5% अंशदान।

### 2. मुद्रा योजना एवं स्टैंड-अप इंडिया
- बिना किसी संपत्ति गारंटी के ₹1 लाख से लेकर ₹1 करोड़ तक का व्यापार ऋण।
- महिला आवेदकों को सार्वजनिक बैंकों में ब्याज दर में अतिरिक्त छूट।`,
    cta: { textEn: 'View Women Schemes', textHi: 'महिला योजनाएं देखें', path: '/schemes' }
  },
  {
    keywords: ['apply', 'आवेदन', 'documents', 'दस्तावेज', 'kaise apply kare', 'process', 'portal'],
    titleEn: 'How to Apply & Required Documents',
    titleHi: 'आवेदन कैसे करें और जरूरी दस्तावेज क्या हैं?',
    answerEn: `Applying for government MSME schemes is fully digital and transparent. Here is the step-by-step roadmap:

### Required Documents Checklist:
1. **Identity & Address Proof:** Aadhaar Card, Voter ID, and PAN Card.
2. **Bank Account:** Active Bank Savings/Current account linked with Aadhaar (last 6 months passbook).
3. **Category Certificate:** Caste / OBC / SC / EWS Certificate (issued by Tehsildar/SDM).
4. **Project Proposal (DPR):** Brief outline of proposed business (can be auto-generated on Samarth AI).
5. **Passport size photos & Business premises proof (rent agreement or electricity bill).

### Where to Submit:
- **Online:** Through the **JanSamarth Portal** (jansamarth.in) or **MyScheme.gov.in**.
- **Offline / Local Assistance:** Nearest District Industries Centre (DIC), Lead District Bank, or Common Service Centre (CSC / Jan Seva Kendra).`,
    answerHi: `सरकारी योजनाओं में आवेदन की प्रक्रिया अब अत्यंत सरल व डिजिटल है:

### आवश्यक दस्तावेजों की सूची:
1. **पहचान व पते का प्रमाण:** आधार कार्ड, पैन कार्ड, व वोटर आईडी।
2. **बैंक विवरण:** आधार से लिंक बैंक खाता (पिछले 6 महीने की बैंक पासबुक)।
3. **वर्ग प्रमाण पत्र:** जाति / पिछड़ा वर्ग / ईडब्ल्यूएस प्रमाण पत्र (तहसीलदार/एसडीएम द्वारा जारी)।
4. **विस्तृत प्रोजेक्ट रिपोर्ट (DPR):** व्यवसाय का संक्षिप्त विवरण (समर्थ एआई से तुरंत जनरेट कर सकते हैं)।
5. **पासपोर्ट साइज फोटो व दुकान/कार्यस्थल का बिजली बिल या किरायानामा।

### आवेदन कहाँ करें:
- **ऑनलाइन:** केंद्र सरकार के **JanSamarth Portal (jansamarth.in)** या **MyScheme.gov.in** पर।
- **स्थानीय सहायता:** अपने जिले के उद्योग केंद्र (DIC), लीड बैंक ऑफिस, या नजदीकी जन सेवा केंद्र (CSC) पर।`,
    cta: { textEn: 'Generate Business DPR', textHi: 'व्यवसाय रिपोर्ट तैयार करें', path: '/advisory' }
  },
  {
    keywords: ['dpr', 'project report', 'रिपोर्ट', 'डीपीआर', 'detailed project report'],
    titleEn: 'What is a DPR (Detailed Project Report)?',
    titleHi: 'DPR (डिटेल्ड प्रोजेक्ट रिपोर्ट) क्या है?',
    answerEn: `A **Detailed Project Report (DPR)** is a comprehensive document required by banks before sanctioning a business loan.

### What does a DPR contain?
1. **Capital Expenditure:** Cost of machinery, tools, shed, or vehicles.
2. **Working Capital:** Funds needed for raw materials, inventory, and wages for 1-3 months.
3. **Means of Finance:** Breakup of 10% Margin Money and 90% Govt Loan.
4. **Projected Profit & Cash Flow:** Monthly revenue projections and ability to comfortably pay loan EMIs.

💡 *Tip: On Samarth AI, clicking **"AI Feasibility Study"** generates an instant, deterministic DPR tailored to your district and trade!*`,
    answerHi: `**DPR (Detailed Project Report)** एक आधिकारिक परियोजना दस्तावेज है जिसे बैंक में लोन आवेदन के साथ जमा करना अनिवार्य होता है।

### DPR में क्या-क्या होता है?
1. **पूंजीगत खर्च (Capital Expenditure):** मशीनरी, उपकरण, दुकान या वाहन की खरीद लागत।
2. **कार्यशील पूंजी (Working Capital):** 1 से 3 महीने के कच्चे माल, स्टॉक और मजदूरी का खर्च।
3. **वित्तीय संरचना (Means of Finance):** 10% आवेदक का मार्जिन और 90% बैंक ऋण का ब्योरा।
4. **लाभ एवं नकदी प्रवाह:** अनुमानित मासिक बिक्री और ऋण किश्त (EMI) चुकाने की क्षमता।

💡 *सुझाव: समर्थ एआई के **"AI Feasibility Study"** पर अपनी जानकारी भरकर आप तुरंत बैंक-योग्य प्रोजेक्ट रिपोर्ट तैयार कर सकते हैं!*`,
    cta: { textEn: 'Create Instant DPR', textHi: 'तुरंत DPR बनाएं', path: '/advisory' }
  },
  {
    keywords: ['cibil', 'credit score', 'सिबिल', 'guarantee', 'collateral', 'गारंटी', 'mortgage'],
    titleEn: 'Is Property Guarantee or High CIBIL Required?',
    titleHi: 'क्या जमीन/मकान की गारंटी या सिबिल स्कोर जरूरी है?',
    answerEn: `**No collateral or property mortgage is required** for micro and small enterprise loans under government guidelines:

### 1. Collateral-Free Loans (CGTMSE / Mudra)
Under the Credit Guarantee Trust for Micro and Small Enterprises (CGTMSE) and Mudra Scheme, loans up to **₹10 Lakh to ₹50 Lakh** are covered by a Central Government credit guarantee. You do not need to pledge land or house papers!

### 2. CIBIL Score Requirements
- While established businesses require 750+ CIBIL, for rural/first-time entrepreneurs under NBCFDC, NSFDC, and PMEGP, **previous credit history is not mandatory** (New to Credit / -1 score is accepted).
- You only need to ensure no active defaults on existing bank loans.`,
    answerHi: `सरकारी एमएसएमई योजनाओं में छोटे व्यापार के लिए **जमीन, मकान या संपत्ति गिरवी रखने की कोई आवश्यकता नहीं है**:

### 1. बिना गारंटी ऋण (CGTMSE व मुद्रा योजना)
सूक्ष्म और लघु उद्यम क्रेडिट गारंटी ट्रस्ट (CGTMSE) के तहत **₹10 लाख से लेकर ₹50 लाख तक का ऋण पूर्णतः गारंटी-मुक्त** होता है। बैंक को केंद्र सरकार स्वयं गारंटी प्रदान करती है।

### 2. सिबिल (CIBIL) स्कोर की अनिवार्यता:
- पहली बार व्यापार शुरू करने वाले ग्रामीण उद्यमियों के पास यदि पुराना सिबिल स्कोर नहीं है (New to Credit), तब भी ऋण मिलता है।
- केवल यह ध्यान रखें कि किसी पुराने बैंक में आपका कोई चालू डिफ़ॉल्ट (कर्ज बकाया) न हो।`,
    cta: { textEn: 'View Verified Schemes', textHi: 'सत्यापित योजनाएं देखें', path: '/schemes' }
  }
];

const AIChatbot = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      textEn: `Namaste! 🙏 I am your **Samarth AI Business & Financial Sahayak**.

I can help explain complex banking and business terms like **Moratorium**, **10% Margin Money**, **Subsidies**, or guide you on how to apply for government schemes.

Feel free to ask any question or tap one of the common topics below!`,
      textHi: `नमस्ते! 🙏 मैं आपका **समर्थ एआई वित्तीय व व्यापारिक सहायक (AI Sahayak)** हूँ।

मैं आपको **मोरेटोरियम (किश्त छूट)**, **10% मार्जिन मनी**, **सरकारी सब्सिडी**, और बैंक लोन आवेदन की पूरी प्रक्रिया आसान भाषा में समझा सकता हूँ।

आप नीचे दिए गए विषयों पर क्लिक कर सकते हैं या बोलकर/लिखकर कोई भी प्रश्न पूछ सकते हैं!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Voice Speech Synthesis for responses
  const speakText = (text) => {
    if (!voiceSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and hash tags for clean speech
      const clean = text.replace(/[*#_`]/g, '').replace(/\[.*?\]\(.*?\)/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      utter.rate = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  };

  // Find best match in knowledge base or fallback to smart AI logic
  const generateResponse = (query) => {
    const qLower = query.toLowerCase().trim();

    // 1. Search in Knowledge Base
    for (const item of KNOWLEDGE_BASE) {
      const isMatch = item.keywords.some(k => qLower.includes(k.toLowerCase()));
      if (isMatch) {
        return {
          textEn: item.answerEn,
          textHi: item.answerHi,
          cta: item.cta
        };
      }
    }

    // 2. Dynamic queries (e.g. Loan calculation, Dairy, Kirana, etc.)
    if (qLower.includes('dairy') || qLower.includes('दूध') || qLower.includes('भैंस')) {
      return {
        textEn: `### Dairy & Milk Farming Business Advice:
- **Feasible Project Cost:** ₹1,00,000 to ₹15,00,000 (depending on 2 to 10 milch animals).
- **Required Margin:** Only 10% (e.g. ₹50,000 for a ₹5 Lakh project).
- **Subsidies & Rebate:** Eligible under NBCFDC Term Loan at 6.5% - 8% and Animal Husbandry Infrastructure Fund (AHIDF) with a **3% interest subvention**.
- **Moratorium:** 6 months grace period before repayment starts.`,
        textHi: `### डेयरी फार्मिंग व्यवसाय परामर्श:
- **प्रोजेक्ट लागत:** ₹1,00,000 से ₹15,00,000 (2 से 10 दुधारू पशुओं के लिए)।
- **मार्जिन मनी:** मात्र 10% (उदा: 5 लाख के प्रोजेक्ट पर केवल ₹50,000)।
- **ब्याज दर व सब्सिडी:** NBCFDC टर्म लोन योजना में 6.5% से 8% ब्याज, तथा AHIDF के तहत 3% की अतिरिक्त ब्याज सब्सिडी।
- **मोरेटोरियम:** 6 महीने की किश्त छूट उपलब्ध है।`,
        cta: { textEn: 'Run Dairy Feasibility Study', textHi: 'डेयरी रिपोर्ट तैयार करें', path: '/advisory' }
      };
    }

    if (qLower.includes('kirana') || qLower.includes('grocery') || qLower.includes('दुकान')) {
      return {
        textEn: `### Grocery / Kirana Store Advisory:
- **Typical Project Limit:** ₹50,000 to ₹5,00,000.
- **Scheme Matching:** Covered under **PMAY Micro Finance** or **NBCFDC General Term Loan**.
- **Stock & Working Capital:** 60% of loan can be used for inventory and 40% for shop racking/freezer assets.
- **Repayment:** Monthly installments spread over 3 to 5 years.`,
        textHi: `### किराना व जनरल स्टोर परामर्श:
- **सामान्य प्रोजेक्ट आकार:** ₹50,000 से ₹5,00,000।
- **उपयुक्त योजनाएं:** NBCFDC टर्म लोन और प्रधानमंत्री मुद्रा योजना (शिशु व किशोर वर्ग)।
- **स्टॉक व वर्किंग कैपिटल:** 60% राशि सामान/स्टॉक भरने के लिए और 40% दुकान फर्नीचर/फ्रिज हेतु।
- **अदायगी:** 3 से 5 वर्षों में आसान मासिक किश्तों में।`,
        cta: { textEn: 'Explore Schemes for Retail', textHi: 'दुकान योजनाएं देखें', path: '/schemes' }
      };
    }

    // 3. Fallback AI business advisory
    return {
      textEn: `Thank you for your question about: **"${query}"**.

Here is our financial guidance:
- Under Ministry of Social Justice & Empowerment (MoSJE) guidelines, backward class and rural entrepreneurs can avail concessional credit ranging from ₹50,000 to ₹50,00,000 with a minimal 5% to 10% margin contribution.
- You enjoy a **6 to 12 months moratorium period** on principal repayments.
- You can calculate exact monthly installments and project breakdown right on Samarth AI!`,
      textHi: `आपके प्रश्न: **"${query}"** के संदर्भ में वित्तीय मार्गदर्शन:
- सामाजिक न्याय एवं अधिकारिता मंत्रालय (MoSJE) के दिशा-निर्देशों के अनुसार, ग्रामीण व पिछड़े वर्ग के उद्यमी ₹50,000 से लेकर ₹50,00,000 तक का रियायती ऋण मात्र 5% से 10% मार्जिन पूंजी पर ले सकते हैं।
- आपको शुरुआती **6 से 12 महीने का मोरेटोरियम (किश्त छूट)** मिलता है ताकि व्यवसाय स्थापित हो सके।
- आप समर्थ एआई पर अपनी सटीक ईएमआई और व्यवहार्यता रिपोर्ट तुरंत निकाल सकते हैं!`,
      cta: { textEn: 'Open Loan Calculator', textHi: 'लोन कैलकुलेटर खोलें', path: '/calculator' }
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      textEn: query,
      textHi: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = generateResponse(query);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        textEn: response.textEn,
        textHi: response.textHi,
        cta: response.cta,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(lang === 'hi' ? response.textHi : response.textEn);
    }, 600);
  };

  const handleQuickPrompt = (promptEn, promptHi) => {
    const q = lang === 'hi' ? promptHi : promptEn;
    handleSendMessage(q);
  };

  const quickPrompts = [
    { en: 'What is a Moratorium Period?', hi: 'मोरेटोरियम क्या है और किश्त कब से शुरू होती है?' },
    { en: 'How does 10% Margin Money work?', hi: '10% मार्जिन मनी क्या है और मुझे कितना लगाना होगा?' },
    { en: 'Which schemes offer 4% interest for women?', hi: 'महिला उद्यमियों के लिए 4% ब्याज वाली योजना कौन सी है?' },
    { en: 'What documents are required to apply?', hi: 'लोन के लिए कौन-से दस्तावेज चाहिए?' },
    { en: 'What is a DPR and how do I create it?', hi: 'DPR (प्रोजेक्ट रिपोर्ट) क्या है और कैसे बनती है?' },
    { en: 'Is land or property guarantee required?', hi: 'क्या कोई जमीन या संपत्ति गिरवी रखनी होगी?' }
  ];

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center space-x-2.5 bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-400/30"
            title="Ask Samarth AI Financial Sahayak"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black uppercase tracking-wider text-amber-300">
                {lang === 'hi' ? 'एआई सहायक' : 'AI Advisor'}
              </div>
              <div className="text-xs font-semibold">
                {lang === 'hi' ? 'सवाल पूछें (Chat)' : 'Ask Business Terms'}
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Modern Conversational Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] max-h-[85vh] h-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-bold tracking-tight">
                    {lang === 'hi' ? 'समर्थ एआई सहायक' : 'Samarth AI Sahayak'}
                  </h3>
                  <span className="bg-blue-600/30 text-blue-200 border border-blue-400/20 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    GEMINI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {lang === 'hi' ? 'बैंकिंग व व्यापारिक शब्दावली गाइड' : 'MSME & Concessional Finance Guide'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={() => setVoiceSpeechEnabled(!voiceSpeechEnabled)}
                className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${
                  voiceSpeechEnabled ? 'text-amber-300 bg-slate-800' : 'text-slate-400'
                }`}
                title={voiceSpeechEnabled ? 'Mute AI voice' : 'Enable voice speech for answers'}
              >
                {voiceSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setMessages([messages[0]]);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
              {lang === 'hi' ? 'लोकप्रिय विषय:' : 'Quick Topics:'}
            </span>
            {quickPrompts.slice(0, 4).map((p, i) => (
              <button
                key={i}
                onClick={() => handleQuickPrompt(p.en, p.hi)}
                className="text-[11px] font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shadow-2xs hover:border-blue-300 shrink-0"
              >
                {lang === 'hi' ? p.hi.split('?')[0] + '?' : p.en}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              const textContent = lang === 'hi' ? msg.textHi || msg.textEn : msg.textEn;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] ${isBot ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`inline-block p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isBot
                          ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs'
                          : 'bg-blue-600 text-white shadow-xs rounded-tr-xs text-left'
                      }`}
                    >
                      {/* Markdown-like formatting helper */}
                      <div className="space-y-2 whitespace-pre-line">
                        {textContent.split('\n\n').map((paragraph, pIdx) => {
                          // Clean bold syntax **text**
                          const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={pIdx}>
                              {parts.map((part, partIdx) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return (
                                    <strong key={partIdx} className={isBot ? 'text-slate-950 font-bold' : 'text-white font-bold'}>
                                      {part.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                if (part.startsWith('### ')) {
                                  return (
                                    <span key={partIdx} className="block font-bold text-xs uppercase tracking-wider text-blue-600 mb-1">
                                      {part.replace('### ', '')}
                                    </span>
                                  );
                                }
                                return part;
                              })}
                            </p>
                          );
                        })}
                      </div>

                      {/* Action Button inside message */}
                      {msg.cta && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <button
                            onClick={() => {
                              navigate(msg.cta.path);
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                          >
                            <span>{lang === 'hi' ? msg.cta.textHi : msg.cta.textEn}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs py-1">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>{lang === 'hi' ? 'उत्तर तैयार कर रहे हैं...' : 'Consulting financial rules...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  lang === 'hi'
                    ? 'मोरेटोरियम, मार्जिन मनी, या लोन प्रक्रिया पूछें...'
                    : 'Ask about moratorium, margin money, schemes...'
                }
                className="flex-grow px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all shadow-xs disabled:opacity-40"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>{lang === 'hi' ? 'सार्वजनिक सरकारी पोर्टल नियमों पर आधारित' : 'Grounded in MoSJE & MyScheme rules'}</span>
              <span className="font-medium text-emerald-600">● 100% Free Advisory</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatbot;
