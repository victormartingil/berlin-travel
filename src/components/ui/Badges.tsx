import type { VerificationStatus } from "@/domain/common";

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const styles: Record<VerificationStatus, string> = {
    verified: "bg-emerald-100 text-emerald-800",
    needs_verification: "bg-amber-100 text-amber-800",
    outdated: "bg-rose-100 text-rose-800",
    unknown: "bg-zinc-100 text-zinc-700",
  };
  return <span className={`rounded-full px-2 py-1 text-xs ${styles[status]}`}>{status}</span>;
}

export function PriceBadge({ value }: { value: "low" | "mid" | "high" }) {
  return <span className="rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-800">{value}</span>;
}
