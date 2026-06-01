"use client";
import Link from "next/link";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/itinerary/", label: "Itinerary" },
  { href: "/map/", label: "Map" },
  { href: "/food/", label: "Food" },
  { href: "/transport/", label: "Transport" },
  { href: "/nightlife/", label: "Nightlife" },
  { href: "/museums/", label: "Museums" },
  { href: "/alternative/", label: "Alternative" },
  { href: "/art/", label: "Art" },
  { href: "/practical/", label: "Practical" },
  { href: "/favorites/", label: "Favorites" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md px-2 py-1 text-zinc-700 hover:bg-zinc-100">
              {item.label}
            </Link>
          ))}
        </div>
        <LanguageSwitch />
      </div>
    </nav>
  );
}
