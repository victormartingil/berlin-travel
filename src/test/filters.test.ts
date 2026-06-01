import { describe, expect, it } from "vitest";
import { places } from "@/data/places";
import { events } from "@/data/events";
import { getFoodByArea, getFoodNearItineraryDay } from "@/lib/food";
import { defaultEventFilters, defaultPlaceFilters, filterEvents, filterPlaces } from "@/lib/filters";

describe("filterPlaces", () => {
  it("filters by category", () => {
    const result = filterPlaces(places, { ...defaultPlaceFilters, categories: ["museum"] });
    expect(result.every((p) => p.category === "museum")).toBe(true);
  });

  it("filters by verification", () => {
    const result = filterPlaces(places, { ...defaultPlaceFilters, verification: "unknown" });
    expect(result.every((p) => p.verification.status === "unknown")).toBe(true);
  });

  it("filters by priority", () => {
    const result = filterPlaces(places, { ...defaultPlaceFilters, priority: "essential" });
    expect(result.every((p) => p.priority === "essential")).toBe(true);
  });

  it("filters food by meal, area use case and diet", () => {
    const result = filterPlaces(places, { ...defaultPlaceFilters, categories: ["vegetarian", "restaurant", "cafe", "bakery"], mealType: "dinner", areaUseCase: "destination_worthy", diet: "vegan" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.mealTypes?.includes("dinner") && p.areaUseCase?.includes("destination_worthy") && p.diet === "vegan")).toBe(true);
  });
});

describe("food helpers", () => {
  it("groups useful food by area", () => {
    const result = getFoodByArea("Mitte", places);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.neighbourhood === "Mitte" || p.areaUseCase?.includes("near_museum"))).toBe(true);
  });

  it("finds food near an itinerary day", () => {
    const result = getFoodNearItineraryDay("2026-06-13", places);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("filterEvents", () => {
  it("filters by date", () => {
    const result = filterEvents(events, { ...defaultEventFilters, date: "2026-06-13" });
    expect(result.every((event) => event.date === "2026-06-13")).toBe(true);
  });
});
