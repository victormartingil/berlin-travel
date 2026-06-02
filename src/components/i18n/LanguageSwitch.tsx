"use client";
import { localeLabel } from "@/lib/i18n";
import type { Locale } from "@/domain/common";
import { useLocale } from "./LocaleProvider";

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  const langs: Locale[] = ["es", "en"];
  return (
    <div className="flex gap-1 rounded-lg border border-zinc-300 p-1">
      {langs.map((l) => (
        <button key={l} onClick={() => setLocale(l)} className={`rounded px-2 py-1 text-xs ${locale === l ? "bg-zinc-900 text-white" : "text-zinc-700"}`}>
          <span className="sm:hidden">{l.toUpperCase()}</span>
          <span className="hidden sm:inline">{localeLabel[l]}</span>
        </button>
      ))}
    </div>
  );
}
