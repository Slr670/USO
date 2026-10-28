'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { LanguageCode } from './types';
import { I18N_RESOURCES, MODULE_KEYS, resolveTranslation } from './i18n-resources';

export { I18N_RESOURCES, MODULE_KEYS, resolveTranslation };

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lng: LanguageCode) => void;
  t: (keyPath: string, variables?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{
  children: ReactNode;
  overrides?: Record<string, Record<string, string>>;
}> = ({ children, overrides }) => {
  const [language, setLangState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shf_app_lang');
      if (stored === 'th' || stored === 'en') {
        setLangState(stored);
      }
    } catch {
      // Ignore localStorage security restriction in sandboxed iframes
    }
  }, []);

  const setLanguage = useCallback((lng: LanguageCode) => {
    setLangState(lng);
    try {
      localStorage.setItem('shf_app_lang', lng);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
      }
    } catch {
      // Ignore
    }
  }, []);

  const t = useCallback(
    (keyPath: string, variables?: Record<string, string>) => {
      return resolveTranslation(language, keyPath, variables, overrides);
    },
    [language, overrides]
  );

  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (keyPath: string, variables?: Record<string, string>) =>
        resolveTranslation('en', keyPath, variables)
    };
  }
  return ctx;
}
