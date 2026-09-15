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

export const cleanVoiceTranscript = (text) => {
  if (!text) return '';
  let cleaned = text.trim();
  // Strip trailing voice control words like "exit", "stop", "cancel", "रद्द", "थांबवा", "रोकें"
  cleaned = cleaned.replace(/\s+(exit|stop|cancel|close|रोकें|रद्द|थांबवा|बंद करा)\.?$/i, '');
  // Remove redundant trailing punctuation
  cleaned = cleaned.replace(/[.,;!?]+$/, '').trim();
  return cleaned;
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
 * Speaks arbitrary text in the specified language (mr, hi, en) with audio cleanup
 */
export const speakTextWithVoice = (text, lang = 'en', onDone = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onDone) onDone();
    return null;
  }
  try {
    window.speechSynthesis.cancel();

    // Clean text of markdown, emojis, asterisks, headers, bullets, and URLs
    let clean = text
      .replace(/[*#_`~]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/^[0-9]+\.\s*/gm, '')
      .replace(/^[•\-]\s*/gm, '')
      .trim();

    if (!clean) {
      if (onDone) onDone();
      return null;
    }

    const locale = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = locale;
    utter.rate = 0.95;
    utter.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices() || [];
    const matchedVoice = voices.find(v => v.lang === locale || v.lang.startsWith(locale.split('-')[0]));
    if (matchedVoice) {
      utter.voice = matchedVoice;
    }

    if (onDone) {
      utter.onend = () => onDone();
      utter.onerror = () => onDone();
    }

    window.speechSynthesis.speak(utter);
    return utter;
  } catch (err) {
    console.debug('TTS error:', err);
    if (onDone) onDone();
    return null;
  }
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

/**
 * Initialize Speech Recognition with high accuracy, interim streaming,
 * continuous microphone capture, and automatic silence detection.
 */
export const initSpeechRecognition = (onResult, onError, onEnd, langCode = 'en-IN', onInterim = null) => {
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
    // Default to en-IN for universal Indian English & Hinglish comfort, or specific requested locale
    recognition.lang = langCode || 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    let hasDeliveredFinal = false;
    let accumulatedFinal = '';
    let latestInterim = '';
    let silenceTimer = null;

    const clearTimer = () => {
      if (silenceTimer) {
        clearTimeout(silenceTimer);
        silenceTimer = null;
      }
    };

    const triggerFinalDelivery = () => {
      clearTimer();
      const combined = (accumulatedFinal + ' ' + latestInterim).trim();
      const candidate = cleanVoiceTranscript(combined);
      if (candidate && !hasDeliveredFinal) {
        hasDeliveredFinal = true;
        playStopChime();
        try {
          recognition.stop();
        } catch (e) {}
        onResult && onResult(candidate);
      }
    };

    recognition.onstart = () => {
      hasDeliveredFinal = false;
      accumulatedFinal = '';
      latestInterim = '';
      clearTimer();
      playListeningChime();
    };

    recognition.onresult = (event) => {
      let currentEventFinal = '';
      let currentEventInterim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        const transcriptText = item[0]?.transcript || '';
        if (item.isFinal) {
          currentEventFinal += (currentEventFinal ? ' ' : '') + transcriptText.trim();
        } else {
          currentEventInterim += (currentEventInterim ? ' ' : '') + transcriptText.trim();
        }
      }

      if (currentEventFinal) {
        accumulatedFinal += (accumulatedFinal ? ' ' : '') + currentEventFinal;
      }
      latestInterim = currentEventInterim;

      const liveDisplay = (accumulatedFinal + (latestInterim ? ' ' + latestInterim : '')).trim();
      if (liveDisplay && onInterim) {
        onInterim(liveDisplay);
      }

      // Reset silence timer on every spoken word: if user pauses for 1.3s after speaking, finalize turn
      clearTimer();
      if (liveDisplay.length > 2) {
        silenceTimer = setTimeout(() => {
          triggerFinalDelivery();
        }, 1350);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition notice:', event.error);
      clearTimer();
      if (event.error === 'not-allowed') {
        onError && onError('Microphone access denied. Please allow microphone permission in your browser URL bar.');
      } else if (event.error === 'no-speech') {
        // Silent ignore for continuous mode
      } else if (event.error !== 'aborted') {
        onError && onError(`Microphone status: ${event.error}`);
      }
    };

    recognition.onend = () => {
      clearTimer();
      if (!hasDeliveredFinal) {
        const combined = (accumulatedFinal + ' ' + latestInterim).trim();
        const fallbackCandidate = cleanVoiceTranscript(combined);
        if (fallbackCandidate) {
          hasDeliveredFinal = true;
          playStopChime();
          onResult && onResult(fallbackCandidate);
        }
      }
      onEnd && onEnd();
    };

    return recognition;
  } catch (err) {
    console.error('Failed to initialize speech recognition:', err);
    onError && onError('Could not initialize microphone.');
    return null;
  }
};

