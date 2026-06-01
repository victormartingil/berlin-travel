"use client";

import { Heart } from "lucide-react";
import type { Locale } from "@/domain/common";
import { t, ui } from "@/lib/i18n";

export function FavoriteButton({ active, onToggle, locale = "en" }: { active: boolean; onToggle: () => void; locale?: Locale }) {
  return (
    <button onClick={onToggle} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${active ? "bg-rose-600 text-white" : "bg-zinc-200 text-zinc-900"}`}>
      <Heart size={16} fill={active ? "currentColor" : "none"} />
      {active ? t(ui.actions.unfavorite, locale) : t(ui.actions.favorite, locale)}
    </button>
  );
}
