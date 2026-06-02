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
  showFoodFilters = false,
  showMarketFilters = false,
}: {
  filters: PF;
  setFilters: (f: PF) => void;
  categories: PlaceCategory[];
  neighbourhoods: string[];
  locale: Locale;
  showFoodFilters?: boolean;
  showMarketFilters?: boolean;
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
      <button
        type="button"
        onClick={() => setFilters({ ...filters, friendRecommended: !filters.friendRecommended })}
        className={`rounded border p-2 text-sm ${filters.friendRecommended ? "border-amber-500 bg-amber-100 text-amber-950" : "border-zinc-300 bg-white text-zinc-700"}`}
      >
        {locale === "es" ? "⭐ Consejos amigo" : "⭐ Friend picks"}
      </button>
      {showFoodFilters ? (
        <>
          <select value={filters.mealType} onChange={(e) => setFilters({ ...filters, mealType: e.target.value as PF["mealType"] })} className="rounded border p-2 text-sm">
            <option value="all">{locale === "es" ? "Cualquier momento" : "Any moment"}</option>
            <option value="breakfast">{locale === "es" ? "Desayuno" : "Breakfast"}</option>
            <option value="brunch">Brunch</option>
            <option value="lunch">{locale === "es" ? "Comida" : "Lunch"}</option>
            <option value="dinner">{locale === "es" ? "Cena" : "Dinner"}</option>
            <option value="quick">{locale === "es" ? "Rápido" : "Quick"}</option>
            <option value="special">{locale === "es" ? "Especial" : "Special"}</option>
          </select>
          <select value={filters.areaUseCase} onChange={(e) => setFilters({ ...filters, areaUseCase: e.target.value as PF["areaUseCase"] })} className="rounded border p-2 text-sm">
            <option value="all">{locale === "es" ? "Cualquier contexto" : "Any context"}</option>
            <option value="near_base">{locale === "es" ? "Cerca base" : "Near base"}</option>
            <option value="near_museum">{locale === "es" ? "Post-museo" : "Near museum"}</option>
            <option value="near_market">{locale === "es" ? "Mercados/ruta" : "Near market"}</option>
            <option value="near_club">{locale === "es" ? "Pre/post club" : "Near club"}</option>
            <option value="destination_worthy">{locale === "es" ? "Merece desvío" : "Worth a detour"}</option>
          </select>
          <select value={filters.diet} onChange={(e) => setFilters({ ...filters, diet: e.target.value as PF["diet"] })} className="rounded border p-2 text-sm">
            <option value="all">{locale === "es" ? "Cualquier dieta" : "Any diet"}</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan_options">{locale === "es" ? "Opciones veganas" : "Vegan options"}</option>
          </select>
        </>
      ) : null}
      {showMarketFilters ? (
        <select value={filters.marketKind} onChange={(e) => setFilters({ ...filters, marketKind: e.target.value as PF["marketKind"] })} className="rounded border p-2 text-sm">
          <option value="all">{locale === "es" ? "Cualquier mercado" : "Any market"}</option>
          <option value="flea">{locale === "es" ? "Rastro / segunda mano" : "Flea / second-hand"}</option>
          <option value="antiques">{locale === "es" ? "Antigüedades" : "Antiques"}</option>
          <option value="food">{locale === "es" ? "Comida" : "Food"}</option>
          <option value="craft">{locale === "es" ? "Arte / craft" : "Art / craft"}</option>
          <option value="saturday">{locale === "es" ? "Sábado" : "Saturday"}</option>
          <option value="sunday">{locale === "es" ? "Domingo" : "Sunday"}</option>
        </select>
      ) : null}
      <div className="flex flex-wrap gap-2 md:col-span-5">
        {categories.map((c) => {
          const active = filters.categories.includes(c);
          return (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, categories: active ? filters.categories.filter((x) => x !== c) : [...filters.categories, c] })}
              className={`rounded-full px-2 py-1 text-xs ${active ? "ui-control-active" : "ui-button-soft"}`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
