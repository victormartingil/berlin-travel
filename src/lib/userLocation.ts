import type { Locale } from "@/domain/common";

export function normalizeHeading(heading: number): number {
  return ((heading % 360) + 360) % 360;
}

export function getCompassLabel(heading: number, locale: Locale): string {
  const labels = locale === "es" ? ["N", "NE", "E", "SE", "S", "SO", "O", "NO"] : ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalized = normalizeHeading(heading);
  const index = Math.round(normalized / 45) % labels.length;
  return labels[index] ?? labels[0];
}

export function getOrientationHeading(event: DeviceOrientationEvent): number | null {
  const compassHeading = Reflect.get(event, "webkitCompassHeading");
  if (typeof compassHeading === "number" && Number.isFinite(compassHeading)) {
    return normalizeHeading(compassHeading);
  }

  if (typeof event.alpha === "number" && Number.isFinite(event.alpha)) {
    return normalizeHeading(360 - event.alpha);
  }

  return null;
}
