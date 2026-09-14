import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { initSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speechToText';
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
        lang === 'hi'
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

    const locale = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
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
      {/* Google-Assistant Style Pulsing Rings when listening */}
      <div className="relative flex items-center justify-center">
        {isListening && (
          <>
            <span className="absolute w-20 h-20 rounded-full bg-blue-500/20 animate-ping" />
            <span className="absolute w-24 h-24 rounded-full bg-rose-500/15 animate-pulse" />
          </>
        )}

        <button
          type="button"
          onClick={startListening}
          className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none cursor-pointer ${
            isListening
              ? 'bg-rose-600 text-white ring-4 ring-rose-200 scale-110 shadow-rose-500/30'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 shadow-blue-500/30'
          }`}
          title={lang === 'mr' ? 'आवाजाने माहिती भरा' : lang === 'hi' ? 'बोलकर फॉर्म भरें' : 'Speak to fill details'}
        >
          {isListening ? (
            <div className="flex items-center space-x-0.5">
              <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:0s]" />
              <span className="w-1 h-6 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
              <span className="w-1 h-5 bg-white rounded-full animate-bounce [animation-delay:0.45s]" />
            </div>
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      <span className="text-xs font-bold mt-2 text-slate-700 flex items-center gap-1.5">
        {isListening ? (
          <>
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span className="text-rose-600 font-extrabold">
              {lang === 'mr' ? 'माईक सुरू आहे... बोला' : lang === 'hi' ? 'माइक चालू है... बोलिए' : 'Listening... Speak now'}
            </span>
          </>
        ) : (
          <span>{lang === 'mr' ? 'माईकवर बोला' : lang === 'hi' ? 'माइक पर बोलें' : 'Voice Input'}</span>
        )}
      </span>

      {/* Live Interim Spoken Words Box */}
      {isListening && liveText && (
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 max-w-[220px] text-center shadow-xs animate-fadeIn">
          <span className="text-[10px] text-blue-500 uppercase block font-bold tracking-wider">
            {lang === 'mr' ? 'तुम्ही बोलत आहात...' : lang === 'hi' ? 'आप बोल रहे हैं...' : 'Transcribing...'}
          </span>
          <span className="italic">"{liveText}"</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center space-x-1 text-[11px] text-rose-600 mt-1 max-w-[200px] text-center bg-rose-50 border border-rose-200 px-2 py-1 rounded-md">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default MicButton;
