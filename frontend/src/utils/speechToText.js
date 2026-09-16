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

let currentActiveUtterance = null;

/**
 * Speaks arbitrary text in the specified language (mr, hi, en) with audio cleanup
 */
export const speakTextWithVoice = (text, lang = 'en', onDone = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onDone) onDone();
    return null;
  }
  try {
    stopSpeaking(); // Immediately cancel any existing utterance & clear listeners

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

    currentActiveUtterance = utter;

    // Set global acoustic echo suppressor flag
    window.__SAMARTH_AI_SPEAKING__ = true;

    const voices = window.speechSynthesis.getVoices() || [];
    const matchedVoice = voices.find(v => v.lang === locale || v.lang.startsWith(locale.split('-')[0]));
    if (matchedVoice) {
      utter.voice = matchedVoice;
    }

    let isFinished = false;
    const handleSpeechComplete = (e) => {
      if (isFinished) return;
      isFinished = true;
      if (currentActiveUtterance === utter) {
        currentActiveUtterance = null;
      }

      // If speech was cancelled or interrupted, do NOT trigger onDone
      if (e && (e.error === 'canceled' || e.error === 'interrupted')) {
        window.__SAMARTH_AI_SPEAKING__ = false;
        return;
      }

      // Allow 300ms acoustic drain time for room reverberation to settle before re-arming mic
      setTimeout(() => {
        window.__SAMARTH_AI_SPEAKING__ = false;
        if (onDone) onDone();
      }, 300);
    };

    utter.onend = handleSpeechComplete;
    utter.onerror = handleSpeechComplete;

    window.speechSynthesis.speak(utter);
    return utter;
  } catch (err) {
    console.debug('TTS error:', err);
    window.__SAMARTH_AI_SPEAKING__ = false;
    currentActiveUtterance = null;
    if (onDone) onDone();
    return null;
  }
};

export const stopSpeaking = () => {
  window.__SAMARTH_AI_SPEAKING__ = false;
  if (currentActiveUtterance) {
    currentActiveUtterance.onend = null;
    currentActiveUtterance.onerror = null;
    currentActiveUtterance = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
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
      // STRICT ACOUSTIC ECHO SUPPRESSION:
      // If the assistant is currently speaking aloud, discard audio picked up from the computer speakers!
      if (window.__SAMARTH_AI_SPEAKING__) {
        return;
      }

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

      // Intelligent pause & sentence completion detection:
      clearTimer();
      if (liveDisplay.length > 2) {
        const words = liveDisplay.trim().split(/\s+/);
        const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, '');
        
        // Connective, prepositional, auxiliary or trailing markers indicating speaker is mid-sentence
        const trailingMarkers = [
          'of', 'to', 'in', 'for', 'with', 'about', 'at', 'by', 'from', 'as', 'into', 'like',
          'and', 'or', 'but', 'because', 'if', 'so', 'that', 'the', 'a', 'an', 'my', 'our',
          'i', 'am', 'is', 'are', 'was', 'were', 'have', 'has', 'had', 'want', 'planning',
          'actually', 'just', 'thinking', 'business', 'start',
          'की', 'के', 'का', 'को', 'में', 'से', 'पर', 'और', 'या', 'तो', 'कि', 'मैं', 'हम', 'है', 'था',
          'चे', 'च्या', 'चा', 'ची', 'ला', 'मध्ये', 'आणि', 'किंवा', 'मी', 'आम्ही', 'आहे'
        ];
        
        const isTrailing = trailingMarkers.includes(lastWord) || words.length <= 2;
        
        // Snappy, natural conversational turn-taking: 950ms normal pause, 1400ms if ending with trailing conjunction
        const pauseDelay = isTrailing ? 1400 : 950;

        silenceTimer = setTimeout(() => {
          triggerFinalDelivery();
        }, pauseDelay);
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
        if (fallbackCandidate && fallbackCandidate.length > 3) {
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

/**
 * Microphone Audio Stream Recording with MediaRecorder
 * Captures clean, uncompressed audio bytes to send to Groq Whisper Large V3 Turbo.
 */
let activeMediaStream = null;
let activeMediaRecorder = null;
let recordedAudioChunks = [];

export const startMicrophoneRecording = async () => {
  try {
    recordedAudioChunks = [];
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return false;
    }

    activeMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    let mimeType = 'audio/webm;codecs=opus';
    if (typeof MediaRecorder !== 'undefined') {
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' :
                   MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' :
                   MediaRecorder.isTypeSupported('audio/ogg') ? 'audio/ogg' : '';
      }
    }

    activeMediaRecorder = mimeType 
      ? new MediaRecorder(activeMediaStream, { mimeType }) 
      : new MediaRecorder(activeMediaStream);

    activeMediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedAudioChunks.push(event.data);
      }
    };

    activeMediaRecorder.start(250);
    return true;
  } catch (err) {
    console.warn('Microphone MediaRecorder start error:', err);
    return false;
  }
};

