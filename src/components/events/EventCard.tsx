"use client";

import { ExternalLink, MapPin } from "lucide-react";
import type { Locale } from "@/domain/common";
import type { NightlifeEvent } from "@/domain/event";
import type { Place } from "@/domain/place";
import { t } from "@/lib/i18n";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";

export function EventCard({ event, venue, locale }: { event: NightlifeEvent; venue?: Place; locale: Locale }) {
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
      {event.doorPolicy ? <p className="text-sm text-zinc-600">{t(event.doorPolicy, locale)}</p> : null}
      <div className="flex flex-wrap gap-2">
        {venue ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" href={buildGoogleMapsPlaceUrl(venue)} target="_blank" rel="noreferrer">
            <MapPin size={16} />
            Maps
          </a>
        ) : null}
        <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={event.ticketUrl ?? event.sourceUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          Source
        </a>
      </div>
    </article>
  );
}
