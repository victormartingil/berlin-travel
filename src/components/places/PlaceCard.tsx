"use client";
import type { Place } from "@/domain/place";
import type { Locale } from "@/domain/common";
import { t } from "@/lib/i18n";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { VerificationBadge, PriceBadge } from "@/components/ui/Badges";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

export function PlaceCard({ place, locale }: { place: Place; locale: Locale }) {
  const fav = useFavorites();
  const isFav = fav.isFavorite(place.id);
  return (
    <article className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{place.name}</h3>
        <VerificationBadge status={place.verification.status} />
      </div>
      <p className="text-sm text-zinc-600">{t(place.description, locale)}</p>
      <div className="flex gap-2 text-xs text-zinc-600">
        <span>{place.category}</span>
        <span>· {place.neighbourhood}</span>
        <PriceBadge value={place.priceLevel} />
      </div>
      <div className="flex flex-wrap gap-2">
        <a className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" href={buildGoogleMapsPlaceUrl(place)} target="_blank" rel="noreferrer">Maps</a>
        <FavoriteButton active={isFav} onToggle={() => fav.toggle(place.id)} />
        {place.verification.sourceUrl ? <a className="rounded-md bg-zinc-100 px-3 py-2 text-sm" href={place.verification.sourceUrl} target="_blank" rel="noreferrer">Source</a> : null}
      </div>
    </article>
  );
}
