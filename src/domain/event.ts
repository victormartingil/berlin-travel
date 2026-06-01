import type { LocalizedText, Priority, VerificationMetadata } from "./common";

export type EventIntensity = "soft" | "medium" | "hard";

export type NightlifeEvent = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  venuePlaceId: string;
  style: LocalizedText;
  summary?: LocalizedText;
  lineup?: string[];
  price?: string;
  posterUrl?: string;
  intensity: EventIntensity;
  doorPolicy?: LocalizedText;
  practicalNotes?: LocalizedText[];
  ticketUrl?: string;
  sourceUrl: string;
  fitScore: 1 | 2 | 3 | 4 | 5;
  priority: Priority;
  verification: VerificationMetadata;
};
