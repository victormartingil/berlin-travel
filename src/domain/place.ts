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
  practicalNotes?: LocalizedText[];
  verification: VerificationMetadata;
};
