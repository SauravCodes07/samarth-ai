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
  ArrowRight,
  Volume2,
  VolumeX,
  RotateCcw,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';

// Comprehensive Reasoning Engine for Concessional MSME Banking
const REASONING_DATABASE = [
  {
    triggers: ['moratorium', 'मोरेटोरियम', 'हप्ता सूट', 'किश्त छूट', 'grace period', 'repayment holiday'],
    en: {
      title: 'Logical Concept: What is a Moratorium Period?',
      body: `**Moratorium Period (किश्त छूट / हप्ता सवलत)** is an official repayment grace period granted by the bank.

### Logical Reason:
When launching an enterprise (e.g., Dairy Farm, Tailoring Boutique, or Flour Mill), you cannot produce revenue on Day 1. It takes 3 to 6 months to procure cows, install machinery, and generate cash flow. 
If the bank demanded loan EMIs immediately, the new business would default!

### How it works on Samarth AI schemes:
1. **Grace Duration:** 6 to 12 Months (e.g., 6 months under NBCFDC / NSFDC schemes).
2. **During Moratorium:** You pay **ZERO principal EMI**. You use your cash flow entirely to stabilize business operations.
3. **After Moratorium:** Regular monthly/quarterly EMIs commence automatically once your enterprise is profitable.`,
      cta: { label: 'Calculate Moratorium & EMI', path: '/calculator' }
    },
    hi: {
      title: 'तार्किक विश्लेषण: मोरेटोरियम (किश्त छूट) क्या है?',
      body: `**मोरेटोरियम (Moratorium Period)** बैंक द्वारा दी जाने वाली **किश्त छूट की आधिकारिक अवधि** है।

### इसका तार्किक कारण क्या है?
जब आप कोई नया व्यवसाय (जैसे 10 गायों की डेयरी, सिलाई बुटीक, या तेल मिल) शुरू करते हैं, तो पहले दिन से आमदनी नहीं होती। पशु लाने, शेड बनाने और ग्राहक जोड़ने में 3 से 6 महीने का समय लगता है।
यदि बैंक पहले ही महीने से किश्त (EMI) मांगने लगे, तो नया उद्यमी कर्ज में डूब जाएगा!

### समर्थ एआई योजनाओं में नियम:
1. **छूट की अवधि:** आमतौर पर 6 से 12 महीने का मोरेटोरियम मिलता है।
2. **इस दौरान लाभ:** आपको **मूलधन की किश्त नहीं देनी होती**। सारी कमाई व्यापार को बढ़ाने में लगाई जा सकती है।
3. **अदायगी की शुरुआत:** मोरेटोरियम खत्म होने के बाद, जब व्यापार लाभ कमाने लगे, तब आसान किश्तें शुरू होती हैं।`,
      cta: { label: 'मोरेटोरियम व ईएमआई देखें', path: '/calculator' }
    },
    mr: {
      title: 'तार्किक संकल्पना: मोरेटोरियम (हप्ता सवलत कालावधी) म्हणजे काय?',
      body: `**मोरेटोरियम (Moratorium Period)** म्हणजे बँकेने दिलेली **कर्ज हप्ता सवलतीची अधिकृत मुदत** होय.

### याचे तार्किक कारण काय आहे?
जेव्हा तुम्ही नवीन व्यवसाय (उदा. डेअरी फार्म, किराणा दुकान, किंवा शिलाई केंद्र) सुरू करता, तेव्हा पहिल्याच दिवसापासून नफा सुरू होत नाही. जनावरे खरेदी करणे, यंत्रसामग्री बसवणे आणि व्यवसाय जमवणे यात ३ ते ६ महिने लागतात.
बँकेने पहिल्याच महिन्यापासून हप्ता मागितला तर उद्योजकावर आर्थिक ताण येईल!

### सरकारी योजनांमधील नियम:
1. **सवलतीची मुदत:** ६ ते १२ महिन्यांची हप्ता सवलत मिळते.
2. **या कालावधीत फायदा:** तुम्हाला **कोणताही मुद्दल हप्ता भरावा लागत नाही**. पूर्ण नफा व्यवसायात गुंतवता येतो.
3. **हप्ता कधी सुरू होतो:** व्यवसाय स्थिर झाल्यावर आणि मोरेटोरियम संपल्यावरच नियमित मासिक हप्ते सुरू होतात.`,
      cta: { label: 'मोरेटोरियम व हप्ता तपासा', path: '/calculator' }
    }
  },
  {
    triggers: ['margin', 'मार्जिन', 'भांडवल', 'पूंजी', 'own contribution', 'down payment', '10%'],
    en: {
      title: 'Financial Logic: How 10% Margin Money Works',
      body: `**Margin Money (उद्यमी का अंशदान / स्वतःचे भांडवल)** is the small fraction of the total project cost that you invest from your pocket, while the Government Bank funds the remaining **90% to 95%**.

### Live Example Breakdown:
- **Total Project Cost:** ₹5,00,000 (₹5 Lakh)
- **Your 10% Margin Investment:** ₹50,000
- **Government Subsidized Loan (90%):** ₹4,50,000
- **Effective Leverage:** With just ₹50,000 in your pocket, you own an enterprise asset worth ₹5,00,000!

For women and backward class founders, margin money requirement is kept at only **5% to 10%** under Ministry guidelines.`,
      cta: { label: 'Explore Margin Calculator', path: '/calculator' }
    },
    hi: {
      title: 'वित्तीय गणित: 10% मार्जिन मनी कैसे काम करती है?',
      body: `**मार्जिन मनी (Margin Money)** कुल प्रोजेक्ट लागत का वह छोटा हिस्सा है जो आपको अपनी जेब से लगाना होता है, जबकि बाकी **90% से 95% राशि सरकार और बैंक लोन** द्वारा दी जाती है।

### वास्तविक उदाहरण:
- **कुल प्रोजेक्ट लागत:** ₹5,00,000 (5 लाख रुपये)
- **आपकी 10% मार्जिन पूंजी:** मात्र ₹50,000
- **सरकारी रियायती लोन (90%):** ₹4,50,000
- **फायदा:** मात्र ₹50,000 की बचत में आप 5 लाख रुपये का पूरा व्यवसाय खड़ा कर सकते हैं!

महिला एवं पिछड़े वर्ग के आवेदकों के लिए मंत्रालय के नियमों के तहत मार्जिन मात्र **5% से 10%** रखा गया है।`,
      cta: { label: 'मार्जिन व लोन चेक करें', path: '/calculator' }
    },
    mr: {
      title: 'आर्थिक गणित: १०% मार्जिन मनी (स्वतःचे भांडवल) कसे कार्य करते?',
      body: `**मार्जिन मनी (Margin Money)** म्हणजे एकूण प्रकल्पाच्या खर्चातील तो छोटा हिस्सा जो तुम्हाला स्वतःच्या खिशातून घालावा लागतो. उर्वरित **९०% ते ९५% रक्कम सरकार व बँक कर्जाच्या** स्वरूपात देते.

### प्रत्यक्ष उदाहरण:
- **एकूण प्रकल्प खर्च:** ₹५,००,००० (५ लाख रुपये)
- **तुमचे १०% स्वतःचे भांडवल:** फक्त ₹५०,०००
- **सरकारी सवलतीचे कर्ज (९०%):** ₹४,५०,०००
- **मोठा लाभ:** खिशात केवळ ₹५०,००० असताना तुम्ही ५ लाख रुपयांचा संपूर्ण उद्योग सुरू करू शकता!

महिला व मागासवर्गीय प्रवर्गासाठी शासनाने हे प्रमाण फक्त **५% ते १०%** ठेवले आहे.`,
      cta: { label: 'भांडवल गणक वापरा', path: '/calculator' }
    }
  },
  {
    triggers: ['profit', 'dairy', 'गाय', 'भैंस', 'दूध', 'नफा', 'मुनाफा', 'cow', 'cows', 'buffalo'],
    en: {
      title: 'Business Feasibility: Profitability of a 10-Milch Cow Dairy Farm',
      body: `Here is the verified financial and economic breakdown for a 10-Cow Dairy Unit:

### 1. Capital Expenditure (Total: ~₹10,00,000)
- 10 Quality HF / Crossbred Cows: ₹6,50,000
- Shed & Milking equipment: ₹2,50,000
- Initial fodder & medicines: ₹1,00,000
- **Your 10% Margin:** ₹1,00,000 | **Govt Loan (90%):** ₹9,00,000

### 2. Monthly Economics:
- **Milk Production:** ~120 Litres/day @ ₹42/Litre = **₹1,51,200 Gross Revenue / month**.
- **Feed & Vet Costs:** ~₹75,000 / month.
- **Loan EMI (at 6.5% for 5 years):** ~₹17,600 / month (starts after 6-month moratorium).
- **Estimated Net In-Hand Profit:** **₹58,000 – ₹65,000 per month**!`,
      cta: { label: 'Run Full Feasibility Model', path: '/advisory' }
    },
    hi: {
      title: 'व्यवसायिक विश्लेषण: 10 दुधारू गायों की डेयरी में कितना मुनाफा होगा?',
      body: `10 दुधारू गायों की आधुनिक डेयरी यूनिट का सटीक वित्तीय गणित:

### 1. प्रोजेक्ट खर्च (कुल लागत: ~₹10,00,000):
- 10 उन्नत नस्ल गायें: ₹6,50,000
- शेड निर्माण व मिल्किंग मशीन: ₹2,50,000
- चारा व शुरुआती कार्यशील पूंजी: ₹1,00,000
- **आपका 10% मार्जिन:** ₹1,00,000 | **सरकारी बैंक लोन (90%):** ₹9,00,000

### 2. मासिक आय और खर्च:
- **दूध उत्पादन:** ~120 लीटर/दिन @ ₹42/लीटर = **₹1,51,200 कुल मासिक बिक्री**।
- **पशु आहार व दवाई खर्च:** ~₹75,000 प्रति माह।
- **लोन EMI (6.5% ब्याज, 5 वर्ष):** ~₹17,600 प्रति माह (6 माह मोरेटोरियम के बाद शुरू)।
- **शुद्ध मासिक बचत (मुनाफा):** **₹58,000 से ₹65,000 प्रति माह**!`,
      cta: { label: 'डेयरी रिपोर्ट जनरेट करें', path: '/advisory' }
    },
    mr: {
      title: 'व्यवसायिक ताळेबंद: १० दुभत्या गाईंच्या डेअरीमध्ये किती नफा होईल?',
      body: `१० दुभत्या गाईंच्या आधुनिक डेअरी फार्मचे अचूक ताळेबंद:

### १. प्रकल्प खर्च (एकूण: ~₹१०,००,०००):
- १० चांगल्या जातीच्या गाई: ₹६,५०,०००
- शेड व मिल्किंग मशिन: ₹२,५०,०००
- चारा व प्रारंभिक खर्च: ₹१,००,०००
- **तुमचे १०% भांडवल:** ₹१,००,००० | **सरकारी कर्ज (९०%):** ₹९,००,०००

### २. मासिक जमा-खर्च:
- **दूध उत्पादन:** ~१२० लिटर/दिवस @ ₹४२/लिटर = **₹१,५१,२०० मासिक एकूण विक्री**.
- **चारा, खुराक व औषध खर्च:** ~₹७५,००० प्रति महिना.
- **कर्ज हप्ता (६.५% व्याज, ५ वर्षे):** ~₹१७,६०० प्रति महिना (६ महिने सवलतीनंतर).
- **निव्वळ मासिक नफा:** **₹५८,००० ते ₹६५,००० प्रति महिना**!`,
      cta: { label: 'डेअरी अहवाल तयार करा', path: '/advisory' }
    }
  },
  {
    triggers: ['women', 'mahila', 'महिला', 'female', 'स्त्री', 'samriddhi', 'सवलत', '4%'],
    en: {
      title: 'Special 4% Concessional Interest Schemes for Women',
      body: `Women entrepreneurs qualify for the Government of India's most aggressive interest subsidies:

1. **Mahila Samriddhi Yojana (MoSJE / NBCFDC):**
   - **Interest Rate:** **4.0% per annum** (flat rate, drastically lower than commercial bank 11%).
   - **Project Cost Limit:** Up to ₹1,40,000 for tailoring, handicrafts, food processing, or micro-retail.
   - **Margin Money:** Only 5% required!

2. **Stand-Up India Scheme:**
   - Bank loans between ₹10 Lakh and ₹1 Crore for greenfield manufacturing and services by women founders.
   - Zero property mortgage required under CGTMSE guarantee cover.`,
      cta: { label: 'View Women Concessional Schemes', path: '/schemes' }
    },
    hi: {
      title: 'महिला उद्यमियों के लिए विशेष 4% ब्याज दर वाली सरकारी योजनाएं',
      body: `महिला उद्यमियों को आत्मनिर्भर बनाने हेतु भारत सरकार द्वारा विशेष रियायतें दी गई हैं:

1. **महिला समृद्धि योजना (MoSJE / NBCFDC):**
   - **रियायती ब्याज दर:** मात्र **4.0% वार्षिक ब्याज** (सामान्य बैंक 10% से 12% लेते हैं)।
   - **प्रोजेक्ट सीमा:** सिलाई, बुटीक, ब्यूटी पार्लर, फूड पैकेजिंग हेतु ₹1,40,000 तक।
   - **मार्जिन मनी:** मात्र 5% अंशदान!

2. **स्टैंड-अप इंडिया व मुद्रा योजना:**
   - महिला उद्यमियों के लिए ₹10 लाख से लेकर ₹1 करोड़ तक का व्यापार ऋण।
   - सीजीटीएमएसई (CGTMSE) के तहत किसी जमीन या मकान को गिरवी रखने की आवश्यकता नहीं।`,
      cta: { label: 'महिला योजनाएं देखें', path: '/schemes' }
    },
    mr: {
      title: 'महिला उद्योजकांसाठी विशेष ४% व्याजदराच्या शासकीय योजना',
      body: `महिला उद्योजकांसाठी केंद्र व राज्य शासनाकडून विशेष सवलती उपलब्ध आहेत:

१. **महिला समृद्धी योजना (सामाजिक न्याय मंत्रालय):**
   - **अत्यंत कमी व्याज:** फक्त **४.०% वार्षिक व्याज** (इतर बँका १०-१२% घेतात).
   - **प्रकल्प मर्यादा:** शिलाई, हस्तकला, ब्युटी पार्लर किंवा खाद्यप्रक्रियेसाठी ₹१,४०,००० पर्यंत.
   - **स्वतःचे भांडवल:** फक्त ५% आवश्यक!

२. **स्टँड-अप इंडिया व मुद्रा योजना:**
   - महिलांसाठी ₹१० लाखांपासून ₹१ कोटीपर्यंतचे विनातारण व्यवसाय कर्ज.
   - CGTMSE अंतर्गत कोणतीही मालमत्ता गहाण ठेवण्याची गरज नाही.`,
      cta: { label: 'महिला योजना पहा', path: '/schemes' }
    }
  },
  {
    triggers: ['apply', 'आवेदन', 'अर्ज', 'documents', 'दस्तावेज', 'कागदपत्रे', 'process', 'jansamarth', 'portal'],
    en: {
      title: 'Step-by-Step Application Roadmap & Documents',
      body: `Follow these 4 simple steps to apply for any Central or State government MSME scheme:

### Mandatory Document Checklist:
1. **Aadhaar Card & PAN Card** (Aadhaar linked to active mobile number).
2. **Bank Passbook** (Last 6 months account statement).
3. **Caste / Category Certificate** (OBC / SC / EWS issued by Tehsildar/SDM).
4. **Project Proposal (DPR):** Cost estimate and machinery quotation (generate on Samarth AI).
5. **Premises Proof:** Rent agreement or electricity bill of the shop/shed.

### Official Portals:
- Apply online at **JanSamarth Portal (jansamarth.in)** or **MyScheme.gov.in**.
- Or visit your District Industries Centre (DIC) / Lead District Bank.`,
      cta: { label: 'Generate DPR for Application', path: '/advisory' }
    },
    hi: {
      title: 'आवेदन की 4-चरणीय प्रक्रिया और आवश्यक दस्तावेज',
      body: `सरकारी एमएसएमई योजनाओं में आवेदन करने का सीधा व स्पष्ट तरीका:

### जरूरी दस्तावेजों की चेकलिस्ट:
1. **आधार कार्ड व पैन कार्ड** (आधार से मोबाइल नंबर लिंक होना चाहिए)।
2. **बैंक पासबुक** (पिछले 6 महीने का बैंक स्टेटमेंट)।
3. **जाति प्रमाण पत्र** (ओबीसी / एससी / ईडब्ल्यूएस प्रमाण पत्र)।
4. **प्रोजेक्ट रिपोर्ट (DPR):** व्यवसाय का लागत ब्योरा व मशीनरी कोटेशन (समर्थ एआई से तुरंत निकालें)।
5. **स्थान का प्रमाण:** दुकान या शेड का बिजली बिल अथवा किरायानामा।

### आवेदन पोर्टल:
- **JanSamarth Portal (jansamarth.in)** या **MyScheme.gov.in** पर ऑनलाइन फॉर्म भरें।
- अथवा अपने जिले के उद्योग केंद्र (DIC) में सीधे संपर्क करें।`,
      cta: { label: 'DPR रिपोर्ट तैयार करें', path: '/advisory' }
    },
    mr: {
      title: 'कर्ज अर्जाची ४-टप्प्यांची प्रक्रिया आणि आवश्यक कागदपत्रे',
      body: `सरकारी योजनांचा लाभ घेण्यासाठीची सोपी व थेट प्रक्रिया:

### आवश्यक कागदपत्रांची यादी:
१. **आधार कार्ड व पॅन कार्ड** (आधार मोबाईलशी लिंक असावे).
२. **बँक पासबुक** (मागील ६ महिन्यांचे बँक स्टेटमेंट).
३. **जात प्रमाणपत्र** (ओबीसी / एससी / ईडब्ल्यूएस प्रमाणपत्र).
४. **प्रकल्प अहवाल (DPR):** यंत्रसामग्री कोटेशन व अंदाजपत्रक (समर्थ एआय वरून त्वरित जनरेट करा).
५. **जागेचा पुरावा:** दुकानाचे/शेडचे वीज बिल किंवा भाडेकरार.

### अधिकृत पोर्टल:
- केंद्र सरकारच्या **JanSamarth Portal (jansamarth.in)** किंवा **MyScheme.gov.in** वर ऑनलाइन अर्ज करा.
- किंवा आपल्या जिल्हा उद्योग केंद्रात (DIC) थेट संपर्क साधा.`,
      cta: { label: 'DPR अहवाल तयार करा', path: '/advisory' }
    }
  }
];

