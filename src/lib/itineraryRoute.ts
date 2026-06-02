import type { NightlifeEvent } from "@/domain/event";
import type { ItineraryBlockKey, ItineraryDay, ItineraryItem } from "@/domain/itinerary";
import type { Place } from "@/domain/place";

const routeBlockOrder: ItineraryBlockKey[] = ["morning", "lunch", "afternoon", "dinner", "evening", "night"];
export const tripOriginPlaceId = "accommodation-nena-moritzplatz";

export type ItineraryRouteStop = {
  order: number;
  block: ItineraryBlockKey;
  item: ItineraryItem;
  place: Place;
  event?: NightlifeEvent;
};

export function getItineraryRouteStops(day: ItineraryDay, places: Place[], events: NightlifeEvent[]): ItineraryRouteStop[] {
  const placeById = new Map(places.map((place) => [place.id, place]));
  const eventById = new Map(events.map((event) => [event.id, event]));
  const seenPlaces = new Set<string>();
  const stops: ItineraryRouteStop[] = [];

  for (const block of routeBlockOrder) {
    for (const item of day.blocks[block]) {
      const event = item.eventId ? eventById.get(item.eventId) : undefined;
      const placeId = item.placeId ?? event?.venuePlaceId;
      if (!placeId || seenPlaces.has(placeId)) continue;
      if (placeId === tripOriginPlaceId) {
        seenPlaces.add(placeId);
        continue;
      }
      const place = placeById.get(placeId);
      if (!place?.coordinates) continue;
      seenPlaces.add(placeId);
      stops.push({ order: stops.length + 1, block, item, place, event });
    }
  }

  return stops;
}
