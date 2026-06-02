"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { PlaceFilters } from "@/components/filters/PlaceFilters";
import { PlaceCard } from "@/components/places/PlaceCard";
import { places } from "@/data/places";
import type { Place, PlaceCategory } from "@/domain/place";
import { filterPlaces, defaultPlaceFilters } from "@/lib/filters";
import { foodCategories, isFoodPlace, sortFood } from "@/lib/food";

const zoneDefinitions = [
  { id: "Kreuzberg", label: { es: "Kreuzberg/base", en: "Kreuzberg/base" }, helper: { es: "Comodines cerca del alojamiento y Bergmannkiez.", en: "Backups near the base and Bergmannkiez." } },
  { id: "Neukolln", label: { es: "Neukolln/Maybachufer", en: "Neukolln/Maybachufer" }, helper: { es: "Para mercado, Nowkoelln y cenas tranquilas.", en: "For market days, Nowkoelln and relaxed dinners." } },
  { id: "Friedrichshain", label: { es: "Friedrichshain/Boxi", en: "Friedrichshain/Boxi" }, helper: { es: "Rápido o cena si el día acaba por Boxhagener Platz.", en: "Quick food or dinner if the day ends around Boxhagener Platz." } },
  { id: "Mitte", label: { es: "Mitte/museos", en: "Mitte/museums" }, helper: { es: "Desayuno, post-museo o cena especial.", en: "Breakfast, post-museum or special dinner." } },
  { id: "Prenzlauer Berg", label: { es: "Prenzlauer Berg", en: "Prenzlauer Berg" }, helper: { es: "Brunch o cena que justifican desvío.", en: "Brunch or dinner worth a detour." } },
  { id: "Schoneberg", label: { es: "Schoneberg/URBAN NATION", en: "Schoneberg/URBAN NATION" }, helper: { es: "Opción especial si el plan cae por Buelowstrasse.", en: "Special option if the plan lands near Buelowstrasse." } },
] as const;

function zoneItems(zoneId: string, allPlaces: Place[]): Place[] {
  return allPlaces.filter(isFoodPlace).filter((place) => place.neighbourhood === zoneId).sort(sortFood);
}

export function FoodPageClient() {
  const { locale } = useLocale();
  const categories: PlaceCategory[] = [...foodCategories];
  const [filters, setFilters] = useState({ ...defaultPlaceFilters, categories });

  const foodPlaces = useMemo(() => places.filter(isFoodPlace).sort(sortFood), []);
  const neighbourhoods = useMemo(() => Array.from(new Set(foodPlaces.map((p) => p.neighbourhood))).sort(), [foodPlaces]);
  const filtered = useMemo(() => filterPlaces(places, filters).filter(isFoodPlace).sort(sortFood), [filters]);
  const reserveBefore = useMemo(() => foodPlaces.filter((place) => place.bookingRecommended).slice(0, 4), [foodPlaces]);

  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-zinc-950 p-5 text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">{locale === "es" ? "Comida util por zonas" : "Useful food by area"}</p>
        <h1 className="mt-2 text-3xl font-semibold">{locale === "es" ? "Comer durante el viaje" : "Eating during the trip"}</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-300">
          {locale === "es"
            ? "No es una lista infinita: son opciones vegetarianas/veganas pensadas para dias reales del itinerario, lluvia, museos, mercados y noches de club."
            : "Not an endless list: vegetarian/vegan options mapped to real itinerary days, rain, museums, markets and club nights."}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {reserveBefore.map((place) => (
          <a key={place.id} href={place.reservationUrl ?? place.officialUrl ?? place.sourceUrl} target="_blank" rel="noreferrer" className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm">
            <span className="font-medium">{locale === "es" ? "Reservar antes" : "Reserve ahead"}</span>
            <span className="mt-1 block text-zinc-700">{place.name}</span>
          </a>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{locale === "es" ? "Filtrar por momento y contexto" : "Filter by moment and context"}</h2>
        <PlaceFilters filters={filters} setFilters={setFilters} categories={categories} neighbourhoods={neighbourhoods} locale={locale} showFoodFilters />
        <p className="text-sm text-zinc-600">{filtered.length} {locale === "es" ? "resultados" : "results"}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((place) => <PlaceCard key={place.id} place={place} locale={locale} />)}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{locale === "es" ? "Comer por zonas" : "Eat by area"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {zoneDefinitions.map((zone) => {
            const items = zoneItems(zone.id, foodPlaces);
            return (
              <section key={zone.id} className="rounded-md border border-zinc-200 bg-white p-4">
                <h3 className="font-semibold">{zone.label[locale]}</h3>
                <p className="mt-1 text-sm text-zinc-600">{zone.helper[locale]}</p>
                <div className="mt-3 space-y-2">
                  {items.map((place) => (
                    <a key={place.id} href={`#${place.id}`} className="block rounded bg-zinc-50 p-2 text-sm">
                      <span className="font-medium">{place.name}</span>
                      <span className="block text-xs text-zinc-500">{place.mealTypes?.join(" · ")}</span>
                    </a>
                  ))}
                  {items.length === 0 ? <p className="text-sm text-zinc-500">{locale === "es" ? "Sin opcion curada por ahora." : "No curated option yet."}</p> : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
