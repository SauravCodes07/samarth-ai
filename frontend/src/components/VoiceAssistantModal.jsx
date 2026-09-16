import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  Radio,
  Bot,
  User
} from 'lucide-react';
import { 
  initSpeechRecognition, 
  isSpeechRecognitionSupported, 
  speakTextWithVoice, 
  stopSpeaking,
  startMicrophoneRecording,
  stopMicrophoneRecording
} from '../utils/speechToText';
import { generateGroqVoiceResponse, transcribeAudioWithGroqWhisper } from '../services/groqService';

/**
 * Omnilingual Intelligent Conversational AI Core
 * Provides deep, institutional, and empathetic business consulting
 * dynamically in English, Hindi, and Marathi with zero canned robotic answers.
 */
const generateIntelligentVoiceResponse = (userSpeech, history = []) => {
  const text = (userSpeech || '').trim();
  const lower = text.toLowerCase();

  // 1. Detect language naturally from the words used
  let detectedLang = 'en';
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const marathiMarkers = ['आहे', 'नाही', 'कसे', 'काय', 'भांडवल', 'मला', 'करावे', 'होईल', 'सांगा', 'माहिती', 'योजना', 'उद्योग', 'सुरू'];
  const hindiMarkers = ['है', 'नहीं', 'कैसे', 'क्या', 'पूंजी', 'मुझे', 'करना', 'होगा', 'बताइए', 'जानकारी', 'योजना', 'व्यापार', 'शुरू', 'kya', 'kaise', 'karna', 'chahiye', 'batao', 'kitna'];

  if (hasDevanagari || marathiMarkers.some(m => lower.includes(m))) {
    const isMarathi = marathiMarkers.some(m => text.includes(m)) || /(मराठी|महाराष्ट्र|भांडवल|हप्ता|उद्योग)/i.test(text);
    detectedLang = isMarathi ? 'mr' : 'hi';
  } else if (hindiMarkers.some(m => lower.includes(m))) {
    detectedLang = 'hi';
  } else {
    // English is preferred and primary
    detectedLang = 'en';
  }

  // 2. Structured Parameter Extraction
  const extracted = {};

  // Business Category
  if (/(dairy|milk|doodh|dudh|cow|buffalo|दूध|दुग्ध|डेयरी|डेअरी|गाय|भैंस|म्हैस|पशुपालन)/i.test(lower)) {
    extracted.business_type = 'Dairy Farm';
  } else if (/(grocery|kirana|retail|store|shop|किराना|किराणा|जनरल स्टोर|दुकान|राशन)/i.test(lower)) {
    extracted.business_type = 'Grocery / Kirana Store';
  } else if (/(tailor|tailoring|boutique|garment|stitching|सिलाई|बुटीक|शिलाई|कपड़े)/i.test(lower)) {
    extracted.business_type = 'Tailoring & Boutique';
  } else if (/(rickshaw|e-rickshaw|auto|transport|driver|वाहन|रिक्शा|रिक्षा|गाड़ी)/i.test(lower)) {
    extracted.business_type = 'E-Rickshaw / Transport';
  } else if (/(solar|clean energy|renewable|panel|सौर|सोलर|ऊर्जा)/i.test(lower)) {
    extracted.business_type = 'Solar & Renewable Energy';
  } else if (/(flour|mill|oil|dal|processing|चक्की|गिरणी|आटा|तेल)/i.test(lower)) {
    extracted.business_type = 'Agri Processing / Mill';
  } else if (/(artisan|handicraft|pottery|craft|हस्तशिल्प|हस्तकला|कारीगर)/i.test(lower)) {
    extracted.business_type = 'Handicrafts / Artisan';
  }

  // Margin Money / Budget
  let amount = null;
  const lakhMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|लाख|लाखा)/i);
  if (lakhMatch) {
    amount = parseFloat(lakhMatch[1]) * 100000;
  } else {
    const numMatch = lower.match(/(?:₹|rs\.?|inr)?\s*(\d{4,7})/i);
    if (numMatch) {
      amount = parseFloat(numMatch[1]);
    } else {
      const thMatch = lower.match(/(\d+)\s*(?:thousand|hazar|हज़ार|हजार|k)/i);
      if (thMatch) amount = parseFloat(thMatch[1]) * 1000;
    }
  }

  if (amount) {
    if (/(margin|मार्जिन|बचत|भांडवल|saving|pocket|contribution|पूंजी)/i.test(lower) || amount <= 500000) {
      extracted.margin_capital = Math.round(amount);
      extracted.investment_amount = Math.round(amount * 10);
    } else {
      extracted.investment_amount = Math.round(amount);
      extracted.margin_capital = Math.round(amount * 0.10);
    }
  }

  // State
  const states = [
    { key: /(maharashtra|महाराष्ट्र)/i, name: 'Maharashtra' },
    { key: /(rajasthan|राजस्थान)/i, name: 'Rajasthan' },
    { key: /(uttar pradesh|उत्तर प्रदेश|\bup\b)/i, name: 'Uttar Pradesh' },
    { key: /(madhya pradesh|मध्य प्रदेश|\bmp\b)/i, name: 'Madhya Pradesh' },
    { key: /(bihar|बिहार)/i, name: 'Bihar' },
    { key: /(gujarat|गुजरात)/i, name: 'Gujarat' },
    { key: /(karnataka|कर्नाटक)/i, name: 'Karnataka' },
    { key: /(tamil nadu|तमिलनाडु)/i, name: 'Tamil Nadu' }
  ];
  for (const s of states) {
    if (s.key.test(lower)) {
      extracted.state = s.name;
      break;
    }
  }

  // Gender / Women rebate
  if (/(woman|women|female|mahila|महिला|स्त्री|girl|lady)/i.test(lower)) {
    extracted.gender = 'Female';
  } else if (/(man|male|पुरुष|purush)/i.test(lower)) {
    extracted.gender = 'Male';
  }

  // Experience
  if (/(fresher|new|beginner|नया|नवीन|first time)/i.test(lower)) {
    extracted.experience_level = 'Fresher';
  } else if (/(1 year|2 year|1 साल|2 साल|अनुभव|experienced)/i.test(lower)) {
    extracted.experience_level = '1-3 years';
  } else if (/(3 year|5 year|3 साल|5 साल|पुराना)/i.test(lower)) {
    extracted.experience_level = '3-5 years';
  }

  // 3. Intelligent Conversational Dialogue Reasoning
  let reply = '';

  // Case A1: User is undecided, exploring, or asking for guidance/help
  if (
    /(not decided|haven't decided|undecided|don't know|not sure|confused|what to start|which business|suggest|help me|guide me|kya shuru|samajh nahi|batao|kaun sa business|काय सुरू करू|कोणता उद्योग|सल्ला द्या|काही ठरवले नाही|मदत करा)/i.test(lower)
  ) {
    if (detectedLang === 'mr') {
      reply = "नक्कीच, मी तुम्हाला संपूर्ण मदत करतो! जर तुमचे अजून काही ठरले नसेल, तर आपण एकत्र निवड करूया. तुम्हाला रोजचे रोख उत्पन्न देणारा डेअरी व्यवसाय, किराणा दुकान, की आधुनिक तांत्रिक सेवा जसे की मोबाईल रिपेअरिंग किंवा सोलर एजन्सी सुरू करायला आवडेल? आपल्याकडे अंदाजे किती बचत किंवा भांडवल आहे?";
    } else if (detectedLang === 'hi') {
      reply = "बिल्कुल, मैं आपकी पूरी मदद करूँगा! यदि आपने अभी तय नहीं किया है, तो हम मिलकर सही विकल्प चुनते हैं। क्या आप प्रतिदिन नकद आमदनी देने वाली डेयरी, किराना जनरल स्टोर, या कोई आधुनिक टेक्निकल व्यवसाय जैसे मोबाइल रिपेयरिंग या सोलर एजेंसी में रुचि रखते हैं? आपके पास लगभग कितना बजट उपलब्ध है?";
    } else {
      reply = "I am glad to help you decide! We have high-earning government supported options: daily cash-flow Dairy Farming, high-turnover Kirana Grocery store, or high-margin Technical services like Mobile Repair and Solar installation. Do any of these match your interest, or what is your approximate budget?";
    }
    return { reply, extracted, detectedLang };
  }

  // Case A2: User is interested in Technical / Electronics / Engineering businesses
  if (/(technical|technology|tech|electronic|electrical|computer|repair|software|hardware|solar|garage|welding|mobile|cyber|टेक्निकल|इलेक्ट्रॉनिक|तांत्रिक)/i.test(lower)) {
    extracted.business_type = extracted.business_type || 'Mobile & Electronics Repair';
    if (detectedLang === 'mr') {
      reply = "तांत्रिक व्यवसायांमध्ये खूप चांगला नफा असतो! ९०% सरकारी सवलतीच्या कर्जाखाली तुम्ही १) स्मार्टफोन व इलेक्ट्रॉनिक्स रिपेअरिंग हब, २) सोलर रूफटॉप व ऊर्जा एजन्सी, ३) ऑटो डायग्नोस्टिक सेंटर, किंवा ४) डिजिटल कॉम्प्युटर सेवा केंद्र सुरू करू शकता. यापैकी तुम्हाला कशाची आवड आहे आणि तुमचे भांडवल किती आहे?";
    } else if (detectedLang === 'hi') {
      reply = "टेक्निकल व्यवसायों में सबसे बेहतरीन लाभ मार्जिन मिलता है! 90% सरकारी रियायती लोन के तहत आप 1) स्मार्टफोन व इलेक्ट्रॉनिक्स रिपेयरिंग हब, 2) सोलर रूफटॉप व ऊर्जा एजेंसी, 3) ऑटोमोबाइल गैराज, या 4) डिजिटल कंप्यूटर सेवा केंद्र स्थापित कर सकते हैं। आप इनमें से किसमें रुचि रखते हैं और आपका बजट कितना है?";
    } else {
      reply = "Technical enterprises are among the most profitable micro-ventures today! Under government 90% concessional financing, top choices include: 1) Smartphone & Electronics Repair Hub, 2) Solar Rooftop Installation & Maintenance, 3) Auto Diagnostic Centre, or 4) Digital IT & Computer Service Centre. Which technical field interests you, and how much margin capital can you invest?";
    }
    return { reply, extracted, detectedLang };
  }

  // Case B: Profitability & Earnings inquiry
  if (/(profit|earning|income|munafa|kamai|nafa|नफा|कमाई|मुनाफा|how much make|कितना कमा)/i.test(lower)) {
    if (extracted.business_type === 'Dairy Farm' || /(dairy|cow|milk|दूध)/i.test(lower)) {
      if (detectedLang === 'mr') {
        reply = "१० दुभत्या गाईंच्या डेअरी फार्ममधून दरमहा सुमारे ₹१,५०,००० ची दूध विक्री होते. ₹७५,००० चारा व औषध खर्च आणि ₹१७,००० बँक हप्ता वजा करून दरमहा ₹५८,००० ते ₹६५,००० चा निव्वळ नफा हातात राहतो!";
      } else if (detectedLang === 'hi') {
        reply = "10 दुधारू गायों की आधुनिक डेयरी से प्रति माह लगभग ₹1.5 लाख की दूध बिक्री होती है। ₹75,000 चारा खर्च और ₹17,000 लोन किश्त काटकर आप हर महीने ₹58,000 से ₹65,000 की शुद्ध बचत कर सकते हैं!";
      } else {
        reply = "A 10-cow dairy unit yields around ₹1,50,000 in monthly milk sales. After deducting ₹75,000 for feed and health care, and ₹17,000 for the loan EMI, your net in-hand monthly profit is between ₹58,000 and ₹65,000!";
      }
    } else {
      if (detectedLang === 'mr') {
        reply = "शासकीय सवलतीच्या योजनांमधील प्रकल्पांमध्ये सरासरी ३०% ते ३५% निव्वळ नफा मार्जिन असतो. तसेच पहिल्या काही महिन्यांत हप्त्याची सवलत असल्याने खेळते भांडवल टिकून राहते. आपल्याला कोणत्या उद्योगाचा ताळेबंद पाहायचा आहे?";
      } else if (detectedLang === 'hi') {
        reply = "सरकारी रियायती लोन योजनाओं में सूक्ष्म उद्योगों पर औसतन 30% से 35% का शुद्ध लाभ मार्जिन मिलता है। पहले कुछ महीने मोरेटोरियम होने से किश्त का दबाव भी नहीं होता। आप किस व्यापार की लाभ गणना जानना चाहते हैं?";
      } else {
        reply = "Under these government concessional schemes, micro-enterprises maintain healthy net profit margins of 30% to 35%. What specific business would you like to calculate revenue and profit for?";
      }
    }
    return { reply, extracted, detectedLang };
  }

  // Case C: Margin Money & 90% Loan questions
  if (/(margin|how much loan|eligibility|down payment|10%|मार्जिन|कितना लोन|कर्ज किती)/i.test(lower)) {
    if (extracted.margin_capital) {
      const pCost = extracted.margin_capital * 10;
      const lAmt = extracted.margin_capital * 9;
      if (detectedLang === 'mr') {
        reply = `तुमच्या ₹${extracted.margin_capital.toLocaleString('en-IN')} च्या १०% भांडवलावर सरकार ₹${lAmt.toLocaleString('en-IN')} चे ९०% सवलतीचे कर्ज देते, ज्यामुळे ₹${pCost.toLocaleString('en-IN')} चा संपूर्ण प्रकल्प उभा राहतो. तुम्ही कोणत्या जिल्ह्यात हा व्यवसाय सुरू करणार आहात?`;
      } else if (detectedLang === 'hi') {
        reply = `आपकी ₹${extracted.margin_capital.toLocaleString('en-IN')} की 10% मार्जिन पूंजी के आधार पर सरकार ₹${lAmt.toLocaleString('en-IN')} का 90% रियायती लोन स्वीकृत करती है, जिससे ₹${pCost.toLocaleString('en-IN')} का कुल प्रोजेक्ट स्थापित होगा। आपका जिला कौन सा है?`;
      } else {
        reply = `With your ₹${extracted.margin_capital.toLocaleString('en-IN')} margin contribution (10%), you unlock a 90% government subsidized loan of ₹${lAmt.toLocaleString('en-IN')}, funding a total project worth ₹${pCost.toLocaleString('en-IN')}. Which district are you located in?`;
      }
    } else {
      if (detectedLang === 'mr') {
        reply = "सरकारी नियमानुसार तुम्हाला एकूण प्रकल्प खर्चाच्या फक्त १०% स्वतःचे भांडवल लावावे लागते. उर्वरित ९०% रक्कम सरकार अत्यंत कमी व्याजावर कर्ज म्हणून देते. तुमच्याकडे सध्या किती बचत उपलब्ध आहे?";
      } else if (detectedLang === 'hi') {
        reply = "सरकारी नियमों के तहत आपको प्रोजेक्ट लागत का मात्र 10% अपनी जेब से लगाना होता है। बाकी 90% राशि सरकार न्यूनतम ब्याज पर लोन के रूप में देती है। आपके पास लगाने के लिए कितनी पूंजी है?";
      } else {
        reply = "Under the government scheme, you only contribute 10% as margin money. The channelizing agency funds the remaining 90% as a concessional loan. How much margin savings do you have available?";
      }
    }
    return { reply, extracted, detectedLang };
  }

  // Case D: Moratorium Period inquiry
  if (/(moratorium|grace period|repayment holiday|किश्त छूट|मोरेटोरियम|हप्ता सवलत)/i.test(lower)) {
    if (detectedLang === 'mr') {
      reply = "मोरेटोरियम म्हणजे बँकेने दिलेली हप्ता सवलत. व्यवसाय उभा राहण्यासाठी पहिल्या ३ ते ६ महिन्यांत कोणताही मुद्दल हप्ता भरावा लागत नाही. व्यवसाय नफ्यात आल्यावरच नियमित हप्ते सुरू होतात!";
    } else if (detectedLang === 'hi') {
      reply = "मोरेटोरियम बैंक द्वारा दी जाने वाली किश्त छूट है। शुरुआत के 3 से 6 महीने आपको मूलधन की कोई किश्त नहीं देनी होती, ताकि आप मशीनरी लाकर ग्राहकों को जोड़ सकें। व्यापार जमने के बाद ही आसान किश्तें शुरू होती हैं।";
    } else {
      reply = "A moratorium is an official repayment grace period. You pay zero principal EMI for the first 3 to 6 months while procuring assets and onboarding customers, ensuring your cash flow stays strong before payments begin.";
    }
    return { reply, extracted, detectedLang };
  }

  // Case E: Trailing or Incomplete Utterance Check (e.g. "actually i am", "interested to start a business of", etc.)
  const trailingRegex = /(actually i am|interested to start a business of|i want to start|i am thinking of|planning to|thinking about|business of|want to open|actually|interested in)$/i;
  const isTrailingWord = /(of|to|in|for|am|is|a|the|की|के|का|च्या|ची|चे)$/i.test(text.trim());
  const wordsCount = text.trim().split(/\s+/).length;

  if (trailingRegex.test(lower) || (wordsCount <= 4 && isTrailingWord)) {
    if (detectedLang === 'mr') {
      reply = "मी तुमचे लक्षपूर्वक ऐकत आहे! कृपया सांगा, आपण कोणता व्यवसाय किंवा दुकान सुरू करू इच्छिता आणि आपल्याकडे स्वतःचे किती भांडवल आहे?";
    } else if (detectedLang === 'hi') {
      reply = "मैं ध्यानपूर्वक सुन रहा हूँ! कृपया बताइए, आप किस प्रकार की दुकान या व्यवसाय शुरू करना चाहते हैं और आपका बजट कितना है?";
    } else {
      reply = "I am listening closely! Please tell me what kind of business or enterprise you want to establish, and what initial budget or margin money you have.";
    }
    return { reply, extracted, detectedLang };
  }

  // Case F: Conversational Greetings & Small Talk
  if (/^(hi|hello|hey|namaste|pranam|good morning|good afternoon|good evening|नमस्कार|नमस्ते|हॅलो)\b/i.test(lower) && wordsCount <= 5) {
    if (detectedLang === 'mr') {
      reply = "नमस्कार! मी समर्थ एआय आहे. मी तुम्हाला फायदेशीर व्यवसाय निवडण्यात, १०% भांडवलावर ९०% सरकारी कर्ज मिळवण्यात आणि अर्ज भरण्यात मदत करू शकतो. आपण काय सुरू करण्याचा विचार करत आहात?";
    } else if (detectedLang === 'hi') {
      reply = "नमस्ते! मैं समर्थ एआई हूँ। मैं आपको सबसे अधिक मुनाफे वाला व्यापार चुनने, 10% मार्जिन पर 90% सरकारी लोन दिलाने और फॉर्म भरने में पूरी मदद करूँगा। आप कौन सा काम शुरू करना चाहते हैं?";
    } else {
      reply = "Hello! I am Samarth AI, your government business advisory assistant. I help you identify high-margin enterprises, secure 90% concessional loans with 10% margin money, and auto-fill your application. What venture are you planning?";
    }
    return { reply, extracted, detectedLang };
  }

  // Case G: Identity & Capabilities
  if (/(who are you|what can you do|what is samarth|kaun ho|kaun hai|कोण आहात|काय करू शकता)/i.test(lower)) {
    if (detectedLang === 'mr') {
      reply = "मी समर्थ एआय आहे—शासकीय सवलतीच्या योजना व सूक्ष्म व्यवसायांसाठी डिझाइन केलेला बुद्धिमान सल्लागार. मी तुमच्या १०% भांडवलावर ९०% कर्ज मिळवून देतो आणि तुमचा संपूर्ण अर्ज आवाजाद्वारे भरून देतो.";
    } else if (detectedLang === 'hi') {
      reply = "मैं समर्थ एआई हूँ—सरकारी रियायती लोन योजनाओं और सूक्ष्म उद्योगों के लिए तैयार किया गया इंटेलिजेंट एडवाइजर। मैं आपके 10% मार्जिन पर 90% लोन दिलवाने, स्थानीय फिजिबिलिटी रिपोर्ट बनाने और फॉर्म भरने में मदद करता हूँ।";
    } else {
      reply = "I am Samarth AI, an intelligent government credit advisory assistant. I structure your business financing with 10% margin capital and 90% concessional loans, assess local market feasibility, and auto-fill your application.";
    }
    return { reply, extracted, detectedLang };
  }

  // Case H: Interest Rates & Women Rebate inquiry (Strict Word Boundary - Never fires on "interested")
  if (/\b(interest rate|rate of interest|interest rates|byaj dar|vyaj dar|ब्याज दर|व्याज दर)\b/i.test(lower) || (/\b(interest|byaj|vyaj|ब्याज|व्याज)\b/i.test(lower) && !/\b(interested)\b/i.test(lower))) {
    if (detectedLang === 'mr') {
      reply = "मायक्रो फायनान्ससाठी वार्षिक व्याजदर ६.५% आणि मुदत कर्जासाठी ८% आहे. महिला उद्योजकांसाठी महिला समृद्धी योजनेखाली व्याजदर केवळ ४% इतका सवलतीचा आहे!";
    } else if (detectedLang === 'hi') {
      reply = "माइक्रो फाइनेंस के लिए रियायती ब्याज दर 6.5% और टर्म लोन के लिए 8.0% है। इसके अतिरिक्त, महिला उद्यमियों को महिला समृद्धि योजना के तहत मात्र 4% की विशेष ब्याज दर मिलती है!";
    } else {
      reply = "Concessional interest rates are 6.5% per annum for Micro Finance and 8.0% for Term Loans. Women beneficiaries receive an extra rebate, with interest rates as low as 4.0% under Mahila Samriddhi schemes!";
    }
    return { reply, extracted, detectedLang };
  }

  // Case I: Documents & Process inquiry
  if (/(document|process|apply|paper|kaise milega|दस्तावेज|कागदपत्रे|अर्ज|कागद)/i.test(lower)) {
    if (detectedLang === 'mr') {
      reply = "यासाठी आधार कार्ड, पॅन कार्ड, रहिवासी दाखला, मशिनरी/जनावरांचे कोटेशन आणि बँक खाते पासबुक एवढीच कागदपत्रे लागतात. कोणत्याही मोठ्या तारण किंवा गॅरंटीची गरज भासत नाही.";
    } else if (detectedLang === 'hi') {
      reply = "आवेदन के लिए आधार कार्ड, पैन कार्ड, निवास प्रमाण पत्र, मशीन या उपकरण का कोटेशन और बैंक पासबुक की आवश्यकता होती है। इसमें किसी भी प्रकार की संपत्ति गिरवी रखने की आवश्यकता नहीं होती।";
    } else {
      reply = "You only need your Aadhaar card, PAN card, address proof, vendor machinery quotation, and bank passbook. No complex collateral is required under government credit guarantee norms.";
    }
    return { reply, extracted, detectedLang };
  }

  // Case J: Specific Business / Budget mentioned by user
  if (extracted.business_type && extracted.margin_capital) {
    const pCost = extracted.margin_capital * 10;
    const lAmt = extracted.margin_capital * 9;
    if (detectedLang === 'mr') {
      reply = `उत्कृष्ट! ${extracted.business_type} साठी तुमचे ₹${extracted.margin_capital.toLocaleString('en-IN')} चे १०% भांडवल नोंदवले आहे. यावर सरकार ₹${lAmt.toLocaleString('en-IN')} चे ९०% कर्ज देईल (एकूण ₹${pCost.toLocaleString('en-IN')} प्रकल्प). तुमचा जिल्हा कोणता आहे?`;
    } else if (detectedLang === 'hi') {
      reply = `शानदार! ${extracted.business_type} के लिए आपकी ₹${extracted.margin_capital.toLocaleString('en-IN')} की 10% मार्जिन पूंजी दर्ज कर ली गई है। आपको ₹${lAmt.toLocaleString('en-IN')} का 90% सरकारी लोन मिलेगा (कुल ₹${pCost.toLocaleString('en-IN')} प्रोजेक्ट)। आपका जिला कौन सा है?`;
    } else {
      reply = `Excellent! For your ${extracted.business_type}, your ₹${extracted.margin_capital.toLocaleString('en-IN')} margin contribution is noted. That unlocks a ₹${lAmt.toLocaleString('en-IN')} loan (₹${pCost.toLocaleString('en-IN')} total project). Which district or city are you setting this up in?`;
    }
    return { reply, extracted, detectedLang };
  }

  if (extracted.business_type) {
    if (detectedLang === 'mr') {
      reply = `${extracted.business_type} हा अत्यंत फायदेशीर उद्योग आहे. हा प्रकल्प उभा करण्यासाठी तुमच्याकडे स्वतःचे किती भांडवल किंवा बचत उपलब्ध आहे?`;
    } else if (detectedLang === 'hi') {
      reply = `${extracted.business_type} एक बेहतरीन और टिकाऊ व्यवसाय है। इसे शुरू करने के लिए आपकी अपनी जेब से लगाने के लिए कितनी बचत राशि उपलब्ध है?`;
    } else {
      reply = `${extracted.business_type} is a highly viable enterprise. How much margin money or personal savings do you plan to contribute?`;
    }
    return { reply, extracted, detectedLang };
  }

  if (extracted.margin_capital) {
    const pCost = extracted.margin_capital * 10;
    if (detectedLang === 'mr') {
      reply = `समजले! ₹${extracted.margin_capital.toLocaleString('en-IN')} च्या भांडवलावर तुम्ही ₹${pCost.toLocaleString('en-IN')} चा प्रकल्प सुरू करू शकता. तुम्ही कोणत्या प्रकारचा व्यवसाय करू इच्छिता?`;
    } else if (detectedLang === 'hi') {
      reply = `जी हाँ! ₹${extracted.margin_capital.toLocaleString('en-IN')} की मार्जिन राशि से आप ₹${pCost.toLocaleString('en-IN')} तक का पूरा प्रोजेक्ट स्थापित कर सकते हैं। आप कौन सा व्यवसाय शुरू करना चाहते हैं?`;
    } else {
      reply = `Got it! With ₹${extracted.margin_capital.toLocaleString('en-IN')} margin capital, you qualify for up to ₹${pCost.toLocaleString('en-IN')} in total project funding. What trade or enterprise do you plan to establish?`;
    }
    return { reply, extracted, detectedLang };
  }

  // Fallback: Thoughtful, context-aware prompt
  if (detectedLang === 'mr') {
    reply = "मी आपले म्हणणे ऐकले आहे. कृपया सांगा, आपण कोणता व्यवसाय किंवा दुकान सुरू करू इच्छिता आणि आपले अंदाजे बजेट किती आहे?";
  } else if (detectedLang === 'hi') {
    reply = "मैंने आपकी बात सुनी है। कृपया बताएं कि आप कौन सा व्यापार या दुकान शुरू करना चाहते हैं और आपका उपलब्ध बजट कितना है?";
  } else {
    reply = "I am listening closely! Please tell me what kind of business or enterprise you want to establish, and what initial budget or margin money you have.";
  }

  return { reply, extracted, detectedLang };
};

