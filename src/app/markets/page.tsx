"use client";

import { PlacesSectionClient } from "@/components/places/PlacesSectionClient";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function MarketsPage() {
  const { locale } = useLocale();
  return <PlacesSectionClient title={locale === "es" ? "Mercados, rastros y antigüedades" : "Markets, flea markets & antiques"} categories={["market"]} showMarketFilters />;
}
