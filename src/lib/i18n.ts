import type { Locale, LocalizedText } from "@/domain/common";

export const localeLabel: Record<Locale, string> = { es: "Español", en: "English" };

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale];
}
