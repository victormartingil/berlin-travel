"use client";

import { ExternalLink, MapPin } from "lucide-react";
import type { Locale } from "@/domain/common";
import type { NightlifeEvent } from "@/domain/event";
import type { Place } from "@/domain/place";
import { t } from "@/lib/i18n";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";

export function EventCard({ event, venue, locale }: { event: NightlifeEvent; venue?: Place; locale: Locale }) {
  const labels = locale === "es" ? { maps: "Mapa", source: "Fuente", flyer: "Evento" } : { maps: "Maps", source: "Source", flyer: "Event" };
  return (
    <article className="space-y-3 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm text-zinc-600">
            {event.date} · {event.startTime}
            {event.endTime ? `-${event.endTime}` : ""} · {venue?.name ?? event.venuePlaceId}
          </p>
        </div>
        <span className="rounded-full bg-zinc-900 px-2 py-1 text-xs text-white">{event.fitScore}/5</span>
      </div>
      <p className="text-sm text-zinc-700">{t(event.style, locale)} · {event.intensity}</p>
      {event.summary ? <p className="text-sm text-zinc-700">{t(event.summary, locale)}</p> : null}
      <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
        {event.price ? <span className="rounded-full bg-zinc-100 px-2 py-1">{event.price}</span> : null}
        {event.lineup?.length ? <span className="rounded-full bg-zinc-100 px-2 py-1">{event.lineup.slice(0, 5).join(" · ")}</span> : null}
      </div>
      {event.doorPolicy ? <p className="text-sm text-zinc-600">{t(event.doorPolicy, locale)}</p> : null}
      {event.practicalNotes?.length ? (
        <ul className="space-y-1 text-sm text-zinc-600">
          {event.practicalNotes.map((note) => <li key={t(note, locale)}>· {t(note, locale)}</li>)}
        </ul>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {venue ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" href={buildGoogleMapsPlaceUrl(venue)} target="_blank" rel="noreferrer">
            <MapPin size={16} />
            {labels.maps}
          </a>
        ) : null}
        <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={event.ticketUrl ?? event.sourceUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          {labels.source}
        </a>
        {event.posterUrl ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={event.posterUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            {labels.flyer}
          </a>
        ) : null}
      </div>
    </article>
  );
}
