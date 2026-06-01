import { itinerary } from "@/data/itinerary";
import type { ItineraryDay } from "@/domain/itinerary";
import type { AreaUseCase, Place } from "@/domain/place";

export const foodCategories = ["vegetarian", "restaurant", "cafe", "bakery", "market"] as const;

export function isFoodPlace(place: Place): boolean {
  return foodCategories.includes(place.category as (typeof foodCategories)[number]);
}

export function getFoodByArea(area: string, items: Place[]): Place[] {
  const normalized = area.toLowerCase();
  return items
    .filter(isFoodPlace)
    .filter((place) => place.neighbourhood.toLowerCase() === normalized || place.areaUseCase?.includes(normalized as AreaUseCase))
    .sort(sortFood);
}

export function getFoodNearItineraryDay(dayId: string, items: Place[], days: ItineraryDay[] = itinerary): Place[] {
  const day = days.find((entry) => entry.date === dayId);
  if (!day) return [];
  const referencedNeighbourhoods = new Set(
    Object.values(day.blocks)
      .flat()
      .map((item) => (item.placeId ? items.find((place) => place.id === item.placeId)?.neighbourhood : undefined))
      .filter(Boolean),
  );
  return items
    .filter(isFoodPlace)
    .filter((place) => referencedNeighbourhoods.has(place.neighbourhood) || place.areaUseCase?.some((useCase) => useCase === "near_market" || useCase === "near_museum"))
    .sort(sortFood)
    .slice(0, 6);
}

export function sortFood(a: Place, b: Place): number {
  const rank = { essential: 0, high: 1, medium: 2, optional: 3 };
  return rank[a.priority] - rank[b.priority] || Number(Boolean(b.destinationWorthy)) - Number(Boolean(a.destinationWorthy)) || a.name.localeCompare(b.name);
}
