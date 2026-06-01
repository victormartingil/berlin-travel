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

  it("keeps market places classified for filters", () => {
    const marketIds = [
      "berliner-troedelmarkt-strasse-17-juni",
      "arkonaplatz-flea-market",
      "antikmarkt-ostbahnhof",
      "rathaus-schoeneberg-flea-market",
      "fehrbelliner-platz-art-flea-market",
      "marheinekeplatz-flea-market",
    ];
    const addedMarkets = places.filter((place) => marketIds.includes(place.id));
    expect(addedMarkets).toHaveLength(marketIds.length);
    expect(addedMarkets.every((place) => place.category === "market" && place.tags.some((tag) => ["flea", "antiques", "food", "craft"].includes(tag)))).toBe(true);
    expect(addedMarkets.every((place) => place.tags.some((tag) => ["saturday", "sunday"].includes(tag)))).toBe(true);
  });

  it("keeps friend recommendations explicit and useful", () => {
    const friendPicks = places.filter((place) => place.friendRecommended);
    expect(friendPicks.map((place) => place.id).sort()).toEqual([
      "koepi-137",
      "mauerpark",
      "raw-gelaende",
      "tempelhofer-feld",
      "teufelsberg",
      "victory-column",
      "yaam",
    ]);
    expect(friendPicks.filter((place) => !place.friendNote?.es || !place.googleMapsUrl).map((place) => place.id)).toEqual([]);
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
