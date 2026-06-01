import { describe, expect, it } from "vitest";
import { places } from "@/data/places";
import { events } from "@/data/events";
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
});

describe("filterEvents", () => {
  it("filters by date", () => {
    const result = filterEvents(events, { ...defaultEventFilters, date: "2026-06-13" });
    expect(result.every((event) => event.date === "2026-06-13")).toBe(true);
  });
});
