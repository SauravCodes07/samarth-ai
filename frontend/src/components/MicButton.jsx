import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { initSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speechToText';
import { useLanguage } from '../context/LanguageContext';

const MicButton = ({ onTranscript, className = "" }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
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

    const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';
    const recognition = initSpeechRecognition(
      (text) => {
        setIsListening(false);
        if (text && text.trim() && onTranscript) {
          onTranscript(text.trim());
        }
      },
      (err) => {
        setIsListening(false);
        setErrorMsg(typeof err === 'string' ? err : 'Could not hear voice. Please try again.');
      },
      () => {
        setIsListening(false);
      },
      locale
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
      <button
        type="button"
        onClick={startListening}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none ${
          isListening
            ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-300 scale-110'
            : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
        }`}
        title={lang === 'hi' ? 'बोलकर फॉर्म भरें' : 'Speak to fill details'}
      >
        {isListening ? (
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </button>

      <span className="text-xs font-semibold mt-1.5 text-slate-700">
        {isListening
          ? (lang === 'hi' ? 'सुन रहे हैं... बोलिए' : 'Listening... Speak now')
          : (lang === 'hi' ? 'माइक पर बोलें' : 'Voice Input')}
      </span>

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
