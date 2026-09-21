'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dictionaries, Language, Translations } from '../locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  isPt: boolean;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (path: string) => path,
  isPt: false,
  isEn: true,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Detect user's preferred language on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('pokemon_app_lang') as Language | null;
      if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
        setLanguageState(savedLang);
      } else {
        // Auto-detect browser language
        const browserLang = navigator.language || (navigator as any).userLanguage || '';
        if (browserLang.toLowerCase().startsWith('pt')) {
          setLanguageState('pt');
        } else {
          setLanguageState('en');
        }
      }
    } catch {
      // Fallback
      setLanguageState('en');
    }
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('pokemon_app_lang', newLang);
      document.documentElement.lang = newLang === 'pt' ? 'pt-BR' : 'en';
    } catch {
      // Ignore in private mode
    }
  }, []);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>): string => {
      const dict = dictionaries[language] || dictionaries.en;
      const keys = path.split('.');

      let result: any = dict;
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          // Fallback to English dictionary if key not found
          let fallbackResult: any = dictionaries.en;
          for (const fallbackKey of keys) {
            if (fallbackResult && typeof fallbackResult === 'object' && fallbackKey in fallbackResult) {
              fallbackResult = fallbackResult[fallbackKey];
            } else {
              return path;
            }
          }
          result = fallbackResult;
          break;
        }
      }

      if (typeof result !== 'string') {
        return path;
      }

      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramVal]) => {
          return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        }, result);
      }

      return result;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isPt: language === 'pt',
        isEn: language === 'en',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
