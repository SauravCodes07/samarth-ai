/**
 * Live Dynamic Translation Service
 * Connects to `/api/advisory/translate` (powered by Gemini / multi-lingual model)
 * with LRU caching for instant subsequent lookups.
 */
import api from './api';

const translationCache = new Map();

export const translateTextLive = async (text, targetLang = 'hi') => {
  if (!text || !text.trim()) return '';
  const cacheKey = `${targetLang}:${text.trim()}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const res = await api.post('/advisory/translate', {
      text: text.trim(),
      target_lang: targetLang
    });
    if (res.data && res.data.translated_text) {
      const translated = res.data.translated_text;
      translationCache.set(cacheKey, translated);
      return translated;
    }
  } catch (err) {
    console.debug('Dynamic translation fallback for:', text);
  }

  return text;
};
