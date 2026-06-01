import type { LocalizedText, VerificationMetadata } from "./common";

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
  | "transport";

export type PriceLevel = "low" | "mid" | "high";

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  neighbourhood: string;
  description: LocalizedText;
  priceLevel: PriceLevel;
  tags: string[];
  address?: string;
  coordinates?: { lat: number; lng: number };
  googleMapsQuery?: string;
  verification: VerificationMetadata;
};
