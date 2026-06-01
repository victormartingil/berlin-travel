import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/domain/common";
import type { NightlifeEvent } from "@/domain/event";
import type { ItineraryDay } from "@/domain/itinerary";
import type { Place } from "@/domain/place";
import { DayRouteMap } from "@/components/itinerary/DayRouteMap";
import { isFoodPlace, sortFood } from "@/lib/food";
import { t } from "@/lib/i18n";
import { buildGoogleMapsDirectionsUrl, buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { getMapIconForCategory } from "@/lib/mapIcons";

const blockLabels = {
  morning: { es: "Arranque del dia", en: "Start of the day" },
  lunch: { es: "Pausa y recarga", en: "Pause and refuel" },
  afternoon: { es: "Bloque principal", en: "Main route block" },
  dinner: { es: "Cena flexible", en: "Flexible dinner" },
  evening: { es: "Atardecer y transicion", en: "Sunset and transition" },
  night: { es: "Noche elegida", en: "Selected night" },
  alternatives: { es: "Comodines", en: "Backups" },
} as const;

const blockDescriptions = {
  morning: {
    es: "Primer tramo realista: empezar bien, sin gastar toda la energia demasiado pronto.",
    en: "A realistic first stretch: start well without burning all your energy too early.",
  },
  lunch: {
    es: "Pausa util para ajustar ritmo, clima y hambre antes del siguiente bloque.",
    en: "A useful pause to recalibrate pace, weather and hunger before the next block.",
  },
  afternoon: {
    es: "La parte que mas define el dia: museos, barrios, historia o plan alternativo.",
    en: "The part that defines the day most: museums, neighborhoods, history or alternative culture.",
  },
  dinner: {
    es: "Resolver cena cerca de la ruta, o cambiar a algo especial si el cuerpo acompana.",
    en: "Solve dinner near the route, or switch to something special if energy allows.",
  },
  evening: {
    es: "Tramo de luz baja y transicion: paseo, rio, parque o calentamiento suave.",
    en: "Low-light transition slot: walk, river, park or soft warm-up.",
  },
  night: {
    es: "Elegir solo si apetece de verdad: evento, club o retirada inteligente.",
    en: "Commit only if it really fits: event, club or a smart retreat.",
  },
  alternatives: {
    es: "Opciones para lluvia, cansancio, cambio de barrio o improvisacion buena.",
    en: "Options for rain, tiredness, area changes or good improvisation.",
  },
} as const;

const minimumLinkLabelLength = 4;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function placeLinkLabels(place: Place): string[] {
  const labels = new Set([place.name]);
  if (place.name.endsWith(" Berlin")) labels.add(place.name.replace(/ Berlin$/, ""));
  if (place.name.includes(" - ")) place.name.split(" - ").forEach((part) => labels.add(part));
  if (place.name === "Cafe Vux") labels.add("Café Vux");
  if (place.name === "Voner") labels.add("Vöner");
  if (place.name === "REWE voll pflanzlich Warschauer") labels.add("REWE voll pflanzlich");
  return [...labels].filter((label) => label.length >= minimumLinkLabelLength);
}

function linkedText(value: string, places: Place[]): ReactNode {
  const candidates = places
    .flatMap((place) => placeLinkLabels(place).map((label) => ({ label, place })))
    .sort((a, b) => b.label.length - a.label.length);
  if (!candidates.length) return value;

  const pattern = new RegExp(`\\b(${candidates.map((candidate) => escapeRegExp(candidate.label)).join("|")})\\b`, "g");
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of value.matchAll(pattern)) {
    const label = match[0];
    const index = match.index ?? 0;
    const candidate = candidates.find((item) => item.label === label);
    if (!candidate) continue;
    if (index > lastIndex) nodes.push(value.slice(lastIndex, index));
    nodes.push(
      <Link key={`${candidate.place.id}-${index}`} href={`/places/${candidate.place.id}/`} className="font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-2">
        {label}
      </Link>,
    );
    lastIndex = index + label.length;
  }
  if (lastIndex < value.length) nodes.push(value.slice(lastIndex));
  return nodes.length ? nodes : value;
}

function foodBackups(blockName: string, blockPlaces: Place[], allPlaces: Place[]): Place[] {
  if (blockName !== "lunch" && blockName !== "dinner") return [];
  if (!blockPlaces.length) return [];
  const neighbourhoods = new Set(blockPlaces.map((place) => place.neighbourhood));
  return allPlaces
    .filter(isFoodPlace)
    .filter((place) => neighbourhoods.has(place.neighbourhood))
    .filter((place) => !blockPlaces.some((blockPlace) => blockPlace.id === place.id))
    .sort(sortFood)
    .slice(0, 3);
}

function placeContext(place: Place, locale: Locale): string {
  const categoryLabel = t(getMapIconForCategory(place.category).label, locale);
  return `${categoryLabel} · ${t(place.description, locale)}`;
}

function eventContext(event: NightlifeEvent, venue: Place | undefined, locale: Locale): string {
  const style = t(event.style, locale);
  if (!venue) return locale === "es" ? `Evento · ${style}` : `Event · ${style}`;
  const area = venue.neighbourhood ? ` · ${venue.neighbourhood}` : "";
  return locale === "es" ? `Evento · ${style} en ${venue.name}${area}` : `Event · ${style} at ${venue.name}${area}`;
}

