"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  /** Pick the Arabic or English value for the current language. */
  pick: <T>(ar: T, en: T) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "ayl-cafe-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of stored language, unavailable during SSR
        setLang(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
    pick: (ar, en) => (lang === "ar" ? ar : en),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
