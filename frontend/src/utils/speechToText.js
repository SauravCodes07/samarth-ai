/**
 * Web Speech API Utility for Voice Input
 * Provides speech-to-text functionality for rural & MSME users.
 */

export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' && Boolean(
    window.SpeechRecognition || 
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition
  );
};

export const initSpeechRecognition = (onResult, onError, onEnd, lang = 'hi-IN') => {
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
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        onResult && onResult(transcript);
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
