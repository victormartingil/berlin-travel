"use client";

import { CalendarCheck, ExternalLink, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/domain/common";
import type { Place } from "@/domain/place";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { PriceBadge, PriorityBadge, VerificationBadge } from "@/components/ui/Badges";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { getPlaceImages } from "@/data/placeMedia";
import { getPlaceRating } from "@/data/placeRatings";
import { useFavorites } from "@/hooks/useFavorites";
import { t, ui } from "@/lib/i18n";
import { getMapIconForCategory } from "@/lib/mapIcons";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { publicAssetPath } from "@/lib/paths";

const mealLabels = {
  breakfast: { es: "desayuno", en: "breakfast" },
  brunch: { es: "brunch", en: "brunch" },
  lunch: { es: "comida", en: "lunch" },
  dinner: { es: "cena", en: "dinner" },
  quick: { es: "rápido", en: "quick" },
  special: { es: "especial", en: "special" },
} as const;

const areaLabels = {
  near_base: { es: "cerca base", en: "near base" },
  near_museum: { es: "post-museo", en: "near museum" },
  near_market: { es: "ruta/mercado", en: "market route" },
  near_club: { es: "pre/post club", en: "pre/post club" },
  destination_worthy: { es: "merece desvío", en: "worth a detour" },
} as const;

export function PlaceCard({ place, locale }: { place: Place; locale: Locale }) {
  const fav = useFavorites();
  const isFav = fav.isFavorite(place.id);
  const rating = getPlaceRating(place.id);
  const icon = getMapIconForCategory(place.category);
  const image = getPlaceImages(place.id)[0];

  return (
    <article id={place.id} className="ui-surface group overflow-hidden scroll-mt-24 rounded-xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/places/${place.id}/`} className="relative block aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,var(--card-color),#1f2937)]" style={{ "--card-color": icon.color } as CSSProperties}>
        {image ? (
          <>
            <Image src={publicAssetPath(image.src)} alt={t(image.alt, locale)} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
            <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-1 text-[10px] text-white backdrop-blur">{image.license}</span>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.35),transparent_34%),linear-gradient(135deg,var(--card-color),#111827)] text-white">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur" dangerouslySetInnerHTML={{ __html: icon.svg }} />
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: icon.color }} />
          {t(icon.label, locale)}
        </span>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold leading-tight">
            <Link className="ui-link underline underline-offset-2" href={`/places/${place.id}/`}>
              {place.name}
            </Link>
          </h3>
          <p className="ui-muted mt-1 text-sm">
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
        <RatingBadge rating={rating} locale={locale} compact />
        {place.rainyDay ? <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">{t(ui.labels.rainy, locale)}</span> : null}
        {place.bookingRecommended ? <span className="rounded-full bg-fuchsia-100 px-2 py-1 text-xs text-fuchsia-800">{t(ui.labels.booking, locale)}</span> : null}
        {place.friendRecommended ? <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-900">{locale === "es" ? "consejo amigo" : "friend pick"}</span> : null}
        {place.cashless ? <span className="rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-800">{t(ui.labels.cashless, locale)}</span> : null}
        {place.diet ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-800">{place.diet.replace("_", " ")}</span> : null}
        {place.quickStop ? <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">{locale === "es" ? "rápido" : "quick stop"}</span> : null}
        {place.destinationWorthy ? <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800">{locale === "es" ? "merece desvío" : "worth a detour"}</span> : null}
        </div>

      {place.mealTypes?.length || place.areaUseCase?.length ? (
        <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
          {place.mealTypes?.map((meal) => <span key={meal}>{t(mealLabels[meal], locale)}</span>)}
          {place.areaUseCase?.map((useCase) => <span key={useCase}>· {t(areaLabels[useCase], locale)}</span>)}
        </div>
      ) : null}

      {place.openingHours || place.estimatedDuration ? (
        <div className="grid gap-1 text-sm text-zinc-600">
          {place.openingHours ? <p>{t(place.openingHours, locale)}</p> : null}
          {place.estimatedDuration ? <p>{place.estimatedDuration}</p> : null}
        </div>
      ) : null}

      {place.friendNote ? <p className="rounded-md bg-amber-50 p-2 text-sm text-amber-950">★ {t(place.friendNote, locale)}</p> : null}

      {place.practicalNotes?.length ? (
        <ul className="space-y-1 text-sm text-zinc-600">
          {place.practicalNotes.map((note) => (
            <li key={t(note, locale)}>• {t(note, locale)}</li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Link className="ui-button-primary inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm" href={`/places/${place.id}/`}>
          <ExternalLink size={16} />
          {locale === "es" ? "Detalle" : "Details"}
        </Link>
        <a className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm" href={buildGoogleMapsPlaceUrl(place)} target="_blank" rel="noreferrer">
          <MapPin size={16} />
          {t(ui.actions.maps, locale)}
        </a>
        <FavoriteButton active={isFav} onToggle={() => fav.toggle(place.id)} locale={locale} />
        {place.officialUrl ? (
          <a className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm" href={place.officialUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            {t(ui.actions.official, locale)}
          </a>
        ) : null}
        {place.sourceUrl && place.sourceUrl !== place.officialUrl ? (
          <a className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm" href={place.sourceUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} />
            {t(ui.actions.source, locale)}
          </a>
        ) : null}
        {place.ticketUrl ? (
          <a className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm" href={place.ticketUrl} target="_blank" rel="noreferrer">
            <Ticket size={16} />
            {t(ui.actions.ticket, locale)}
          </a>
        ) : null}
        {place.reservationUrl ? (
          <a className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm" href={place.reservationUrl} target="_blank" rel="noreferrer">
            <CalendarCheck size={16} />
            {t(ui.actions.reserve, locale)}
          </a>
        ) : null}
      </div>
      </div>
    </article>
  );
}
