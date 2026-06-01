import type { LocalizedText, VerificationMetadata } from "./common";

export type TransportTip = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  link?: string;
  verification: VerificationMetadata;
};
