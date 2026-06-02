"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import type { ThemePreference } from "./ThemeProvider";
import { useTheme } from "./ThemeProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";

const options: { value: ThemePreference; icon: typeof Monitor; label: { es: string; en: string } }[] = [
  { value: "system", icon: Monitor, label: { es: "Sistema", en: "System" } },
  { value: "dark", icon: Moon, label: { es: "Oscuro", en: "Dark" } },
  { value: "light", icon: Sun, label: { es: "Claro", en: "Light" } },
];

export function ThemeSwitch({ variant = "inline" }: { variant?: "inline" | "menu" }) {
  const { locale } = useLocale();
  const { preference, setPreference } = useTheme();
  const isMenu = variant === "menu";

  return (
    <div className={`flex gap-1 rounded-lg border border-zinc-300 p-1 ${isMenu ? "w-full" : ""}`} aria-label={locale === "es" ? "Tema" : "Theme"}>
      {options.map((option) => {
        const Icon = option.icon;
        const active = preference === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setPreference(option.value)}
            className={`inline-flex items-center justify-center gap-1 rounded px-2 py-1 text-xs ${isMenu ? "flex-1" : ""} ${active ? "ui-control-active" : "ui-control"}`}
            aria-pressed={active}
            title={option.label[locale]}
          >
            <Icon size={14} />
            <span className={isMenu ? "inline" : "hidden lg:inline"}>{option.label[locale]}</span>
          </button>
        );
      })}
    </div>
  );
}
