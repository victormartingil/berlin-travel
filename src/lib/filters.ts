import type { Place, PlaceCategory, PriceLevel } from "@/domain/place";
import type { VerificationStatus } from "@/domain/common";

export type PlaceFilters = {
  categories: PlaceCategory[];
  neighbourhood: string;
  price: PriceLevel | "all";
  verification: VerificationStatus | "all";
  search: string;
};

export const defaultPlaceFilters: PlaceFilters = { categories: [], neighbourhood: "all", price: "all", verification: "all", search: "" };

export function filterPlaces(items: Place[], f: PlaceFilters): Place[] {
  const q = f.search.trim().toLowerCase();
  return items.filter((p) => {
    if (f.categories.length > 0 && !f.categories.includes(p.category)) return false;
    if (f.neighbourhood !== "all" && p.neighbourhood !== f.neighbourhood) return false;
    if (f.price !== "all" && p.priceLevel !== f.price) return false;
    if (f.verification !== "all" && p.verification.status !== f.verification) return false;
    if (q && !`${p.name} ${p.neighbourhood} ${p.tags.join(" ")}`.toLowerCase().includes(q)) return false;
    return true;
  });
}
