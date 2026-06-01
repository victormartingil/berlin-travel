"use client";

import Link from "next/link";
import { BookOpen, Heart, Home, Info, Landmark, Map, Menu, Moon, Palette, Soup, Train } from "lucide-react";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t, ui } from "@/lib/i18n";

const primaryItems = [
  { href: "/", label: ui.nav.home, icon: Home },
  { href: "/itinerary/", label: ui.nav.itinerary, icon: BookOpen },
  { href: "/map/", label: ui.nav.map, icon: Map },
  { href: "/food/", label: ui.nav.food, icon: Soup },
  { href: "/favorites/", label: ui.nav.favorites, icon: Heart },
];

const secondaryItems = [
  { href: "/transport/", label: { es: "Transporte", en: "Transport" }, icon: Train },
  { href: "/nightlife/", label: { es: "Noche", en: "Nightlife" }, icon: Moon },
  { href: "/museums/", label: { es: "Museos", en: "Museums" }, icon: Landmark },
  { href: "/alternative/", label: { es: "Alternativo", en: "Alternative" }, icon: Menu },
  { href: "/art/", label: { es: "Arte", en: "Art" }, icon: Palette },
  { href: "/practical/", label: { es: "Practico", en: "Practical" }, icon: Info },
];

export function SiteNav() {
  const { locale } = useLocale();

  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="whitespace-nowrap font-semibold">
          Berlin Guide
        </Link>
        <div className="hidden gap-2 overflow-x-auto text-sm md:flex">
          {[...primaryItems, ...secondaryItems].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-zinc-700 hover:bg-zinc-100">
                <Icon size={16} />
                {t(item.label, locale)}
              </Link>
            );
          })}
        </div>
        <LanguageSwitch />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white md:hidden">
        <div className="grid grid-cols-6 px-1 py-1">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-1 py-2 text-[11px] text-zinc-700">
                <Icon size={18} />
                <span>{t(item.label, locale)}</span>
              </Link>
            );
          })}
          <details className="relative">
            <summary className="flex cursor-pointer list-none flex-col items-center gap-1 px-1 py-2 text-[11px] text-zinc-700">
              <Menu size={18} />
              <span>{t(ui.nav.more, locale)}</span>
            </summary>
            <div className="absolute bottom-14 right-0 w-48 rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
                    <Icon size={16} />
                    {t(item.label, locale)}
                  </Link>
                );
              })}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
