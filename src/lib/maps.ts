import type { Place } from "@/domain/place";

export function buildGoogleMapsPlaceUrl(place: Place): string {
  if (place.coordinates) {
    return `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`;
  }
  const q = encodeURIComponent(place.googleMapsQuery ?? `${place.name} ${place.neighbourhood} Berlin`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function buildGoogleMapsDirectionsUrl(origin: string, destination: string, mode: "walking" | "transit" | "bicycling" = "walking"): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
}
