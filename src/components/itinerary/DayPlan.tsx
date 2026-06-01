import { ExternalLink, MapPin } from "lucide-react";
import type { Locale } from "@/domain/common";
import type { NightlifeEvent } from "@/domain/event";
import type { ItineraryDay } from "@/domain/itinerary";
import type { Place } from "@/domain/place";
import { isFoodPlace, sortFood } from "@/lib/food";
import { t } from "@/lib/i18n";
import { buildGoogleMapsDirectionsUrl, buildGoogleMapsPlaceUrl } from "@/lib/maps";

const blockLabels = {
  morning: { es: "Manana", en: "Morning" },
  lunch: { es: "Comida", en: "Lunch" },
  afternoon: { es: "Tarde", en: "Afternoon" },
  dinner: { es: "Cena", en: "Dinner" },
  evening: { es: "Atardecer", en: "Evening" },
  night: { es: "Noche", en: "Night" },
  alternatives: { es: "Alternativas", en: "Alternatives" },
} as const;

function foodBackups(blockName: string, blockPlaces: Place[], allPlaces: Place[]): Place[] {
  if (blockName !== "lunch" && blockName !== "dinner") return [];
  const neighbourhoods = new Set(blockPlaces.map((place) => place.neighbourhood));
  const preferredMeal = blockName === "lunch" ? "lunch" : "dinner";
  return allPlaces
    .filter(isFoodPlace)
    .filter((place) => neighbourhoods.has(place.neighbourhood) || place.mealTypes?.includes(preferredMeal))
    .filter((place) => !blockPlaces.some((blockPlace) => blockPlace.id === place.id))
    .sort(sortFood)
    .slice(0, 3);
}

export function DayPlan({ day, locale, places, events }: { day: ItineraryDay; locale: Locale; places: Place[]; events: NightlifeEvent[] }) {
  return (
    <article className="space-y-4 rounded-md border border-zinc-200 bg-white p-4">
      <h3 className="text-lg font-semibold">{t(day.label, locale)}</h3>
      {Object.entries(day.blocks).map(([name, items]) =>
        items.length ? (
          <section key={name} className="space-y-2">
            <h4 className="text-sm font-medium uppercase text-zinc-500">{t(blockLabels[name as keyof typeof blockLabels], locale)}</h4>
            <div className="space-y-2">
              {items.map((item) => {
                const place = item.placeId ? places.find((p) => p.id === item.placeId) : undefined;
                const event = item.eventId ? events.find((e) => e.id === item.eventId) : undefined;
                const destination = place?.address ?? place?.name;
                const origin = item.routeFromPlaceId ? places.find((p) => p.id === item.routeFromPlaceId) : undefined;
                return (
                  <div key={item.id} className="rounded-md bg-zinc-50 p-3 text-sm">
                    <p className="font-medium">{t(item.title, locale)}</p>
                    {item.note ? <p className="mt-1 text-zinc-600">{t(item.note, locale)}</p> : null}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {place ? (
                        <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={buildGoogleMapsPlaceUrl(place)} target="_blank" rel="noreferrer">
                          <MapPin size={14} />
                          {place.name}
                        </a>
                      ) : null}
                      {origin && destination ? (
                        <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={buildGoogleMapsDirectionsUrl(origin.address ?? origin.name, destination, item.routeMode ?? "walking")} target="_blank" rel="noreferrer">
                          <MapPin size={14} />
                          Route
                        </a>
                      ) : null}
                      {event ? (
                        <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={event.ticketUrl ?? event.sourceUrl} target="_blank" rel="noreferrer">
                          <ExternalLink size={14} />
                          {event.title}
                        </a>
                      ) : null}
                      {item.externalUrl ? (
                        <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={item.externalUrl} target="_blank" rel="noreferrer">
                          <ExternalLink size={14} />
                          Source
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            {(() => {
              const blockPlaces = items.map((item) => (item.placeId ? places.find((place) => place.id === item.placeId) : undefined)).filter(Boolean) as Place[];
              const backups = foodBackups(name, blockPlaces, places);
              return backups.length ? (
                <div className="rounded-md border border-emerald-100 bg-emerald-50 p-3 text-sm">
                  <p className="font-medium text-emerald-950">{locale === "es" ? "Alternativas de comida cerca" : "Nearby food backups"}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {backups.map((place) => (
                      <a key={place.id} className="rounded bg-white px-2 py-1 text-xs text-emerald-950" href={buildGoogleMapsPlaceUrl(place)} target="_blank" rel="noreferrer">
                        {place.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </section>
        ) : null,
      )}
    </article>
  );
}
