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
  Radio
} from 'lucide-react';
import { initSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speechToText';

const VoiceAssistantModal = ({ isOpen, onClose, onApplyTranscript }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const recognitionRef = useRef(null);

  // Quick voice simulation presets in case physical microphone is blocked
  const sampleVoicePrompts = [
    {
      labelEn: 'Dairy Farm with ₹1 Lakh Margin (Rajasthan)',
      labelHi: 'डेयरी फार्म, 1 लाख मार्जिन, राजस्थान',
      labelMr: 'डेअरी फार्म, १ लाख भांडवल, महाराष्ट्र',
      textEn: 'I want to start a Dairy Farm with 1 Lakh margin money in Rajasthan',
      textHi: 'मेरे पास 1 लाख रुपये मार्जिन पूंजी है, मुझे राजस्थान में डेयरी फार्म शुरू करना है',
      textMr: 'माझ्याकडे १ लाख रुपये भांडवल आहे, मला महाराष्ट्रात डेअरी फार्म सुरू करायचा आहे'
    },
    {
      labelEn: 'Kirana Store with ₹50,000 Savings',
      labelHi: 'किराना स्टोर, 50,000 बचत पूंजी',
      labelMr: 'किराणा दुकान, ५०,००० बचत',
      textEn: 'I want to start a grocery kirana shop with 50000 rupees margin',
      textHi: 'मेरे पास 50000 रुपये हैं और मुझे किराना दुकान खोलनी है',
      textMr: 'माझ्याकडे ५०,००० रुपये आहेत आणि मला किराणा दुकान सुरू करायचे आहे'
    },
    {
      labelEn: 'Tailoring Boutique for Woman Entrepreneur (4% Rate)',
      labelHi: 'सिलाई बुटीक महिला उद्यमी (4% ब्याज छूट)',
      labelMr: 'शिलाई बुटीक महिला उद्योजक (४% व्याज)',
      textEn: 'I am a woman entrepreneur looking for tailoring boutique loan with 20000 margin',
      textHi: 'मैं एक महिला उद्यमी हूँ और मुझे सिलाई बुटीक के लिए 20000 रुपये मार्जिन में लोन चाहिए',
      textMr: 'मी एक महिला उद्योजक असून मला शिलाई बुटीकसाठी २०,००० भांडवलावर कर्ज हवे आहे'
    },
    {
      labelEn: 'E-Rickshaw Transport Business',
      labelHi: 'ई-रिक्शा वाहन व्यवसाय, उत्तर प्रदेश',
      labelMr: 'ई-रिक्षा वाहतूक व्यवसाय, १.५ लाख',
      textEn: 'E-rickshaw transport business with 25000 margin capital',
      textHi: 'ई-रिक्शा खरीदने के लिए 25000 रुपये मार्जिन पूंजी के साथ लोन चाहिए',
      textMr: 'ई-रिक्षा खरेदीसाठी २५,००० रुपये भांडवलासह कर्ज हवे आहे'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopListening();
    }
    return () => stopListening();
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
    setErrorMsg(null);
    setTranscript('');

    if (!isSpeechRecognitionSupported()) {
      setErrorMsg(
        lang === 'mr'
          ? 'तुमच्या ब्राउझरमध्ये मायक्रोफोन थेट उपलब्ध नाही. तुम्ही खालील जलद आवाजी पर्यायांवर क्लिक करू शकता.'
          : lang === 'hi'
          ? 'ब्राउज़र में सीधे माइक्रोफोन सपोर्ट नहीं मिला। आप नीचे दिए गए क्विक वॉइस ऑप्शन पर क्लिक करके टेस्ट कर सकते हैं।'
          : 'Live microphone is restricted in this browser session. You can tap any of the quick voice samples below to fill details.'
      );
      return;
    }

    const locale = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    const recognition = initSpeechRecognition(
      (text) => {
        setTranscript(text);
        setLiveTranscript('');
        setIsListening(false);
      },
      (err) => {
        setIsListening(false);
        setLiveTranscript('');
        setErrorMsg(
          typeof err === 'string'
            ? err
            : 'माइक्रोफोन से आवाज नहीं मिली। कृपया नीचे दिए गए उदाहरण पर क्लिक करें।'
        );
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

  const handleApply = (text) => {
    const finalTxt = text || transcript;
    if (finalTxt && onApplyTranscript) {
      onApplyTranscript(finalTxt);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {lang === 'mr' ? 'आवाज सहाय्यक (Voice Input)' : lang === 'hi' ? 'स्मार्ट वॉइस असिस्टेंट' : 'Smart Voice Form Assistant'}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'mr' ? 'मराठी, हिंदी किंवा इंग्रजीत बोला' : lang === 'hi' ? 'हिंदी, मराठी या अंग्रेजी में बोलें' : 'Speak naturally in Hindi, Marathi, or English'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Mic Animation Area */}
        <div className="p-6 text-center space-y-5 bg-gradient-to-b from-slate-50/50 to-white">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
                <span className="absolute -inset-3 rounded-full bg-blue-500/10 animate-pulse" />
              </>
            )}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isListening
                  ? 'bg-rose-600 text-white ring-8 ring-rose-100 scale-105'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
              }`}
            >
              {isListening ? <Radio className="w-8 h-8 animate-pulse text-white" /> : <Mic className="w-8 h-8 text-white" />}
            </button>
          </div>

          <div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isListening ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
              {isListening
                ? (lang === 'mr' ? 'ऐकत आहोत... कृपया बोला' : lang === 'hi' ? 'सुन रहे हैं... कृपया बोलिए' : 'Listening... Speak now')
                : (lang === 'mr' ? 'माईक सुरू करण्यासाठी टॅप करा' : lang === 'hi' ? 'माइक शुरू करने के लिए टैप करें' : 'Tap to Start Speaking')}
            </span>
            <p className="text-xs text-slate-500 mt-2">
              {lang === 'mr'
                ? 'उदा: "मला १ लाख रुपयांच्या भांडवलावर महाराष्ट्रात डेअरी सुरू करायची आहे"'
                : lang === 'hi'
                ? 'उदा: "मेरे पास 1 लाख रुपये हैं, मुझे राजस्थान में डेयरी फार्म शुरू करना है"'
                : 'e.g. "I have 1 Lakh margin money, want to start a Dairy Farm in Rajasthan"'}
            </p>
          </div>

          {/* Real-time Streaming Speech Box (Shows live words as you speak) */}
          {isListening && liveTranscript && (
            <div className="p-3.5 bg-blue-50 border-2 border-blue-300 rounded-2xl text-left animate-fadeIn shadow-xs">
              <div className="flex items-center space-x-2 mb-1 text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[10px] uppercase font-black tracking-wider">
                  {lang === 'mr' ? 'थेट आवाज ओळखत आहे (बोलत राहा...):' : lang === 'hi' ? 'लाइव वॉइस इनपुट (बोलते रहें...):' : 'Live Speech-to-Text (Keep speaking...):'}
                </span>
              </div>
              <p className="text-sm font-bold text-blue-950 italic">"{liveTranscript}"</p>
            </div>
          )}

          {/* Final Transcript Display */}
          {transcript && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  {lang === 'mr' ? 'ओळखलेला आवाज:' : lang === 'hi' ? 'पहचाना गया वॉइस इनपुट:' : 'Captured Transcript:'}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-emerald-950 italic">"{transcript}"</p>
              <button
                onClick={() => handleApply(transcript)}
                className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{lang === 'mr' ? 'हा तपशील फॉर्ममध्ये भरा' : lang === 'hi' ? 'यह विवरण फॉर्म में भरें' : 'Apply Details to Form'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-start space-x-2 text-left">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* One-Tap Voice Presets */}
          <div className="text-left pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'mr' ? 'किंवा १-क्लिक जलद नमुना निवडा:' : lang === 'hi' ? 'या 1-क्लिक में उदाहरण से भरें:' : 'Or tap a 1-click voice query sample:'}</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {sampleVoicePrompts.map((p, idx) => {
                const sampleText = lang === 'mr' ? p.textMr : lang === 'hi' ? p.textHi : p.textEn;
                const sampleLabel = lang === 'mr' ? p.labelMr : lang === 'hi' ? p.labelHi : p.labelEn;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTranscript(sampleText);
                      handleApply(sampleText);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/60 text-left transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                        {sampleLabel}
                      </div>
                      <div className="text-[11px] text-slate-500 italic truncate max-w-[320px]">
                        "{sampleText}"
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VoiceAssistantModal;