export function DayPlan({ day, locale, places, events }: { day: ItineraryDay; locale: Locale; places: Place[]; events: NightlifeEvent[] }) {
  const labels =
    locale === "es"
      ? { detail: "Ficha", maps: "Mapa", route: "Ruta", source: "Fuente", flyer: "Evento" }
      : { detail: "Details", maps: "Map", route: "Route", source: "Source", flyer: "Event" };
  return (
    <article className="space-y-4 rounded-md border border-zinc-200 bg-white p-4">
      <h3 className="text-lg font-semibold">{t(day.label, locale)}</h3>
      <DayRouteMap day={day} locale={locale} places={places} events={events} />
      {Object.entries(day.blocks).map(([name, items]) =>
        items.length ? (
          <section key={name} className="space-y-2">
            <div>
              <h4 className="text-sm font-medium uppercase text-zinc-500">{t(blockLabels[name as keyof typeof blockLabels], locale)}</h4>
              <p className="mt-1 text-xs text-zinc-500">{t(blockDescriptions[name as keyof typeof blockDescriptions], locale)}</p>
            </div>
            <div className="space-y-2">
              {items.map((item) => {
                const place = item.placeId ? places.find((p) => p.id === item.placeId) : undefined;
                const event = item.eventId ? events.find((e) => e.id === item.eventId) : undefined;
                const eventVenue = event ? places.find((p) => p.id === event.venuePlaceId) : undefined;
                const linkedPlace = place ?? eventVenue;
                const destination = linkedPlace?.address ?? linkedPlace?.name;
                const origin = item.routeFromPlaceId ? places.find((p) => p.id === item.routeFromPlaceId) : undefined;
                return (
                  <div key={item.id} className="rounded-md bg-zinc-50 p-3 text-sm">
                    <p className="font-medium">{linkedText(t(item.title, locale), places)}</p>
                    {item.note ? <p className="mt-1 text-zinc-600">{linkedText(t(item.note, locale), places)}</p> : null}
                    {linkedPlace ? (
                      <p className="mt-2 rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-700">
                        <span className="font-semibold text-zinc-950">{event ? eventContext(event, eventVenue, locale) : placeContext(linkedPlace, locale)}</span>
                        {event && eventVenue ? <span className="mt-1 block">{placeContext(eventVenue, locale)}</span> : null}
                      </p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {linkedPlace ? (
                        <>
                          <Link className="inline-flex items-center gap-1 rounded bg-emerald-900 px-2 py-1 text-xs text-white" href={`/places/${linkedPlace.id}/`}>
                            {labels.detail}: {linkedPlace.name}
                          </Link>
                          <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={buildGoogleMapsPlaceUrl(linkedPlace)} target="_blank" rel="noreferrer">
                            <MapPin size={14} />
                            {labels.maps}
                          </a>
                        </>
                      ) : null}
                      {origin && destination ? (
                        <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={buildGoogleMapsDirectionsUrl(origin.address ?? origin.name, destination, item.routeMode ?? "walking")} target="_blank" rel="noreferrer">
                          <MapPin size={14} />
                          {labels.route}
                        </a>
                      ) : null}
                      {event ? (
                        <>
                          <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={event.ticketUrl ?? event.sourceUrl} target="_blank" rel="noreferrer">
                            <ExternalLink size={14} />
                            {event.title}
                          </a>
                          {event.posterUrl ? (
                            <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={event.posterUrl} target="_blank" rel="noreferrer">
                              <ExternalLink size={14} />
                              {labels.flyer}
                            </a>
                          ) : null}
                        </>
                      ) : null}
                      {item.externalUrl ? (
                        <a className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs" href={item.externalUrl} target="_blank" rel="noreferrer">
                          <ExternalLink size={14} />
                          {labels.source}
                        </a>
                      ) : null}
                    </div>
                    {event ? (
                      <div className="mt-3 rounded-md border border-zinc-200 bg-white p-3 text-xs text-zinc-700">
                        {event.summary ? <p className="font-medium">{t(event.summary, locale)}</p> : null}
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-zinc-100 px-2 py-1">{event.date}</span>
                          <span className="rounded-full bg-zinc-100 px-2 py-1">{event.startTime}{event.endTime ? `-${event.endTime}` : ""}</span>
                          {event.price ? <span className="rounded-full bg-zinc-100 px-2 py-1">{event.price}</span> : null}
                          <span className="rounded-full bg-zinc-100 px-2 py-1">{t(event.style, locale)}</span>
                        </div>
                        {event.lineup?.length ? <p className="mt-2">{event.lineup.join(" · ")}</p> : null}
                        {event.practicalNotes?.length ? (
                          <ul className="mt-2 space-y-1 text-zinc-600">
                            {event.practicalNotes.map((note) => <li key={t(note, locale)}>· {t(note, locale)}</li>)}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}
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
                      <Link key={place.id} className="rounded bg-white px-2 py-1 text-xs text-emerald-950 underline decoration-emerald-300 underline-offset-2" href={`/places/${place.id}/`}>
                        {place.name}
                      </Link>
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
