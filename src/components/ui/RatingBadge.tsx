import { Star } from "lucide-react";
import type { Locale } from "@/domain/common";
import type { PlaceRatingSnapshot } from "@/domain/place";

function formatReviewCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", { notation: value >= 1000 ? "compact" : "standard" }).format(value);
}

export function RatingBadge({ rating, locale, compact = false }: { rating?: PlaceRatingSnapshot; locale: Locale; compact?: boolean }) {
  if (!rating) return null;
  const label =
    locale === "es"
      ? `Google Maps: ${rating.rating.toFixed(1)} estrellas, ${formatReviewCount(rating.reviewCount, locale)} reseñas. Verificado ${rating.lastVerifiedAt}.`
      : `Google Maps: ${rating.rating.toFixed(1)} stars, ${formatReviewCount(rating.reviewCount, locale)} reviews. Verified ${rating.lastVerifiedAt}.`;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900" aria-label={label} title={label}>
      <Star size={13} fill="currentColor" aria-hidden="true" />
      <span>{rating.rating.toFixed(1)}</span>
      <span className="text-amber-800">({formatReviewCount(rating.reviewCount, locale)})</span>
      {!compact ? <span className="text-amber-800">Google</span> : null}
    </span>
  );
}
