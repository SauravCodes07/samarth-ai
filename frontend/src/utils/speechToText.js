/**
 * Web Speech API Utility for Voice Input
 * Provides speech-to-text functionality, audio cues (start chime), and live word streaming.
 */

// Synthesize a pleasant dual-frequency "start listening" chime using Web Audio API (no external file needed)
export const playListeningChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Two-tone rising chime (Google Assistant style 440Hz -> 880Hz)
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5

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
    // Soft descending tone
    osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15); // A4

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

export const initSpeechRecognition = (onResult, onError, onEnd, lang = 'hi-IN', onInterim = null) => {
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
    recognition.lang = lang || 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = true; // Enable live real-time interim speech-to-text
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      playListeningChime();
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptText;
        } else {
          interimTranscript += transcriptText;
        }
      }

      if (interimTranscript && onInterim) {
        onInterim(interimTranscript);
      }

      if (finalTranscript) {
        playStopChime();
        onResult && onResult(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition warning/error:', event.error);
      if (event.error === 'not-allowed') {
        onError && onError('Microphone access denied. Please click the camera/mic icon in your browser URL bar to allow microphone.');
      } else if (event.error === 'no-speech') {
        onError && onError('No speech detected. Please speak closer to your microphone.');
      } else {
        onError && onError(`Voice error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      onEnd && onEnd();
    };

    return recognition;
  } catch (err) {
    console.error('Failed to initialize speech recognition:', err);
    onError && onError('Could not access microphone.');
    return null;
  }
};
