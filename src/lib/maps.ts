import type { Place } from "@/domain/place";

export function buildGoogleMapsPlaceUrl(place: Place): string {
  if (place.googleMapsUrl) return place.googleMapsUrl;
  const q = encodeURIComponent(place.googleMapsQuery ?? `${place.name}${place.address ? `, ${place.address}` : `, ${place.neighbourhood}, Berlin`}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function buildGoogleMapsDirectionsUrl(origin: string, destination: string, mode: "walking" | "transit" | "bicycling" = "walking"): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
}
