"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Heart, Home, Info, Landmark, Map, Menu, Moon, Newspaper, Palette, Settings, ShieldCheck, ShoppingBag, Soup, Train } from "lucide-react";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { t, ui } from "@/lib/i18n";

const primaryItems = [
  { href: "/", label: ui.nav.home, icon: Home },
  { href: "/itinerary/", label: ui.nav.itinerary, icon: BookOpen },
  { href: "/map/", label: ui.nav.map, icon: Map },
  { href: "/food/", label: ui.nav.food, icon: Soup },
];

const desktopDirectItems = [
  ...primaryItems,
  { href: "/favorites/", label: ui.nav.favorites, icon: Heart },
  { href: "/transport/", label: { es: "Transporte", en: "Transport" }, icon: Train },
  { href: "/markets/", label: { es: "Mercados", en: "Markets" }, icon: ShoppingBag },
  { href: "/nightlife/", label: { es: "Noche", en: "Nightlife" }, icon: Moon },
  { href: "/museums/", label: { es: "Museos", en: "Museums" }, icon: Landmark },
  { href: "/alternative/", label: { es: "Alternativo", en: "Alternative" }, icon: Menu },
];

const secondaryItems = [
  { href: "/art/", label: { es: "Arte", en: "Art" }, icon: Palette },
  { href: "/context/", label: { es: "Contexto", en: "Context" }, icon: Newspaper },
  { href: "/safety/", label: { es: "Seguridad", en: "Safety" }, icon: ShieldCheck },
  { href: "/practical/", label: { es: "Práctico", en: "Practical" }, icon: Info },
];

const mobileMoreItems = [...desktopDirectItems.slice(primaryItems.length), ...secondaryItems];

export function SiteNav() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  }

  return (
    <nav className="ui-nav sticky top-0 z-[1200] border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4">
        <Link href="/" className="min-w-0 shrink truncate whitespace-nowrap text-sm font-semibold sm:text-base">
          Berlin Guide
        </Link>
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 text-sm lg:flex">
          {desktopDirectItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 ${active ? "ui-control-active" : "ui-control"}`}>
                <Icon size={16} />
                {t(item.label, locale)}
              </Link>
            );
          })}
          <div className="relative">
            <button
              type="button"
              aria-label={locale === "es" ? "Más secciones" : "More sections"}
              aria-expanded={desktopMoreOpen}
              onClick={() => {
                setSettingsOpen(false);
                setDesktopMoreOpen((open) => !open);
              }}
              className={`flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 ${desktopMoreOpen ? "ui-control-active" : "ui-control"}`}
            >
              <Menu size={16} />
              {t(ui.nav.more, locale)}
            </button>
            {desktopMoreOpen ? (
              <div className="ui-surface absolute right-0 top-10 z-[1220] grid w-64 gap-1 rounded-xl border p-2 shadow-lg">
                {secondaryItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setDesktopMoreOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${active ? "ui-control-active" : "ui-control"}`}>
                      <Icon size={17} />
                      <span className="font-medium">{t(item.label, locale)}</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="relative flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label={locale === "es" ? "Menú móvil" : "Mobile menu"}
            aria-expanded={mobileMoreOpen}
            onClick={() => {
              setSettingsOpen(false);
              setDesktopMoreOpen(false);
              setMobileMoreOpen((open) => !open);
            }}
            className={`inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-2.5 py-2 text-xs font-medium lg:hidden ${mobileMoreOpen ? "ui-control-active" : "ui-control"}`}
          >
            <Menu size={16} />
            <span className="hidden sm:inline">{t(ui.nav.more, locale)}</span>
          </button>
          <button
            type="button"
            aria-label={locale === "es" ? "Ajustes" : "Settings"}
            aria-expanded={settingsOpen}
            onClick={() => {
              setDesktopMoreOpen(false);
              setMobileMoreOpen(false);
              setSettingsOpen((open) => !open);
            }}
            className={`inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-2.5 py-2 text-xs font-medium ${settingsOpen ? "ui-control-active" : "ui-control"}`}
          >
            <Settings size={16} />
            <span className="hidden sm:inline">{locale === "es" ? "Ajustes" : "Settings"}</span>
          </button>
          {settingsOpen ? (
            <div className="ui-surface absolute right-0 top-11 z-[1220] w-[min(calc(100vw-1.5rem),20rem)] space-y-3 rounded-xl border p-3 text-sm shadow-lg">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{locale === "es" ? "Tema" : "Theme"}</p>
                <ThemeSwitch variant="menu" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{locale === "es" ? "Idioma" : "Language"}</p>
                <LanguageSwitch variant="menu" />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {mobileMoreOpen ? (
        <>
          <button type="button" aria-label={locale === "es" ? "Cerrar menú" : "Close menu"} className="fixed inset-0 z-[1190] bg-black/35 lg:hidden" onClick={() => setMobileMoreOpen(false)} />
          <div className="ui-surface fixed inset-x-3 top-[4.25rem] z-[1210] max-h-[calc(100vh-9rem)] overflow-y-auto rounded-2xl border p-2 shadow-lg lg:hidden">
            <div className="grid gap-1">
              {mobileMoreItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMoreOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${active ? "ui-control-active" : "ui-control"}`}>
                    <Icon size={18} />
                    <span className="font-medium">{t(item.label, locale)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : null}

      <div className="ui-nav fixed inset-x-0 bottom-0 z-[1200] border-t pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2 py-1.5">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileMoreOpen(false)} className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium leading-none ${active ? "ui-control-active" : "ui-control"}`}>
                <Icon size={18} />
                <span className="max-w-full truncate">{t(item.label, locale)}</span>
              </Link>
            );
          })}
          <button
            type="button"
            aria-label={locale === "es" ? "Más móvil" : "Mobile more"}
            aria-expanded={mobileMoreOpen}
            onClick={() => {
              setSettingsOpen(false);
              setMobileMoreOpen((open) => !open);
            }}
            className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium leading-none ${mobileMoreOpen ? "ui-control-active" : "ui-control"}`}
          >
            <Menu size={18} />
            <span className="max-w-full truncate">{t(ui.nav.more, locale)}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
