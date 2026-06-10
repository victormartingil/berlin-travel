import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { ThemeInitScript } from "@/components/theme/ThemeInitScript";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Berlin Travel Guide",
  description: "Personal Berlin travel guide for June 2026",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-theme-preference="system" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <LocaleProvider>
            <FavoritesProvider>
              <SiteNav />
              <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 lg:pb-8">{children}</main>
            </FavoritesProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
