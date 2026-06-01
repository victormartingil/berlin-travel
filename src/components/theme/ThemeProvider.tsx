"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const storageKey = "berlin-guide-theme";
const darkQuery = "(prefers-color-scheme: dark)";

type ThemeContextValue = {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (theme: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function systemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function storedPreference(): ThemePreference {
  try {
    if (typeof window === "undefined" || !window.localStorage) return "system";
    const value = window.localStorage.getItem(storageKey);
    return isThemePreference(value) ? value : "system";
  } catch {
    return "system";
  }
}

function applyTheme(preference: ThemePreference, resolvedTheme: ResolvedTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(storedPreference);
  const [systemResolvedTheme, setSystemResolvedTheme] = useState<ResolvedTheme>(systemTheme);
  const resolvedTheme: ResolvedTheme = preference === "system" ? systemResolvedTheme : preference;

  useEffect(() => {
    applyTheme(preference, resolvedTheme);
    try {
      if (window.localStorage) window.localStorage.setItem(storageKey, preference);
    } catch {
      // Theme still works for the session if storage is unavailable.
    }
  }, [preference, resolvedTheme]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia(darkQuery);
    const onChange = () => {
      const resolved = media.matches ? "dark" : "light";
      setSystemResolvedTheme(resolved);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(() => ({ preference, resolvedTheme, setPreference: setPreferenceState }), [preference, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const themeStorageKey = storageKey;
