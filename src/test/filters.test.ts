import { describe, expect, it } from "vitest";
import { places } from "@/data/places";
import { defaultPlaceFilters, filterPlaces } from "@/lib/filters";

describe("filterPlaces", () => {
  it("filters by category", () => {
    const result = filterPlaces(places, { ...defaultPlaceFilters, categories: ["museum"] });
    expect(result.every((p) => p.category === "museum")).toBe(true);
  });

  it("filters by verification", () => {
    const result = filterPlaces(places, { ...defaultPlaceFilters, verification: "unknown" });
    expect(result.every((p) => p.verification.status === "unknown")).toBe(true);
  });
});
