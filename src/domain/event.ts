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
  intensity: EventIntensity;
  doorPolicy?: LocalizedText;
  ticketUrl?: string;
  sourceUrl: string;
  fitScore: 1 | 2 | 3 | 4 | 5;
  priority: Priority;
  verification: VerificationMetadata;
};
