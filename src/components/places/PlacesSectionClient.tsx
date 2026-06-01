"use client";
import { useMemo, useState } from "react";
import type { PlaceCategory } from "@/domain/place";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { places } from "@/data/places";
import { defaultPlaceFilters, filterPlaces } from "@/lib/filters";
import { PlaceFilters } from "@/components/filters/PlaceFilters";
import { PlaceCard } from "./PlaceCard";

export function PlacesSectionClient({ title, categories }: { title: string; categories: PlaceCategory[] }) {
  const { locale } = useLocale();
  const [filters, setFilters] = useState({ ...defaultPlaceFilters, categories });

  const neighbourhoods = useMemo(() => Array.from(new Set(places.map((p) => p.neighbourhood))).sort(), []);
  const filtered = useMemo(() => filterPlaces(places, filters), [filters]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <PlaceFilters filters={filters} setFilters={setFilters} categories={categories} neighbourhoods={neighbourhoods} />
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
      </div>
    </section>
  );
}
