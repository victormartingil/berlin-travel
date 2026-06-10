import type { Locale } from "@/domain/common";

export type Coordinates = { lat: number; lng: number };
export type RoutePreviewTone = "short" | "medium" | "long";

export type RoutePreviewMetrics = {
  airDistanceKm: number;
  walkingDistanceKm: number;
  durationMin: number;
  distanceLabel: string;
  durationLabel: string;
  tone: RoutePreviewTone;
};

const WALKING_DISTANCE_FACTOR = 1.22;
const WALKING_SPEED_KMH = 4.8;

export function getHaversineDistanceKm(origin: Coordinates, destination: Coordinates): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLng = toRadians(destination.lng - origin.lng);
  const originLat = toRadians(origin.lat);
  const destinationLat = toRadians(destination.lat);

  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(originLat) * Math.cos(destinationLat) * Math.sin(deltaLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function formatDistanceKm(distanceKm: number, locale: Locale): string {
  const value = distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm).toString();
  return locale === "es" ? `${value} km a pie` : `${value} km walk`;
}

export function formatDurationMinutes(durationMin: number, locale: Locale): string {
  if (durationMin < 60) {
    return locale === "es" ? `${durationMin} min andando` : `${durationMin} min walk`;
  }

  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;
  if (minutes === 0) {
    return locale === "es" ? `${hours} h andando` : `${hours} h walk`;
  }

  return locale === "es" ? `${hours} h ${minutes} min andando` : `${hours} h ${minutes} min walk`;
}

export function getRoutePreviewTone(durationMin: number): RoutePreviewTone {
  if (durationMin < 12) return "short";
  if (durationMin <= 25) return "medium";
  return "long";
}

export function getRoutePreviewToneLabel(tone: RoutePreviewTone, locale: Locale): string {
  if (locale === "es") {
    if (tone === "short") return "Paseo corto";
    if (tone === "medium") return "Paseo razonable";
    return "Mejor pensarlo con transporte";
  }

  if (tone === "short") return "Short walk";
  if (tone === "medium") return "Reasonable walk";
  return "Better by transit";
}

export function getRoutePreviewMetrics(origin: Coordinates, destination: Coordinates, locale: Locale): RoutePreviewMetrics {
  const airDistanceKm = getHaversineDistanceKm(origin, destination);
  const walkingDistanceKm = airDistanceKm * WALKING_DISTANCE_FACTOR;
  const durationMin = Math.max(1, Math.round((walkingDistanceKm / WALKING_SPEED_KMH) * 60));
  const tone = getRoutePreviewTone(durationMin);

  return {
    airDistanceKm,
    walkingDistanceKm,
    durationMin,
    distanceLabel: formatDistanceKm(walkingDistanceKm, locale),
    durationLabel: formatDurationMinutes(durationMin, locale),
    tone,
  };
}
