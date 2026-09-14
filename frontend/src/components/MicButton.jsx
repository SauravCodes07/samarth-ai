import React, { useState, useRef } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, Sparkles } from 'lucide-react';
import { initSpeechRecognition, isSpeechRecognitionSupported, getLocaleForLang } from '../utils/speechToText';
import { useLanguage } from '../context/LanguageContext';

const MicButton = ({ onTranscript, className = "" }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const recognitionRef = useRef(null);

  const startListening = () => {
    setErrorMsg(null);

    if (!isSpeechRecognitionSupported()) {
      setErrorMsg(
        lang === 'mr'
          ? 'आपल्या ब्राउझरमध्ये थेट व्हॉइस इनपुट समर्थित नाही. कृपया Google Chrome वापरा.'
          : lang === 'hi'
          ? 'आपके ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं है। कृपया Google Chrome का उपयोग करें।'
          : 'Voice input is not supported in this browser. Please use Google Chrome.'
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
      return;
    }

    const locale = getLocaleForLang(lang);
    const recognition = initSpeechRecognition(
      (text) => {
        setIsListening(false);
        setLiveText('');
        if (text && text.trim() && onTranscript) {
          onTranscript(text.trim());
        }
      },
      (err) => {
        setIsListening(false);
        setLiveText('');
        setErrorMsg(typeof err === 'string' ? err : 'Could not hear voice. Please try again.');
      },
      () => {
        setIsListening(false);
        setLiveText('');
      },
      locale,
      (interim) => {
        setLiveText(interim);
      }
    );

    if (recognition) {
      recognitionRef.current = recognition;
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start issue:', err);
        setIsListening(false);
      }
    }
  };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Siri / Google-style ambient glow */}
      <div className="relative flex items-center justify-center">
        {isListening && (
          <>
            <span className="absolute w-20 h-20 rounded-full bg-indigo-500/25 animate-ping" />
            <span className="absolute w-24 h-24 rounded-full bg-rose-500/20 animate-pulse" />
          </>
        )}

        <button
          type="button"
          onClick={startListening}
          className={`relative z-10 w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none cursor-pointer ${
            isListening
              ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white ring-4 ring-rose-200/80 scale-105 shadow-rose-500/30'
              : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white hover:scale-105 shadow-blue-500/25'
          }`}
          title={lang === 'mr' ? 'आवाजाने माहिती भरा' : lang === 'hi' ? 'बोलकर फॉर्म भरें' : 'Speak to fill details'}
        >
          {isListening ? (
            <div className="flex items-center space-x-1">
              <span className="w-1 h-3.5 bg-white rounded-full animate-bounce [animation-delay:0s]" />
              <span className="w-1 h-5 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
              <span className="w-1 h-4.5 bg-white rounded-full animate-bounce [animation-delay:0.45s]" />
            </div>
          ) : (
            <Mic className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <span className="text-[11px] font-bold mt-1.5 text-slate-700 flex items-center gap-1.5">
        {isListening ? (
          <>
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span className="text-rose-600 font-extrabold">
              {lang === 'mr' ? 'ऐकत आहोत... बोला' : lang === 'hi' ? 'माइक चालू है... बोलिए' : 'Listening... Speak'}
            </span>
          </>
        ) : (
          <span className="text-slate-600 font-medium">
            {lang === 'mr' ? 'आवाजाने भरा' : lang === 'hi' ? 'बोलकर भरें' : 'Voice Input'}
          </span>
        )}
      </span>

      {/* Live Interim Spoken Words Box */}
      {isListening && liveText && (
        <div className="mt-2 p-2 bg-indigo-50/90 border border-indigo-200/80 rounded-xl text-xs font-semibold text-indigo-950 max-w-[240px] text-center shadow-xs animate-fadeIn backdrop-blur-xs">
          <span className="text-[9px] text-indigo-600 uppercase block font-bold tracking-wider mb-0.5">
            {lang === 'mr' ? 'तुम्ही बोलत आहात...' : lang === 'hi' ? 'पहचाना जा रहा है...' : 'Transcribing...'}
          </span>
          <span className="italic">"{liveText}"</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center space-x-1 text-[11px] text-rose-600 mt-1 max-w-[220px] text-center bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default MicButton;
