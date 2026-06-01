"use client";

import type { Locale } from "@/domain/common";
import type { PlaceCategory } from "@/domain/place";
import type { PlaceFilters as PF } from "@/lib/filters";
import { t, ui } from "@/lib/i18n";

export function PlaceFilters({
  filters,
  setFilters,
  categories,
  neighbourhoods,
  locale,
}: {
  filters: PF;
  setFilters: (f: PF) => void;
  categories: PlaceCategory[];
  neighbourhoods: string[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-2 rounded-md border border-zinc-200 bg-white p-3 md:grid-cols-5">
      <input
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder={t(ui.filters.search, locale)}
        className="rounded border p-2 text-sm"
      />
      <select value={filters.neighbourhood} onChange={(e) => setFilters({ ...filters, neighbourhood: e.target.value })} className="rounded border p-2 text-sm">
        <option value="all">{t(ui.filters.allAreas, locale)}</option>
        {neighbourhoods.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <select value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value as PF["price"] })} className="rounded border p-2 text-sm">
        <option value="all">{t(ui.filters.allPrices, locale)}</option>
        <option value="low">low</option>
        <option value="mid">mid</option>
        <option value="high">high</option>
      </select>
      <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value as PF["priority"] })} className="rounded border p-2 text-sm">
        <option value="all">{t(ui.filters.priority, locale)}</option>
        <option value="essential">essential</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="optional">optional</option>
      </select>
      <select value={filters.verification} onChange={(e) => setFilters({ ...filters, verification: e.target.value as PF["verification"] })} className="rounded border p-2 text-sm">
        <option value="all">{t(ui.filters.allVerification, locale)}</option>
        <option value="verified">{t(ui.labels.verified, locale)}</option>
        <option value="needs_verification">{t(ui.labels.needs_verification, locale)}</option>
        <option value="unknown">{t(ui.labels.unknown, locale)}</option>
        <option value="outdated">{t(ui.labels.outdated, locale)}</option>
      </select>
      <div className="flex flex-wrap gap-2 md:col-span-5">
        {categories.map((c) => {
          const active = filters.categories.includes(c);
          return (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, categories: active ? filters.categories.filter((x) => x !== c) : [...filters.categories, c] })}
              className={`rounded-full px-2 py-1 text-xs ${active ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
