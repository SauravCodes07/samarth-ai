import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  Radio,
  RotateCcw,
  Bot,
  User,
  Check
} from 'lucide-react';
import { 
  initSpeechRecognition, 
  isSpeechRecognitionSupported, 
  speakTextWithVoice, 
  stopSpeaking,
  getLocaleForLang
} from '../utils/speechToText';
import { sendVoiceChatMessage } from '../services/api';

const VoiceAssistantModal = ({ isOpen, onClose, onApplyExtractedData, onApplyTranscript }) => {
  const { lang, setLang } = useLanguage();
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
  const hasSpokenGreeting = useRef(false);

  // Auto scroll conversation to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript, isSpeaking, isThinking]);

  // Handle modal open/close lifecycle
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      hasSpokenGreeting.current = false;

      // Greeting based on language
      let greeting = "Hello! I am your Samarth AI Voice Assistant. What business would you like to start, and what is your margin money or budget?";
      if (lang === 'mr') {
        greeting = "नमस्कार! मी आपला समर्थ एआय व्हॉईस असिस्टंट आहे. आपण कोणता उद्योग सुरू करू इच्छिता आणि आपल्याकडे किती स्वतःचे भांडवल आहे?";
      } else if (lang === 'hi') {
        greeting = "नमस्ते! मैं आपका समर्थ एआई वॉइस असिस्टेंट हूँ। आप कौन सा व्यवसाय शुरू करना चाहते हैं और आपकी मार्जिन पूंजी या बजट कितना है?";
      }

      setMessages([
        { role: 'assistant', text: greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      // Speak greeting aloud
      setTimeout(() => {
        setIsSpeaking(true);
        speakTextWithVoice(greeting, lang, () => {
          setIsSpeaking(false);
          // After greeting ends, automatically start listening for seamless voice interaction
          startListening();
        });
      }, 350);

    } else {
      stopSpeaking();
      stopListening();
      setIsSpeaking(false);
      setIsListening(false);
      setIsThinking(false);
    }

    return () => {
      stopSpeaking();
      stopListening();
    };
  }, [isOpen]);

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const startListening = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setErrorMsg(null);
    setLiveTranscript('');

    if (!isSpeechRecognitionSupported()) {
      setErrorMsg(
        lang === 'mr'
          ? 'तुमच्या ब्राउझरमध्ये थेट मायक्रोफोन उपलब्ध नाही. कृपया Google Chrome वापरा किंवा खालील जलद आवाजी पर्यायांवर क्लिक करा.'
          : lang === 'hi'
          ? 'ब्राउज़र में सीधे माइक्रोफोन सपोर्ट नहीं मिला। कृपया Google Chrome उपयोग करें या नीचे दिए गए विकल्प पर टैप करें।'
          : 'Live microphone is restricted in this browser. Please use Chrome or tap any quick voice query below.'
      );
      return;
    }

    const locale = getLocaleForLang(lang);
    const recognition = initSpeechRecognition(
      async (finalSpokenText) => {
        setIsListening(false);
        setLiveTranscript('');
        if (finalSpokenText && finalSpokenText.trim()) {
          await processUserVoiceTurn(finalSpokenText.trim());
        }
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
      locale,
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
   * Process a turn of user speech:
   * 1. Add user message to history
   * 2. Send to AI chat backend/engine
   * 3. Speak the AI's response aloud
   * 4. Auto-update extracted parameters for the form
   * 5. Automatically resume listening for the next conversational turn
   */
  const processUserVoiceTurn = async (userText) => {
    // 1. Add user message
    const userMsg = {
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      // 2. Query conversational intelligence
      const historyPayload = messages.map(m => ({ role: m.role, content: m.text }));
      const result = await sendVoiceChatMessage(userText, lang, historyPayload);

      const aiReply = result.voice_response || result.display_response || "Understood! Let us continue.";
      const newExtracted = result.extracted_data || {};

      // Merge extracted parameters
      setExtractedData(prev => {
        const updated = { ...prev };
        Object.entries(newExtracted).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== '') {
            updated[k] = v;
          }
        });
        return updated;
      });

      // 3. Add AI message
      const aiMsg = {
        role: 'assistant',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);

      // 4. Speak aloud lively
      setIsSpeaking(true);
      speakTextWithVoice(aiReply, lang, () => {
        setIsSpeaking(false);
        // Seamlessly listen again for continuous conversation
        setTimeout(() => {
          if (isOpen) {
            startListening();
          }
        }, 500);
      });

    } catch (err) {
      setIsThinking(false);
      console.warn('Voice turn processing error:', err);
    }
  };

  // One-tap quick presets to speak or simulate voice
  const quickVoiceSamples = [
    {
      label: lang === 'mr' ? 'डेअरी फार्म (१ लाख भांडवल)' : lang === 'hi' ? 'डेयरी फार्म (1 लाख पूंजी)' : 'Dairy Farm (₹1 Lakh margin)',
      text: lang === 'mr' ? 'मला १ लाख रुपयांच्या भांडवलावर महाराष्ट्रात डेअरी फार्म सुरू करायचा आहे' : lang === 'hi' ? 'मेरे पास 1 लाख रुपये हैं, मुझे राजस्थान में डेयरी फार्म शुरू करना है' : 'I have 1 Lakh margin money, want to start a Dairy Farm'
    },
    {
      label: lang === 'mr' ? 'किराणा दुकान (५०,००० बचत)' : lang === 'hi' ? 'किराना स्टोर (50,000 बचत)' : 'Kirana Store (₹50,000 savings)',
      text: lang === 'mr' ? 'माझ्याकडे ५०,००० रुपये बचत आहे, मला किराणा दुकान सुरू करायचे आहे' : lang === 'hi' ? 'मेरे पास 50000 रुपये बचत है, मुझे किराना स्टोर शुरू करना है' : 'I have 50000 rupees margin money, want to start a grocery kirana shop'
    },
    {
      label: lang === 'mr' ? 'महिला शिलाई बुटीक (४% व्याज)' : lang === 'hi' ? 'महिला सिलाई बुटीक (4% ब्याज छूट)' : 'Tailoring Boutique (4% rate)',
      text: lang === 'mr' ? 'मी महिला उद्योजक आहे, शिलाई बुटीकसाठी २०,००० भांडवलावर कर्ज हवे आहे' : lang === 'hi' ? 'मैं एक महिला उद्यमी हूँ, मुझे सिलाई बुटीक के लिए 20000 रुपये में लोन चाहिए' : 'I am a woman entrepreneur looking for tailoring boutique loan with 20000 margin'
    }
  ];

  // Final apply: applies all extracted structured parameters + full transcript to the form
  const handleCompleteAndApply = () => {
    stopSpeaking();
    stopListening();

    // Call extracted data updater
    if (onApplyExtractedData) {
      onApplyExtractedData(extractedData);
    }

    // Call transcript updater if provided as backup
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
        
        {/* Header with Live Status & Language Switcher */}
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
                  {lang === 'mr' ? 'समर्थ थेट एआय व्हॉईस असिस्टंट' : lang === 'hi' ? 'समर्थ लाइव एआई वॉइस असिस्टेंट' : 'Samarth Live AI Voice Assistant'}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'mr' ? 'थेट बोला — एआय उत्तर देईल व अर्ज भरेल' : lang === 'hi' ? 'बोलकर बात करें — एआई जवाब देगा और फॉर्म भरेगा' : 'Talk lively — AI answers in voice & auto-selects form'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Language Toggle */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg text-xs font-bold border border-slate-700">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                हि
              </button>
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`px-2 py-0.5 rounded ${lang === 'mr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                म
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Glowing Sound Wave / Orb Section */}
        <div className="relative py-6 sm:py-8 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center border-b border-slate-800/80 overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Futuristic Voice Orb */}
          <div className="relative flex items-center justify-center mb-4">
            
            {/* Ripple rings when AI is speaking */}
            {isSpeaking && (
              <>
                <span className="absolute w-36 h-36 rounded-full border border-blue-500/40 animate-ping [animation-duration:2s]" />
                <span className="absolute w-44 h-44 rounded-full border border-purple-500/30 animate-ping [animation-duration:2.5s]" />
                <span className="absolute w-32 h-32 rounded-full bg-blue-500/15 animate-pulse" />
              </>
            )}

            {/* Ripple rings when user is speaking / listening */}
            {isListening && (
              <>
                <span className="absolute w-36 h-36 rounded-full border-2 border-rose-500/60 animate-ping [animation-duration:1.5s]" />
                <span className="absolute w-44 h-44 rounded-full border border-rose-500/30 animate-pulse" />
                <span className="absolute w-32 h-32 rounded-full bg-rose-500/20 animate-pulse" />
              </>
            )}

            {/* Main Interactive Mic/Speaker Orb Button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
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
                  <span className="text-cyan-300">
                    {lang === 'mr' ? 'समर्थ एआय बोलत आहे (ऐका)...' : lang === 'hi' ? 'समर्थ एआई बोल रहा है (सुनिए)...' : 'AI Assistant is Speaking Aloud...'}
                  </span>
                </>
              ) : isListening ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-rose-400">
                    {lang === 'mr' ? 'माईक चालू आहे... बोला' : lang === 'hi' ? 'माइक चालू है... बोलिए' : 'Listening... Speak Naturally'}
                  </span>
                </>
              ) : isThinking ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-300">
                    {lang === 'mr' ? 'माहिती तपासत आहे...' : lang === 'hi' ? 'योजना और लोन का विश्लेषण हो रहा है...' : 'Analyzing feasibility & schemes...'}
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-300">
                    {lang === 'mr' ? 'बोलण्यासाठी टॅप करा' : lang === 'hi' ? 'बोलने के लिए माइक पर टैप करें' : 'Tap Orb to Speak'}
                  </span>
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
                  <span>{msg.role === 'user' ? (lang === 'mr' ? 'तुम्ही (Voice)' : lang === 'hi' ? 'आप (वॉइस)' : 'You') : 'Samarth AI'}</span>
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
                <span>{lang === 'mr' ? 'समर्थ एआय विचार करत आहे...' : lang === 'hi' ? 'समर्थ एआई विश्लेषण कर रहा है...' : 'Samarth AI is thinking...'}</span>
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
              <span>{lang === 'mr' ? 'फॉर्मसाठी ओळखलेले तपशील (Live Form Auto-Fill):' : lang === 'hi' ? 'फॉर्म के लिए पहचाने गए विवरण (Live Form Auto-Fill):' : 'Auto-detected for your form:'}</span>
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

        {/* Quick Voice Prompt Suggestions */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 uppercase font-bold shrink-0">
            {lang === 'mr' ? 'उदाहरणे:' : lang === 'hi' ? 'उदाहरण:' : 'Sample:'}
          </span>
          {quickVoiceSamples.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => processUserVoiceTurn(s.text)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 border border-slate-700 transition-colors cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Bottom Action Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>{lang === 'mr' ? 'माईक थांबवा' : lang === 'hi' ? 'माइक रोकें' : 'Pause Mic'}</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-blue-400" />
                <span>{lang === 'mr' ? 'पुन्हा बोला' : lang === 'hi' ? 'फिर से बोलें' : 'Resume Mic'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCompleteAndApply}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer transition-all hover:scale-102"
          >
            <span>{lang === 'mr' ? 'अर्ज पूर्ण भरा व लागू करा' : lang === 'hi' ? 'फॉर्म भरें व लागू करें' : 'Apply & Fill Form'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoiceAssistantModal;
