import type { VerificationStatus } from "@/domain/common";
import type { Locale } from "@/domain/common";
import { t, ui } from "@/lib/i18n";

export function VerificationBadge({ status, locale = "en" }: { status: VerificationStatus; locale?: Locale }) {
  const styles: Record<VerificationStatus, string> = {
    verified: "bg-emerald-100 text-emerald-800",
    needs_verification: "bg-amber-100 text-amber-800",
    outdated: "bg-rose-100 text-rose-800",
    unknown: "bg-zinc-100 text-zinc-700",
  };
  return <span className={`rounded-full px-2 py-1 text-xs ${styles[status]}`}>{t(ui.labels[status], locale)}</span>;
}

export function PriceBadge({ value }: { value: "low" | "mid" | "high" }) {
  return <span className="rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-800">{value}</span>;
}

export function PriorityBadge({ value }: { value: string }) {
  return <span className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-800">{value}</span>;
}
