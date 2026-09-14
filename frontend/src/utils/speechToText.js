/**
 * Web Speech API Utility for Concessional MSME Banking & Voice Advisory
 * Provides high-accuracy speech-to-text, audio cues (Google-style chime),
 * trilingual speech synthesis (TTS) for Marathi, Hindi, and English,
 * and live interim transcript streaming.
 */

// Synthesize a pleasant dual-frequency "start listening" chime using Web Audio API
export const playListeningChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Two-tone rising chime (Google Assistant style C5 -> G5)
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.debug('Audio chime notice:', e);
  }
};

export const playStopChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Soft descending tone (E5 -> A4)
    osc.frequency.setValueAtTime(659.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch (e) {
    console.debug('Audio chime notice:', e);
  }
};

export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' && Boolean(
    window.SpeechRecognition || 
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition
  );
};

export const getLocaleForLang = (lang) => {
  if (lang === 'mr') return 'mr-IN';
  if (lang === 'hi') return 'hi-IN';
  return 'en-IN';
};

/**
 * Trilingual Text-to-Speech (TTS) announcement
 * Strictly respects active language: Marathi -> mr-IN, Hindi -> hi-IN, English -> en-IN
 */
export const speakConfirmation = (lang = 'en') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();

    let text = 'Your voice input has been recorded and form details filled successfully.';
    let locale = 'en-IN';

    if (lang === 'mr') {
      text = 'आपली माहिती यशस्वीरित्या नोंदवली गेली आहे आणि अर्ज भरला गेला आहे.';
      locale = 'mr-IN';
    } else if (lang === 'hi') {
      text = 'आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है और फॉर्म भर दिया गया है।';
      locale = 'hi-IN';
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = locale;
    utter.rate = 0.95;
    utter.pitch = 1.0;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices() || [];
    const matchedVoice = voices.find(v => v.lang === locale || v.lang.startsWith(locale.split('-')[0]));
    if (matchedVoice) {
      utter.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utter);
  } catch (err) {
    console.debug('TTS notice:', err);
  }
};

/**
 * Initialize Speech Recognition with high accuracy and locale compliance
 */
export const initSpeechRecognition = (onResult, onError, onEnd, langCode = 'hi-IN', onInterim = null) => {
  const SpeechRecognition = 
    window.SpeechRecognition || 
    window.webkitSpeechRecognition || 
    window.mozSpeechRecognition || 
    window.msSpeechRecognition;

  if (!SpeechRecognition) {
    onError && onError('Voice input is not supported in this browser. Please use Chrome, Edge, or Android Browser.');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = langCode || 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    let hasDeliveredFinal = false;

    recognition.onstart = () => {
      hasDeliveredFinal = false;
      playListeningChime();
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        const transcriptText = item[0].transcript;
        if (item.isFinal) {
          finalTranscript += transcriptText;
        } else {
          interimTranscript += transcriptText;
        }
      }

      if (interimTranscript && onInterim) {
        onInterim(interimTranscript);
      }

      if (finalTranscript && !hasDeliveredFinal) {
        hasDeliveredFinal = true;
        playStopChime();
        onResult && onResult(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition status:', event.error);
      if (event.error === 'not-allowed') {
        onError && onError(
          langCode.startsWith('mr')
            ? 'मायक्रोफोन परवानगी नाकारली गेली आहे. कृपया ब्राउझरमध्ये मायक्रोफोन चालू करा.'
            : langCode.startsWith('hi')
            ? 'माइक्रोफोन अनुमति अस्वीकृत है। कृपया ब्राउज़र सेटिंग्स में माइक ऑन करें।'
            : 'Microphone permission denied. Please allow microphone access in your browser bar.'
        );
      } else if (event.error === 'no-speech') {
        onError && onError(
          langCode.startsWith('mr')
            ? 'कोणताही आवाज ऐकू आला नाही. कृपया माईक जवळ बोलण्याचा प्रयत्न करा.'
            : langCode.startsWith('hi')
            ? 'कोई आवाज नहीं सुनाई दी। कृपया माइक के पास बोलें।'
            : 'No speech detected. Please speak closer to your microphone.'
        );
      } else if (event.error !== 'aborted') {
        onError && onError(`Voice notice: ${event.error}`);
      }
    };

    recognition.onend = () => {
      onEnd && onEnd();
    };

    return recognition;
  } catch (err) {
    console.error('Failed to initialize speech recognition:', err);
    onError && onError('Could not initialize microphone.');
    return null;
  }
};
