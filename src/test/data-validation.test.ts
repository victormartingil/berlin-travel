import { describe, expect, it } from "vitest";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { places } from "@/data/places";
import { validateEvents, validateItinerary, validatePlaces } from "@/lib/validation";

describe("content validation", () => {
  it("keeps places valid and sourced", () => {
    expect(validatePlaces(places)).toEqual([]);
  });

  it("keeps events linked to venues", () => {
    expect(validateEvents(events, places)).toEqual([]);
  });

  it("keeps itinerary references valid", () => {
    expect(validateItinerary(itinerary, places, events)).toEqual([]);
  });
});
