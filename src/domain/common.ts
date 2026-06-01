export type Locale = "es" | "en";

export type VerificationStatus = "verified" | "needs_verification" | "outdated" | "unknown";

export type VerificationMetadata = {
  status: VerificationStatus;
  sourceUrl?: string;
  officialUrl?: string;
  lastVerifiedAt?: string;
  notes?: string;
};

export type LocalizedText = { es: string; en: string };