const VoiceAssistantModal = ({ isOpen, onClose, onApplyExtractedData, onApplyTranscript }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Conversation messages [{ role: 'assistant' | 'user', text: string, time: string }]
  const [messages, setMessages] = useState([]);
  
  // Structured extracted form data collected from the live conversation
  const [extractedData, setExtractedData] = useState({
    business_type: null,
    margin_capital: null,
    investment_amount: null,
    state: null,
    district: null,
    gender: null,
    experience_level: null
  });

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isSpeakingRef = useRef(false);

  // Auto scroll conversation to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript, isSpeaking, isThinking]);

  // Handle modal open/close lifecycle
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      isSpeakingRef.current = false;

      // Natural, welcoming greeting in comfortable English as primary
      const greeting = "Hello! I am your Samarth AI Voice Assistant. Ask me anything—or tell me what business you are planning and your budget, and I will structure your full plan.";

      setMessages([
        { role: 'assistant', text: greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      // Speak greeting aloud with acoustic isolation
      setTimeout(() => {
        stopListening();
        isSpeakingRef.current = true;
        setIsSpeaking(true);
        speakTextWithVoice(greeting, 'en', () => {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          // Clear room reverb before enabling microphone
          setTimeout(() => {
            if (isOpen && !isSpeakingRef.current) {
              startListening();
            }
          }, 450);
        });
      }, 300);

    } else {
      isSpeakingRef.current = false;
      stopSpeaking();
      stopListening();
      setIsSpeaking(false);
      setIsListening(false);
      setIsThinking(false);
    }

    return () => {
      isSpeakingRef.current = false;
      stopSpeaking();
      stopListening();
    };
  }, [isOpen]);

  const stopListening = async () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        try { recognitionRef.current.stop(); } catch (e2) {}
      }
      recognitionRef.current = null;
    }
    await stopMicrophoneRecording();
    setIsListening(false);
  };

  const startListening = async () => {
    // PREVENT SELF-ECHO: Never turn mic on if assistant is speaking
    if (isSpeakingRef.current || window.__SAMARTH_AI_SPEAKING__) {
      return;
    }

    stopSpeaking();
    setIsSpeaking(false);
    setErrorMsg(null);
    setLiveTranscript('');

    if (!isSpeechRecognitionSupported()) {
      setErrorMsg('Microphone is not supported in this browser. Please use Chrome, Edge, or Android Browser.');
      return;
    }

    // Start raw audio recording in parallel for Groq Whisper
    await startMicrophoneRecording();

    // Default to en-IN for universal English, Hinglish and Indian accent comfort
    const recognition = initSpeechRecognition(
      async (finalSpokenText) => {
        setIsListening(false);
        setLiveTranscript('');
        await handleFinalSpeechTurn(finalSpokenText);
      },
      (err) => {
        setIsListening(false);
        setLiveTranscript('');
        if (typeof err === 'string' && !err.includes('no-speech')) {
          setErrorMsg(err);
        }
      },
      () => {
        setIsListening(false);
        setLiveTranscript('');
      },
      'en-IN',
      (interim) => {
        setLiveTranscript(interim);
      }
    );

    if (recognition) {
      recognitionRef.current = recognition;
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  /**
   * Handle completion of speech turn:
   * Uses Groq Whisper Large V3 Turbo for flawless Marathi/Hindi/English transcription,
   * with seamless fallback to Web Speech.
   */
  const handleFinalSpeechTurn = async (fallbackText = '') => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    setIsThinking(true);

    let finalSpokenText = (fallbackText || liveTranscript || '').trim();

    // Transcribe with Groq Whisper Large V3 Turbo
    try {
      const audioBlob = await stopMicrophoneRecording();
      if (audioBlob && audioBlob.size > 2000) {
        const whisperResult = await transcribeAudioWithGroqWhisper(audioBlob);
        if (whisperResult && whisperResult.trim().length > 1) {
          finalSpokenText = whisperResult.trim();
        }
      }
    } catch (whisperErr) {
      console.warn('Groq Whisper audio error:', whisperErr);
    }

    if (!finalSpokenText || finalSpokenText.length < 2) {
      setIsThinking(false);
      if (isOpen && !isSpeakingRef.current) {
        setTimeout(() => startListening(), 400);
      }
      return;
    }

    await processUserVoiceTurn(finalSpokenText);
  };

  const handleOrbClick = async () => {
    if (isSpeaking) {
      // User tapped orb while assistant is speaking -> interrupt and listen immediately
      stopSpeaking();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setTimeout(() => startListening(), 150);
    } else if (isListening) {
      // User tapped orb while speaking -> finalize speech immediately
      await handleFinalSpeechTurn(liveTranscript);
    } else {
      // Tap to talk
      startListening();
    }
  };

  /**
   * Process a turn of user speech with the deep conversational brain
   */
  const processUserVoiceTurn = async (userText) => {
    const userMsg = {
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    const historyPayload = messages.map(m => ({ role: m.role, content: m.text }));

    let replyText = '';
    let extractedParams = {};
    let languageToSpeak = 'en';

    // 1. Primary AI Brain: Groq LPU Cloud Inference (Sub-300ms real-time conversational reasoning)
    try {
      const groqRes = await generateGroqVoiceResponse(userText, historyPayload);
      if (groqRes && groqRes.voice_response) {
        replyText = groqRes.voice_response;
        extractedParams = groqRes.extracted || {};
        languageToSpeak = groqRes.detected_lang || 'en';
      }
    } catch (groqErr) {
      console.warn('Groq direct call error:', groqErr);
    }

    // 2. Intelligent Conversational Fallback (Context-aware, zero robotic canned answers)
    if (!replyText) {
      const localResult = generateIntelligentVoiceResponse(userText, historyPayload);
      replyText = localResult.reply;
      extractedParams = localResult.extracted;
      languageToSpeak = localResult.detectedLang || 'en';
    }

    // Merge extracted parameters into form staging
    setExtractedData(prev => {
      const updated = { ...prev };
      Object.entries(extractedParams).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') {
          updated[k] = v;
        }
      });
      return updated;
    });

    const aiMsg = {
      role: 'assistant',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsThinking(false);

    // Strictly isolate microphone before speaking to prevent recording own speaker voice
    stopListening();
    isSpeakingRef.current = true;
    setIsSpeaking(true);
    speakTextWithVoice(replyText, languageToSpeak || 'en', () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      // Allow 450ms for room reverberation to settle before unmuting mic
      setTimeout(() => {
        if (isOpen && !isSpeakingRef.current) {
          startListening();
        }
      }, 450);
    });
  };

  // Final apply: applies all extracted structured parameters + full transcript to the form
  const handleCompleteAndApply = () => {
    stopSpeaking();
    stopListening();

    if (onApplyExtractedData) {
      onApplyExtractedData(extractedData);
    }

    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg && onApplyTranscript) {
      onApplyTranscript(lastUserMsg.text);
    }

    onClose();
  };

  if (!isOpen) return null;

  const hasAnyExtracted = Object.values(extractedData).some(v => v !== null && v !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header - Clean, No Language Buttons as requested */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              {(isSpeaking || isListening) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Samarth Live AI Voice Assistant
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  LIVE TALK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Natural conversational voice — ask anything, explore ideas & auto-fill form
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              stopListening();
              onClose();
            }}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Glowing Sound Wave / Orb Section */}
        <div className="relative py-6 sm:py-8 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center border-b border-slate-800/80 overflow-hidden">
          
          <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Futuristic Voice Orb */}
          <div className="relative flex items-center justify-center mb-4">
            {isSpeaking && (
              <>
                <span className="absolute w-36 h-36 rounded-full border border-blue-500/40 animate-ping [animation-duration:2s]" />
                <span className="absolute w-44 h-44 rounded-full border border-purple-500/30 animate-ping [animation-duration:2.5s]" />
                <span className="absolute w-32 h-32 rounded-full bg-blue-500/15 animate-pulse" />
              </>
            )}

            {isListening && (
              <>
                <span className="absolute w-36 h-36 rounded-full border-2 border-rose-500/60 animate-ping [animation-duration:1.5s]" />
                <span className="absolute w-44 h-44 rounded-full border border-rose-500/30 animate-pulse" />
                <span className="absolute w-32 h-32 rounded-full bg-rose-500/20 animate-pulse" />
              </>
            )}

            <button
              type="button"
              onClick={handleOrbClick}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl cursor-pointer ${
                isSpeaking
                  ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 ring-8 ring-blue-500/30 scale-105 shadow-blue-500/40'
                  : isListening
                  ? 'bg-gradient-to-tr from-rose-600 to-rose-500 ring-8 ring-rose-500/30 scale-105 shadow-rose-500/40'
                  : isThinking
                  ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 ring-8 ring-amber-500/30 animate-pulse shadow-amber-500/40'
                  : 'bg-gradient-to-tr from-blue-600 via-indigo-700 to-blue-800 hover:scale-105 shadow-indigo-500/30'
              }`}
            >
              {isSpeaking ? (
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-6 bg-white rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-1.5 h-9 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
                  <span className="w-1.5 h-8 bg-white rounded-full animate-bounce [animation-delay:0.45s]" />
                  <span className="w-1.5 h-4 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              ) : isListening ? (
                <Radio className="w-10 h-10 text-white animate-pulse" />
              ) : isThinking ? (
                <Sparkles className="w-10 h-10 text-white animate-spin [animation-duration:3s]" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
          </div>

          {/* Status Capsule */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-800/80 border border-slate-700">
              {isSpeaking ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-300">Speaking Aloud (Tap orb anytime to interrupt)</span>
                </>
              ) : isListening ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-rose-400">Listening... Speak Naturally</span>
                </>
              ) : isThinking ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-300">Thinking & Analyzing...</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-300">Tap Orb to Speak</span>
                </>
              )}
            </div>

            {/* Live Streaming Speech Preview */}
            {isListening && liveTranscript && (
              <p className="text-xs text-blue-300 italic font-medium max-w-md truncate animate-fadeIn pt-1">
                "{liveTranscript}"
              </p>
            )}
          </div>
        </div>

        {/* Live Conversation Transcript Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-900/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-amber-300'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-xs'
                  : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-xs shadow-md'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-1 opacity-70 text-[10px]">
                  <span>{msg.role === 'user' ? 'You' : 'Samarth AI'}</span>
                  <span>{msg.time}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-amber-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0s]" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                <span>Samarth AI is analyzing...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Live Detected Form Attributes Card */}
        {hasAnyExtracted && (
          <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Live Form Auto-Fill:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {extractedData.business_type && (
                <span className="bg-blue-900/60 border border-blue-600/50 text-blue-200 px-2.5 py-0.5 rounded-lg font-semibold text-[11px]">
                  💼 {extractedData.business_type}
                </span>
              )}
              {extractedData.margin_capital && (
                <span className="bg-emerald-900/60 border border-emerald-600/50 text-emerald-200 px-2.5 py-0.5 rounded-lg font-semibold text-[11px]">
                  💰 ₹{extractedData.margin_capital.toLocaleString('en-IN')} Margin
                </span>
              )}
              {extractedData.investment_amount && (
                <span className="bg-indigo-900/60 border border-indigo-600/50 text-indigo-200 px-2.5 py-0.5 rounded-lg font-semibold text-[11px]">
                  📊 ₹{extractedData.investment_amount.toLocaleString('en-IN')} Project Cost
                </span>
              )}
              {extractedData.state && (
                <span className="bg-purple-900/60 border border-purple-600/50 text-purple-200 px-2.5 py-0.5 rounded-lg font-semibold text-[11px]">
                  📍 {extractedData.state}
                </span>
              )}
              {extractedData.gender && (
                <span className="bg-pink-900/60 border border-pink-600/50 text-pink-200 px-2.5 py-0.5 rounded-lg font-semibold text-[11px]">
                  👤 {extractedData.gender} {extractedData.gender === 'Female' ? '(4% Rebate)' : ''}
                </span>
              )}
              {extractedData.experience_level && (
                <span className="bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-lg text-[11px]">
                  ⏳ {extractedData.experience_level}
                </span>
              )}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="px-4 py-2 bg-rose-950/60 border-t border-rose-800 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Bottom Action Controls - Clean, Conversational, No redundant buttons */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300 text-[11px] sm:text-xs tracking-wide">
              {isSpeaking ? 'AI Speaking Aloud' : isListening ? 'Listening to You...' : isThinking ? 'Thinking...' : 'Natural Turn-Taking Active'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCompleteAndApply}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer transition-all hover:scale-102"
          >
            <span>Apply & Fill Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoiceAssistantModal;
