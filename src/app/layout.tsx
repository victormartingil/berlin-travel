import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";

export const metadata: Metadata = {
  title: "Berlin Travel Guide",
  description: "Personal Berlin travel guide for June 2026",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <LocaleProvider>
          <FavoritesProvider>
            <SiteNav />
            <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 md:pb-8">{children}</main>
          </FavoritesProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
