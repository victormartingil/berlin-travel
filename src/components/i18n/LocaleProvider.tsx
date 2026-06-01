"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { Locale } from "@/domain/common";

type LocaleCtx = { locale: Locale; setLocale: (v: Locale) => void };
const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined" || !window.localStorage) return "es";
    const saved = window.localStorage.getItem("berlin-guide-locale");
    return saved === "en" || saved === "es" ? saved : "es";
  });

  const setLocale = (v: Locale) => {
    setLocaleState(v);
    if (window.localStorage) window.localStorage.setItem("berlin-guide-locale", v);
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
