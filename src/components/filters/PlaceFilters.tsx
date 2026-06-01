"use client";
import type { PlaceCategory } from "@/domain/place";
import type { PlaceFilters as PF } from "@/lib/filters";

export function PlaceFilters({ filters, setFilters, categories, neighbourhoods }: { filters: PF; setFilters: (f: PF) => void; categories: PlaceCategory[]; neighbourhoods: string[] }) {
  return (
    <div className="grid gap-2 rounded-xl border border-zinc-200 bg-white p-3 md:grid-cols-4">
      <input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="Search" className="rounded border p-2 text-sm" />
      <select value={filters.neighbourhood} onChange={(e) => setFilters({ ...filters, neighbourhood: e.target.value })} className="rounded border p-2 text-sm">
        <option value="all">All areas</option>{neighbourhoods.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <select value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value as PF["price"] })} className="rounded border p-2 text-sm">
        <option value="all">All prices</option><option value="low">low</option><option value="mid">mid</option><option value="high">high</option>
      </select>
      <select value={filters.verification} onChange={(e) => setFilters({ ...filters, verification: e.target.value as PF["verification"] })} className="rounded border p-2 text-sm">
        <option value="all">All verification</option><option value="verified">verified</option><option value="needs_verification">needs_verification</option><option value="unknown">unknown</option><option value="outdated">outdated</option>
      </select>
      <div className="md:col-span-4 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = filters.categories.includes(c);
          return <button key={c} onClick={() => setFilters({ ...filters, categories: active ? filters.categories.filter((x) => x !== c) : [...filters.categories, c] })} className={`rounded-full px-2 py-1 text-xs ${active ? "bg-zinc-900 text-white" : "bg-zinc-100"}`}>{c}</button>;
        })}
      </div>
    </div>
  );
}
