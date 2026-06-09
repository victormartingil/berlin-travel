import { describe, expect, it } from "vitest";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { placeImages } from "@/data/placeMedia";
import { placeRatings } from "@/data/placeRatings";
import { places } from "@/data/places";
import { validateEvents, validateItinerary, validatePlaceImages, validatePlaceRatings, validatePlaces } from "@/lib/validation";

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
      "about-blank",
      "arkonaplatz-flea-market",
      "berghain",
      "berliner-ensemble",
      "biergarten-jockel",
      "buya-ramen-kreuzberg",
      "curry-36-mehringdamm",
      "east-side-gallery",
      "eckkneipe-mariannenplatz",
      "else",
      "friedrichshain-neighbourhood",
      "goerlitzer-park",
      "hamburger-bahnhof",
      "hasenheide",
      "holzmarkt-25",
      "humboldthain-club",
      "huxleys-neue-welt",
      "klunkerkranich",
      "koepi-137",
      "markthalle-neun",
      "maroush-kreuzberg",
      "mauerpark",
      "maxim-gorki-studio-ya",
      "maybachufer-market",
      "ming-dynastie-jannowitzbruecke",
      "moebel-olfe",
      "museum-island-pergamon-panorama",
      "nefis-gemuesekebab-kreuzberg",
      "neue-zukunft",
      "nis-restaurant",
      "pirata-patata",
      "poesiefestival-berlin-2026",
      "potsdam-sanssouci",
      "raw-gelaende",
      "ritter-sport-bunte-schokowelt",
      "rso-berlin",
      "sahara-imbiss-kreuzberg",
      "sisyphos",
      "spree-boat-rental",
      "stressfaktor-calendar",
      "suedblock",
      "tempelhofer-feld",
      "teufelsberg",
      "tresor",
      "urban-nation",
      "urban-spree",
      "victory-column",
      "yaam",
    ]);
    expect(friendPicks.filter((place) => !place.friendNote?.es || (!place.googleMapsUrl && !place.googleMapsQuery)).map((place) => place.id)).toEqual([]);
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

  it("keeps every place card backed by media", () => {
    const mediaPlaceIds = new Set(placeImages.map((image) => image.placeId));
    expect(places.filter((place) => !mediaPlaceIds.has(place.id)).map((place) => place.id)).toEqual([]);
  });

  it("keeps external rating snapshots coherent when present", () => {
    expect(validatePlaceRatings(placeRatings, places)).toEqual([]);
  });
});