/**
 * Get snapshot of currently recorded audio for live interim Whisper transcription
 */
export const getCurrentAudioBlob = () => {
  if (!recordedAudioChunks || recordedAudioChunks.length === 0) return null;
  try {
    const mimeType = activeMediaRecorder?.mimeType || 'audio/webm';
    return new Blob([...recordedAudioChunks], { type: mimeType });
  } catch (e) {
    return null;
  }
};

/**
 * Web Audio Voice Activity Detection (VAD)
 * Analyzes audio energy in real-time. Works universally across all languages (Marathi, Hindi, English).
 * Never gets stuck, detects exact start and stop of human speech.
 */
let audioCtx = null;
let analyser = null;
let microphoneSource = null;
let vadAnimationFrameId = null;

export const startVoiceActivityDetection = (onSpeechStart, onSpeechEnd, onAudioLevel) => {
  if (!activeMediaStream) return null;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.3;

    microphoneSource = audioCtx.createMediaStreamSource(activeMediaStream);
    microphoneSource.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let isSpeaking = false;
    let silenceStart = null;
    let speechStart = null;
    const SPEECH_START_THRESHOLD = 14;
    const SILENCE_THRESHOLD = 11;

    const checkAudioLevel = () => {
      if (!analyser) return;
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      const level = Math.min(100, Math.round((avg / 128) * 100));

      if (onAudioLevel) {
        onAudioLevel(level);
      }

      const now = Date.now();

      if (level >= SPEECH_START_THRESHOLD) {
        silenceStart = null;
        if (!isSpeaking) {
          if (!speechStart) speechStart = now;
          // Require 130ms of continuous sound to qualify as speech start
          if (now - speechStart > 130) {
            isSpeaking = true;
            if (onSpeechStart) onSpeechStart();
          }
        }
      } else if (level <= SILENCE_THRESHOLD) {
        speechStart = null;
        if (isSpeaking) {
          if (!silenceStart) silenceStart = now;
          // Natural, crisp conversational pause: 950ms of silence after speaking completes turn
          if (now - silenceStart > 950) {
            isSpeaking = false;
            silenceStart = null;
            if (onSpeechEnd) onSpeechEnd();
          }
        }
      }

      vadAnimationFrameId = requestAnimationFrame(checkAudioLevel);
    };

    vadAnimationFrameId = requestAnimationFrame(checkAudioLevel);

    return () => {
      stopVoiceActivityDetection();
    };
  } catch (err) {
    console.warn('VAD init notice:', err);
    return null;
  }
};

export const stopVoiceActivityDetection = () => {
  if (vadAnimationFrameId) {
    cancelAnimationFrame(vadAnimationFrameId);
    vadAnimationFrameId = null;
  }
  if (microphoneSource) {
    try { microphoneSource.disconnect(); } catch (e) {}
    microphoneSource = null;
  }
  if (analyser) {
    try { analyser.disconnect(); } catch (e) {}
    analyser = null;
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    try { audioCtx.close(); } catch (e) {}
    audioCtx = null;
  }
};

export const stopMicrophoneRecording = async () => {
  stopVoiceActivityDetection();
  return new Promise((resolve) => {
    if (!activeMediaRecorder || activeMediaRecorder.state === 'inactive') {
      if (activeMediaStream) {
        try {
          activeMediaStream.getTracks().forEach(track => track.stop());
        } catch (e) {}
        activeMediaStream = null;
      }
      resolve(null);
      return;
    }

    activeMediaRecorder.onstop = () => {
      try {
        const mimeType = activeMediaRecorder?.mimeType || 'audio/webm';
        const audioBlob = new Blob(recordedAudioChunks, { type: mimeType });
        recordedAudioChunks = [];
        if (activeMediaStream) {
          activeMediaStream.getTracks().forEach(track => track.stop());
          activeMediaStream = null;
        }
        resolve(audioBlob);
      } catch (e) {
        resolve(null);
      }
    };

    try {
      activeMediaRecorder.stop();
    } catch (e) {
      if (activeMediaStream) {
        try {
          activeMediaStream.getTracks().forEach(track => track.stop());
        } catch (trackErr) {}
        activeMediaStream = null;
      }
      resolve(null);
    }
  });
};


