import type { NightlifeEvent } from "@/domain/event";
import type { ItineraryDay } from "@/domain/itinerary";
import type { Place } from "@/domain/place";

const foodMetadataCategories = new Set(["vegetarian", "restaurant", "cafe", "bakery"]);

function hasValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return value.startsWith("/");
  }
}

export function validatePlaces(items: Place[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) errors.push(`duplicate place id: ${item.id}`);
    ids.add(item.id);
    if (!item.verification) errors.push(`missing verification: ${item.id}`);
    if (!item.sourceUrl && !item.officialUrl && !item.verification.sourceUrl && !item.verification.officialUrl) errors.push(`missing source: ${item.id}`);
    if (!item.lastVerifiedAt && !item.verification.lastVerifiedAt) errors.push(`missing lastVerifiedAt: ${item.id}`);
    if (foodMetadataCategories.has(item.category)) {
      if (!item.mealTypes?.length) errors.push(`missing mealTypes: ${item.id}`);
      if (!item.areaUseCase?.length) errors.push(`missing areaUseCase: ${item.id}`);
      if (!item.diet) errors.push(`missing diet: ${item.id}`);
    }
    for (const url of [item.sourceUrl, item.officialUrl, item.ticketUrl, item.reservationUrl].filter(Boolean)) {
      if (url && !hasValidUrl(url)) errors.push(`invalid url for ${item.id}: ${url}`);
    }
  }
  return errors;
}

export function validateEvents(events: NightlifeEvent[], places: Place[]): string[] {
  const errors: string[] = [];
  const placeIds = new Set(places.map((p) => p.id));
  const ids = new Set<string>();
  for (const event of events) {
    if (ids.has(event.id)) errors.push(`duplicate event id: ${event.id}`);
    ids.add(event.id);
    if (!placeIds.has(event.venuePlaceId)) errors.push(`missing venue: ${event.id}`);
    if (!hasValidUrl(event.sourceUrl)) errors.push(`invalid event source: ${event.id}`);
    if (!event.verification.lastVerifiedAt) errors.push(`missing event lastVerifiedAt: ${event.id}`);
  }
  return errors;
}

export function validateItinerary(days: ItineraryDay[], places: Place[], events: NightlifeEvent[]): string[] {
  const errors: string[] = [];
  const placeIds = new Set(places.map((p) => p.id));
  const eventIds = new Set(events.map((e) => e.id));
  for (const day of days) {
    for (const items of Object.values(day.blocks)) {
      for (const item of items) {
        if (item.placeId && !placeIds.has(item.placeId)) errors.push(`missing itinerary place: ${item.id}`);
        if (item.eventId && !eventIds.has(item.eventId)) errors.push(`missing itinerary event: ${item.id}`);
      }
    }
  }
  return errors;
}
