"use client";

import { CalendarCheck, ExternalLink, MapPin, Ticket } from "lucide-react";
import type { Locale } from "@/domain/common";
import type { Place } from "@/domain/place";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { PriceBadge, PriorityBadge, VerificationBadge } from "@/components/ui/Badges";
import { useFavorites } from "@/hooks/useFavorites";
import { t, ui } from "@/lib/i18n";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";

export function PlaceCard({ place, locale }: { place: Place; locale: Locale }) {
  const fav = useFavorites();
  const isFav = fav.isFavorite(place.id);

  return (
    <article className="space-y-3 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold leading-tight">{place.name}</h3>
          <p className="mt-1 text-sm text-zinc-600">
            {place.neighbourhood}
            {place.address ? ` · ${place.address}` : ""}
          </p>
        </div>
        <VerificationBadge status={place.verification.status} locale={locale} />
      </div>

      <p className="text-sm text-zinc-700">{t(place.description, locale)}</p>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700">{place.category}</span>
        <PriorityBadge value={place.priority} />
        <PriceBadge value={place.priceLevel} />
        {place.rainyDay ? <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">{t(ui.labels.rainy, locale)}</span> : null}
        {place.bookingRecommended ? <span className="rounded-full bg-fuchsia-100 px-2 py-1 text-xs text-fuchsia-800">{t(ui.labels.booking, locale)}</span> : null}
        {place.cashless ? <span className="rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-800">{t(ui.labels.cashless, locale)}</span> : null}
      </div>

      {place.openingHours || place.estimatedDuration ? (
        <div className="grid gap-1 text-sm text-zinc-600">
          {place.openingHours ? <p>{t(place.openingHours, locale)}</p> : null}
          {place.estimatedDuration ? <p>{place.estimatedDuration}</p> : null}
        </div>
      ) : null}

      {place.practicalNotes?.length ? (
        <ul className="space-y-1 text-sm text-zinc-600">
          {place.practicalNotes.map((note) => (
            <li key={t(note, locale)}>• {t(note, locale)}</li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <a className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" href={buildGoogleMapsPlaceUrl(place)} target="_blank" rel="noreferrer">
          <MapPin size={16} />
          {t(ui.actions.maps, locale)}
        </a>
        <FavoriteButton active={isFav} onToggle={() => fav.toggle(place.id)} locale={locale} />
        {place.officialUrl ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={place.officialUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            {t(ui.actions.official, locale)}
          </a>
        ) : null}
        {place.sourceUrl && place.sourceUrl !== place.officialUrl ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={place.sourceUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            {t(ui.actions.source, locale)}
          </a>
        ) : null}
        {place.ticketUrl ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={place.ticketUrl} target="_blank" rel="noreferrer">
            <Ticket size={16} />
            {t(ui.actions.ticket, locale)}
          </a>
        ) : null}
        {place.reservationUrl ? (
          <a className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm" href={place.reservationUrl} target="_blank" rel="noreferrer">
            <CalendarCheck size={16} />
            {t(ui.actions.reserve, locale)}
          </a>
        ) : null}
      </div>
    </article>
  );
}
