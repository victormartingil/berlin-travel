import type { Place } from "@/domain/place";

export function buildGoogleMapsPlaceUrl(place: Place): string {
  if (place.googleMapsUrl) return place.googleMapsUrl;
  const q = encodeURIComponent(place.googleMapsQuery ?? `${place.name}${place.address ? `, ${place.address}` : `, ${place.neighbourhood}, Berlin`}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function buildGoogleMapsDirectionsUrl(origin: string, destination: string, mode: "walking" | "transit" | "bicycling" = "walking"): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
}

export function buildGoogleMapsRouteUrl(stops: string[], mode: "walking" | "transit" | "bicycling" = "walking"): string {
  const cleanStops = stops.filter(Boolean);
  if (cleanStops.length < 2) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanStops[0] ?? "Berlin")}`;
  const [origin, ...rest] = cleanStops;
  const destination = rest.at(-1) ?? origin;
  const waypoints = rest.slice(0, -1);
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: mode,
  });
  if (waypoints.length) params.set("waypoints", waypoints.join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
