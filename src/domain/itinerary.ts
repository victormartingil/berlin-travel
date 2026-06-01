import type { LocalizedText, VerificationMetadata } from "./common";

export type ItineraryBlockKey = "morning" | "lunch" | "afternoon" | "dinner" | "evening" | "night" | "alternatives";

export type ItineraryItem = {
  id: string;
  title: LocalizedText;
  note?: LocalizedText;
  placeId?: string;
  eventId?: string;
  duration?: string;
  routeFromPlaceId?: string;
  routeMode?: "walking" | "transit" | "bicycling";
  externalUrl?: string;
  flags?: ("rain" | "tired" | "low_budget" | "booking" | "cash_card")[];
  verification: VerificationMetadata;
};

export type ItineraryDay = {
  date: string;
  label: LocalizedText;
  blocks: Record<ItineraryBlockKey, ItineraryItem[]>;
};
