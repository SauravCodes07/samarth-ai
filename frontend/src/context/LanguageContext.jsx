import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('hi'); // 'en', 'hi', or 'mr'

  const toggleLanguage = () => {
    setLang((prev) => {
      if (prev === 'hi') return 'en';
      if (prev === 'en') return 'mr';
      return 'hi';
    });
  };

  const getLanguageLabel = () => {
    if (lang === 'hi') return 'हिन्दी';
    if (lang === 'mr') return 'मराठी';
    return 'English';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, getLanguageLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
