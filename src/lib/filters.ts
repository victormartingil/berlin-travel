import type { NightlifeEvent } from "@/domain/event";
import type { Priority, VerificationStatus } from "@/domain/common";
import type { AreaUseCase, DietType, MealType, Place, PlaceCategory, PriceLevel } from "@/domain/place";

export type PlaceFilters = {
  categories: PlaceCategory[];
  neighbourhood: string;
  price: PriceLevel | "all";
  verification: VerificationStatus | "all";
  priority: Priority | "all";
  mealType: MealType | "all";
  areaUseCase: AreaUseCase | "all";
  diet: DietType | "all";
  friendRecommended: boolean;
  search: string;
};

export type EventFilters = {
  date: string;
  intensity: NightlifeEvent["intensity"] | "all";
  priority: Priority | "all";
};

export const defaultPlaceFilters: PlaceFilters = {
  categories: [],
  neighbourhood: "all",
  price: "all",
  verification: "all",
  priority: "all",
  mealType: "all",
  areaUseCase: "all",
  diet: "all",
  friendRecommended: false,
  search: "",
};
export const defaultEventFilters: EventFilters = { date: "all", intensity: "all", priority: "all" };

export function filterPlaces(items: Place[], f: PlaceFilters): Place[] {
  const q = f.search.trim().toLowerCase();
  return items.filter((p) => {
    if (f.categories.length > 0 && !f.categories.includes(p.category)) return false;
    if (f.neighbourhood !== "all" && p.neighbourhood !== f.neighbourhood) return false;
    if (f.price !== "all" && p.priceLevel !== f.price) return false;
    if (f.verification !== "all" && p.verification.status !== f.verification) return false;
    if (f.priority !== "all" && p.priority !== f.priority) return false;
    if (f.mealType !== "all" && !p.mealTypes?.includes(f.mealType)) return false;
    if (f.areaUseCase !== "all" && !p.areaUseCase?.includes(f.areaUseCase)) return false;
    if (f.diet !== "all" && p.diet !== f.diet) return false;
    if (f.friendRecommended && !p.friendRecommended) return false;
    if (q && !`${p.name} ${p.neighbourhood} ${p.tags.join(" ")}`.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function filterEvents(items: NightlifeEvent[], f: EventFilters): NightlifeEvent[] {
  return items.filter((event) => {
    if (f.date !== "all" && event.date !== f.date) return false;
    if (f.intensity !== "all" && event.intensity !== f.intensity) return false;
    if (f.priority !== "all" && event.priority !== f.priority) return false;
    return true;
  });
}
