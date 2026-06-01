import { describe, expect, it } from "vitest";
import { places } from "@/data/places";
import type { PlaceCategory } from "@/domain/place";
import { getMapIconForCategory, mapIconDefinitions } from "@/lib/mapIcons";

describe("map icons", () => {
  it("defines an icon for every mapped category in the guide", () => {
    const categories = new Set<PlaceCategory>(places.filter((place) => place.coordinates).map((place) => place.category));

    for (const category of categories) {
      const icon = getMapIconForCategory(category);
      expect(icon).toBeDefined();
      expect(icon.color).toMatch(/^#/);
      expect(icon.svg).toContain("<svg");
    }
  });

  it("keeps the icon registry complete for domain categories", () => {
    expect(Object.keys(mapIconDefinitions).sort()).toEqual([
      "accommodation",
      "alternative",
      "bakery",
      "cafe",
      "club",
      "gallery",
      "history",
      "market",
      "museum",
      "nightlife",
      "park",
      "restaurant",
      "street_art",
      "supermarket",
      "transport",
      "vegetarian",
    ]);
  });
});

