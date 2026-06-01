import { describe, expect, it } from "vitest";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { placeImages } from "@/data/placeMedia";
import { places } from "@/data/places";
import { validateEvents, validateItinerary, validatePlaceImages, validatePlaces } from "@/lib/validation";

describe("content validation", () => {
  it("keeps places valid and sourced", () => {
    expect(validatePlaces(places)).toEqual([]);
  });

  it("keeps every place with practical opening guidance", () => {
    expect(places.filter((place) => !place.openingHours?.es || !place.openingHours.en).map((place) => place.id)).toEqual([]);
  });

  it("keeps events linked to venues", () => {
    expect(validateEvents(events, places)).toEqual([]);
  });

  it("keeps itinerary references valid", () => {
    expect(validateItinerary(itinerary, places, events)).toEqual([]);
  });

  it("keeps embedded place images licensed and attributed", () => {
    expect(validatePlaceImages(placeImages, places)).toEqual([]);
  });
});
