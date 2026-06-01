"use client";
import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { places } from "@/data/places";
import { defaultPlaceFilters, filterPlaces } from "@/lib/filters";
import { PlaceFilters } from "@/components/filters/PlaceFilters";
import { TravelMap } from "@/components/map/TravelMap";
import { PlaceCard } from "@/components/places/PlaceCard";

export default function MapPage() {
  const { locale } = useLocale();
  const [filters, setFilters] = useState(defaultPlaceFilters);
  const categories = useMemo(() => Array.from(new Set(places.map((p) => p.category))), []);
  const neighbourhoods = useMemo(() => Array.from(new Set(places.map((p) => p.neighbourhood))).sort(), []);
  const filtered = useMemo(() => filterPlaces(places, filters), [filters]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{locale === "es" ? "Mapa" : "Map"}</h1>
      <PlaceFilters filters={filters} setFilters={setFilters} categories={categories} neighbourhoods={neighbourhoods} locale={locale} />
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm">
        <span>{filtered.length} {locale === "es" ? "lugares visibles" : "visible places"}</span>
        <button type="button" onClick={() => setFilters(defaultPlaceFilters)} className="rounded bg-white px-3 py-1 font-medium">
          {locale === "es" ? "Reset filtros" : "Reset filters"}
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border bg-white p-2">
        <TravelMap places={filtered} locale={locale} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
      </div>
    </section>
  );
}