const AIChatbot = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  const getWelcomeMessage = () => {
    if (lang === 'mr') {
      return `नमस्कार! 🙏 मी आपला **समर्थ एआय व्यावसायिक व आर्थिक सल्लागार (AI Sahayak)** आहे.

मी आपल्याला **मोरेटोरियम (हप्ता सवलत)**, **१०% भांडवल (Margin Money)**, **शासकीय ४% महिला योजना**, आणि **नफा-तोटा ताळेबंद** अतिशय सोप्या भाषेत समजावून सांगू शकतो.

आपण खालीलपैकी कोणत्याही विषयावर क्लिक करू शकता किंवा कोणताही प्रश्न विचारू शकता!`;
    }
    if (lang === 'hi') {
      return `नमस्ते! 🙏 मैं आपका **समर्थ एआई वित्तीय व व्यापारिक सलाहकार (AI Sahayak)** हूँ।

मैं आपको **मोरेटोरियम (किश्त छूट)**, **10% मार्जिन मनी**, **महिला 4% ब्याज छूट**, और **व्यवसाय में मुनाफा व लोन ईएमआई** तार्किक रूप से समझा सकता हूँ।

आप नीचे दिए गए विषयों पर क्लिक करें या अपना कोई भी प्रश्न पूछें!`;
    }
    return `Namaste! 🙏 I am your **Samarth AI Business & Financial Advisor**.

I provide logical reasoning on **Moratorium Periods**, **10% Margin Money**, **Profit Calculations**, and **Government Subsidized Schemes**.

Tap any topic below or ask your specific business question!`;
  };

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: getWelcomeMessage(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Update welcome message if language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ ...prev[0], text: getWelcomeMessage() }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const speakText = (text) => {
    if (!voiceSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#_`]/g, '').replace(/\[.*?\]\(.*?\)/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
      utter.rate = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  };

  // Logical Reasoning Engine
  const generateSmartReasoning = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Handle Gibberish / Very Short Input (e.g. "q", "a", "...", "1")
    if (q.length < 3 || /^[a-z0-9]$/i.test(q)) {
      if (lang === 'mr') {
        return {
          text: `मला आपला प्रश्न समजला नाही. 🤔
कृपया आपला प्रश्न स्पष्टपणे लिहा, जसे की:
- *"मोरेटोरियम म्हणजे काय?"*
- *"१० गाईंच्या डेअरीमध्ये किती नफा होईल?"*
- *"महिलांसाठी ४% व्याजाची योजना कोणती?"*
- *"५ लाखांच्या कर्जावर मासिक हप्ता किती बसेल?"*`,
          cta: null
        };
      }
      if (lang === 'hi') {
        return {
          text: `मुझे आपका प्रश्न स्पष्ट नहीं हुआ। 🤔
कृपया अपना प्रश्न थोड़ा विस्तार से लिखें, जैसे:
- *"मोरेटोरियम (किश्त छूट) क्या है?"*
- *"10 गायों की डेयरी में कितना शुद्ध मुनाफा होगा?"*
- *"महिला उद्यमियों के लिए 4% ब्याज वाली योजना कौन सी है?"*
- *"5 लाख के लोन पर कितनी मासिक EMI बनेगी?"*`,
          cta: null
        };
      }
      return {
        text: `I didn't quite catch that. 🤔
Please ask a clear business or banking question, such as:
- *"What is a Moratorium period?"*
- *"How much net profit in a 10-cow dairy farm?"*
- *"Which schemes offer 4% interest for women?"*
- *"What is my monthly EMI on a ₹5 Lakh loan?"*`,
        cta: null
      };
    }

    // 2. Handle Casual Greetings
    if (/^(hi|hello|hey|namaste|namaskar|pranam|kem cho|kasa kay|kaise ho)/i.test(q)) {
      if (lang === 'mr') {
        return {
          text: `नमस्कार! मी समर्थ एआय सहाय्यक आहे. मी आपल्याला शासकीय कर्ज योजना, मार्जिन मनी आणि व्यवसाय नफा-तोटा समजण्यास कशी मदत करू शकतो?`,
          cta: { label: 'योजनांची यादी पहा', path: '/schemes' }
        };
      }
      if (lang === 'hi') {
        return {
          text: `नमस्ते! मैं समर्थ एआई वित्तीय सलाहकार हूँ। मैं आपके नए व्यवसाय, 10% मार्जिन पूंजी, और सरकारी सब्सिडी के संबंध में किस प्रकार सहायता करूँ?`,
          cta: { label: 'सरकारी योजनाएं देखें', path: '/schemes' }
        };
      }
      return {
        text: `Hello! I am your Samarth AI Financial Advisor. How can I help structure your business credit, calculate margin money, or find concessional schemes today?`,
        cta: { label: 'Browse Verified Schemes', path: '/schemes' }
      };
    }

    // 3. Match against Structured Knowledge & Reasoning Models
    for (const item of REASONING_DATABASE) {
      if (item.triggers.some(t => q.includes(t.toLowerCase()))) {
        const localized = lang === 'mr' ? item.mr : lang === 'hi' ? item.hi : item.en;
        return {
          text: `### ${localized.title}\n\n${localized.body}`,
          cta: localized.cta
        };
      }
    }

    // 4. Logical General Advisor Fallback (Explains based on MoSJE & Banking Logic)
    if (lang === 'mr') {
      return {
        text: `आपल्या प्रश्नाचे (**"${rawQuery}"**) सविस्तर आर्थिक विश्लेषण:

1. **शासकीय निकष:** सामाजिक न्याय व एमएसएमई मंत्रालयाच्या नियमांनुसार, ग्रामीण व नवउद्योजकांना १०% मार्जिनवर ९०% पर्यंत सवलतीचे कर्ज उपलब्ध होते.
2. **हप्ता सवलत:** नवीन उद्योगांना सुरुवातीला ६ ते १२ महिन्यांची मोरेटोरियम (हप्ता सवलत) दिली जाते जेणेकरून व्यवसायाची घडी बसेल.
3. **पुढील कृती:** आपण समर्थ एआयच्या **"AI Feasibility Study"** वर जाऊन आपल्या प्रकल्पाची संपूर्ण ताळेबंद आणि बँक अहवाल (DPR) त्वरित तयार करू शकता!`,
        cta: { label: 'व्यवसाय अहवाल तयार करा', path: '/advisory' }
      };
    }
    if (lang === 'hi') {
      return {
        text: `आपके प्रश्न (**"${rawQuery}"**) का तार्किक व वित्तीय विश्लेषण:

1. **सरकारी नियम:** सामाजिक न्याय एवं एमएसएमई मंत्रालय के दिशानिर्देशों के तहत, उद्यमियों को मात्र 10% मार्जिन पूंजी पर 90% तक का रियायती बैंक ऋण मिलता है।
2. **किश्त छूट:** व्यवसाय शुरू करने पर पहले 6 से 12 महीने का मोरेटोरियम दिया जाता है ताकि आप बिना किसी आर्थिक दबाव के काम जमा सकें।
3. **आगे क्या करें:** आप समर्थ एआई के **"AI Feasibility Study"** पेज पर जाकर अपने व्यापार का संपूर्ण लाभ-हानि खाता और बैंक-योग्य DPR रिपोर्ट तैयार कर सकते हैं!`,
        cta: { label: 'व्यवहार्यता रिपोर्ट बनाएं', path: '/advisory' }
      };
    }
    return {
      text: `Logical Financial Assessment for: **"${rawQuery}"**:

1. **Concessional Financing:** Under Ministry of Social Justice & MSME norms, eligible founders only need to contribute **5% to 10% Margin Money**, while 90% is funded via government credit.
2. **Cashflow Protection:** You are eligible for a **6 to 12 months Moratorium Period** during which no principal loan repayments are due.
3. **Next Step:** You can run our deterministic financial engine to calculate your exact EMI, subsidy eligibility, and bank-ready DPR!`,
      cta: { label: 'Open Feasibility Calculator', path: '/advisory' }
    };
  };

  const handleSend = (textToSend) => {
    const q = (textToSend || inputValue).trim();
    if (!q) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateSmartReasoning(q);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        cta: response.cta,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(response.text);
    }, 450);
  };

  const quickPills = [
    {
      en: 'What is a Moratorium Period?',
      hi: 'मोरेटोरियम (किश्त छूट) क्या है?',
      mr: 'मोरेटोरियम (हप्ता सवलत) म्हणजे काय?'
    },
    {
      en: 'How does 10% Margin Money work?',
      hi: '10% मार्जिन मनी कैसे काम करती है?',
      mr: '१०% स्वतःचे भांडवल (मार्जिन) कसे काम करते?'
    },
    {
      en: 'Profit in 10-Cow Dairy Farm?',
      hi: '10 गायों की डेयरी में कितना मुनाफा होगा?',
      mr: '१० गाईंच्या डेअरीमध्ये किती नफा होईल?'
    },
    {
      en: 'Special 4% Interest for Women?',
      hi: 'महिलाओं के लिए 4% ब्याज योजना?',
      mr: 'महिलांसाठी ४% व्याजाची सवलत योजना?'
    },
    {
      en: 'What documents are required to apply?',
      hi: 'आवेदन हेतु कौन से दस्तावेज चाहिए?',
      mr: 'कर्ज अर्जासाठी कोणती कागदपत्रे लागतात?'
    }
  ];

  return (
    <>
      {/* Floating Bottom-Right Launcher */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center space-x-2.5 bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-950 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-400/40"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                {lang === 'mr' ? 'एआय सल्लागार' : lang === 'hi' ? 'एआई सलाहकार' : 'AI Reasoning'}
              </div>
              <div className="text-xs font-bold">
                {lang === 'mr' ? 'समर्थ एआय प्रश्नमंजूषा' : lang === 'hi' ? 'बैंकिंग शब्दावली पूछें' : 'Ask Financial Terms'}
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Modern Conversational Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[440px] max-h-[85vh] h-[640px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-slate-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold">
                    {lang === 'mr' ? 'समर्थ एआय आर्थिक सल्लागार' : lang === 'hi' ? 'समर्थ एआई वित्तीय सलाहकार' : 'Samarth AI Financial Advisor'}
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {lang === 'mr' ? 'तार्किक विश्लेषण व शासकीय योजना' : lang === 'hi' ? 'तार्किक परामर्श व सरकारी योजनाएं' : 'Logical Banking & Scheme Reasoning'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={() => setVoiceSpeechEnabled(!voiceSpeechEnabled)}
                className={`p-1.5 rounded-xl hover:bg-slate-800 transition-colors ${
                  voiceSpeechEnabled ? 'text-amber-300 bg-slate-800' : 'text-slate-400'
                }`}
                title={voiceSpeechEnabled ? 'Mute AI voice' : 'Enable voice read-aloud'}
              >
                {voiceSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMessages([{ id: 'welcome', sender: 'bot', text: getWelcomeMessage(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Questions Pills */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              {lang === 'mr' ? 'महत्वाचे प्रश्न:' : lang === 'hi' ? 'महत्वपूर्ण प्रश्न:' : 'Quick Questions:'}
            </span>
            {quickPills.map((pill, i) => {
              const pillText = lang === 'mr' ? pill.mr : lang === 'hi' ? pill.hi : pill.en;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(pillText)}
                  className="text-[11px] font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shadow-2xs shrink-0"
                >
                  {pillText}
                </button>
              );
            })}
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
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
                      className={`inline-block p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isBot
                          ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs'
                          : 'bg-blue-600 text-white shadow-xs rounded-tr-xs text-left'
                      }`}
                    >
                      <div className="space-y-2 whitespace-pre-line">
                        {msg.text.split('\n\n').map((para, pIdx) => {
                          const parts = para.split(/(\*\*.*?\*\*)/g);
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

                      {msg.cta && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <button
                            onClick={() => {
                              navigate(msg.cta.path);
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors"
                          >
                            <span>{msg.cta.label}</span>
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
                <span>
                  {lang === 'mr' ? 'तार्किक उत्तर तयार करत आहे...' : lang === 'hi' ? 'तार्किक उत्तर तैयार कर रहे हैं...' : 'Analyzing financial logic...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  lang === 'mr'
                    ? 'मोरेटोरियम, नफा, किंवा १०% भांडवल विचारा...'
                    : lang === 'hi'
                    ? 'मोरेटोरियम, मुनाफा, या 10% मार्जिन पूछें...'
                    : 'Ask about moratorium, profit, margin money...'
                }
                className="flex-grow px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all shadow-xs disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>{lang === 'mr' ? '१०% मार्जिन व मोरेटोरियम गणित' : lang === 'hi' ? '10% मार्जिन व मोरेटोरियम गणित' : 'MSME Concessional Credit Reasoning'}</span>
              <span className="font-semibold text-emerald-600">● 100% Free Advisory</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatbot;
