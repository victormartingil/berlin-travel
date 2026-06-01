import { describe, expect, it } from "vitest";
import { places } from "@/data/places";
import { buildPlaceDetailSections } from "@/lib/placeDetails";

describe("place details", () => {
  it("builds useful detail sections for every place", () => {
    for (const place of places) {
      const sections = buildPlaceDetailSections(place, "es");
      expect(sections.why.length).toBeGreaterThanOrEqual(2);
      expect(sections.practical.length).toBeGreaterThanOrEqual(2);
    }
  });
});

