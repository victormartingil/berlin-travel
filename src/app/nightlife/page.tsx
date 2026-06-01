"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { PlacesSectionClient } from "@/components/places/PlacesSectionClient";
import { events } from "@/data/events";
import { places } from "@/data/places";
import { defaultEventFilters, filterEvents } from "@/lib/filters";

export default function NightlifePage() {
  const { locale } = useLocale();
  const [filters, setFilters] = useState(defaultEventFilters);
  const filtered = useMemo(() => filterEvents(events, filters), [filters]);
  const dates = Array.from(new Set(events.map((e) => e.date))).sort();

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{locale === "es" ? "Noche y electronica" : "Nightlife and electronic music"}</h1>
        <div className="grid gap-2 rounded-md border border-zinc-200 bg-white p-3 md:grid-cols-3">
          <select value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} className="rounded border p-2 text-sm">
            <option value="all">{locale === "es" ? "Todas las fechas" : "All dates"}</option>
            {dates.map((date) => <option key={date} value={date}>{date}</option>)}
          </select>
          <select value={filters.intensity} onChange={(e) => setFilters({ ...filters, intensity: e.target.value as typeof filters.intensity })} className="rounded border p-2 text-sm">
            <option value="all">{locale === "es" ? "Toda intensidad" : "All intensity"}</option>
            <option value="soft">soft</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value as typeof filters.priority })} className="rounded border p-2 text-sm">
            <option value="all">{locale === "es" ? "Toda prioridad" : "All priority"}</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="optional">optional</option>
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((event) => <EventCard key={event.id} event={event} venue={places.find((p) => p.id === event.venuePlaceId)} locale={locale} />)}
        </div>
      </div>
      <PlacesSectionClient title={locale === "es" ? "Clubs y venues" : "Clubs and venues"} categories={["club"]} />
    </section>
  );
}
