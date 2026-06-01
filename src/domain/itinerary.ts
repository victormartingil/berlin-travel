import type { LocalizedText, VerificationMetadata } from "./common";

export type ItineraryBlockKey = "morning" | "lunch" | "afternoon" | "dinner" | "evening" | "night" | "alternatives";

export type ItineraryItem = {
  id: string;
  title: LocalizedText;
  note?: LocalizedText;
  placeId?: string;
  duration?: string;
  routeFromPlaceId?: string;
  routeMode?: "walking" | "transit" | "bicycling";
  externalUrl?: string;
  verification: VerificationMetadata;
};

export type ItineraryDay = {
  date: string;
  label: LocalizedText;
  blocks: Record<ItineraryBlockKey, ItineraryItem[]>;
};
