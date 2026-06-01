import type { LocalizedText, Priority, VerificationMetadata } from "./common";

export type PlaceCategory =
  | "accommodation"
  | "vegetarian"
  | "restaurant"
  | "cafe"
  | "bakery"
  | "supermarket"
  | "museum"
  | "gallery"
  | "street_art"
  | "alternative"
  | "nightlife"
  | "park"
  | "transport"
  | "history"
  | "market"
  | "club";

export type PriceLevel = "low" | "mid" | "high";
export type MealType = "breakfast" | "brunch" | "lunch" | "dinner" | "quick" | "special";
export type AreaUseCase = "near_base" | "near_museum" | "near_market" | "near_club" | "destination_worthy";
export type DietType = "vegetarian" | "vegan" | "vegan_options";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  neighbourhood: string;
  description: LocalizedText;
  priority: Priority;
  priceLevel: PriceLevel;
  tags: string[];
  address?: string;
  coordinates?: { lat: number; lng: number };
  googleMapsQuery?: string;
  googleMapsUrl?: string;
  openingHours?: LocalizedText;
  estimatedDuration?: string;
  ticketUrl?: string;
  reservationUrl?: string;
  officialUrl?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
  rainyDay?: boolean;
  cashless?: boolean;
  bookingRecommended?: boolean;
  quickStop?: boolean;
  destinationWorthy?: boolean;
  mealTypes?: MealType[];
  areaUseCase?: AreaUseCase[];
  diet?: DietType;
  practicalNotes?: LocalizedText[];
  verification: VerificationMetadata;
};
