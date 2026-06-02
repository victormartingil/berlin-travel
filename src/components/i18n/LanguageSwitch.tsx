"use client";
import { localeLabel } from "@/lib/i18n";
import type { Locale } from "@/domain/common";
import { useLocale } from "./LocaleProvider";

export function LanguageSwitch({ variant = "inline" }: { variant?: "inline" | "menu" }) {
  const { locale, setLocale } = useLocale();
  const langs: Locale[] = ["es", "en"];
  const isMenu = variant === "menu";

  return (
    <div className={`flex gap-1 rounded-lg border border-zinc-300 p-1 ${isMenu ? "w-full" : ""}`}>
      {langs.map((l) => (
        <button key={l} onClick={() => setLocale(l)} className={`rounded px-2 py-1 text-xs ${isMenu ? "flex-1" : ""} ${locale === l ? "ui-control-active" : "ui-control"}`}>
          {isMenu ? (
            <span>{localeLabel[l]}</span>
          ) : (
            <>
              <span className="sm:hidden">{l.toUpperCase()}</span>
              <span className="hidden sm:inline">{localeLabel[l]}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
