import type { LocalizedText } from "@/domain/common";
import type { PlaceCategory } from "@/domain/place";

export type MapIconDefinition = {
  label: LocalizedText;
  color: string;
  svg: string;
};

const iconPath = {
  bed: '<path d="M3 7v10"/><path d="M21 11v6"/><path d="M3 12h18"/><path d="M7 12V9a2 2 0 0 1 2-2h4a4 4 0 0 1 4 4v1"/>',
  landmark: '<path d="M3 21h18"/><path d="M5 21V9"/><path d="M19 21V9"/><path d="M2 9h20L12 3 2 9Z"/><path d="M9 21v-8"/><path d="M15 21v-8"/>',
  museum: '<path d="M3 21h18"/><path d="M5 21V8"/><path d="M19 21V8"/><path d="M12 3 2 8h20L12 3Z"/><path d="M8 12h8"/><path d="M8 16h8"/>',
  palette: '<path d="M12 22a10 10 0 1 1 10-10c0 3-2 3-4 3h-1.5a2 2 0 0 0-1.7 3c.7 1.2-.2 4-2.8 4Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/><circle cx="16.5" cy="11.5" r="1"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 11-4 16-9 16Z"/><path d="M4 20c4-6 8-8 16-16"/>',
  utensils: '<path d="M4 3v8"/><path d="M8 3v8"/><path d="M4 7h4"/><path d="M6 11v10"/><path d="M18 3c-2 2-3 5-3 8a3 3 0 0 0 3 3v7"/>',
  coffee: '<path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M16 10h2a3 3 0 0 1 0 6h-2"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/>',
  croissant: '<path d="M4 13c1-4 4-7 8-7s7 3 8 7"/><path d="M7 13c1 3 3 5 5 5s4-2 5-5"/><path d="M4 13c1 3 3 5 6 5"/><path d="M20 13c-1 3-3 5-6 5"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/><path d="M3 3h2l2 12h11l2-8H6"/>',
  spray: '<path d="M8 3h6v4H8z"/><path d="M10 7h2v14h-2z"/><path d="M12 10h4"/><path d="M16 8v6"/><path d="M19 9v4"/>',
  spark: '<path d="M12 2v20"/><path d="m17 5-10 14"/><path d="m7 5 10 14"/><path d="M2 12h20"/>',
  tree: '<path d="M12 22v-7"/><path d="M8 15h8"/><path d="M6 15a6 6 0 1 1 12 0H6Z"/><path d="M9 10a3 3 0 1 1 6 0"/>',
  bus: '<path d="M6 3h12a2 2 0 0 1 2 2v12H4V5a2 2 0 0 1 2-2Z"/><path d="M4 11h16"/><path d="M8 21h.01"/><path d="M16 21h.01"/>',
  market: '<path d="M4 10h16l-1-5H5L4 10Z"/><path d="M6 10v10"/><path d="M18 10v10"/><path d="M8 20h8"/><path d="M9 14h6"/>',
  music: '<path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',
} as const;

function svg(path: string): string {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

export const mapIconDefinitions: Record<PlaceCategory, MapIconDefinition> = {
  accommodation: { label: { es: "Alojamiento", en: "Accommodation" }, color: "#111827", svg: svg(iconPath.bed) },
  history: { label: { es: "Historia", en: "History" }, color: "#7c2d12", svg: svg(iconPath.landmark) },
  museum: { label: { es: "Museo", en: "Museum" }, color: "#1d4ed8", svg: svg(iconPath.museum) },
  gallery: { label: { es: "Galeria", en: "Gallery" }, color: "#7e22ce", svg: svg(iconPath.palette) },
  market: { label: { es: "Mercado", en: "Market" }, color: "#15803d", svg: svg(iconPath.market) },
  vegetarian: { label: { es: "Veg", en: "Veg" }, color: "#16a34a", svg: svg(iconPath.leaf) },
  restaurant: { label: { es: "Restaurante", en: "Restaurant" }, color: "#ca8a04", svg: svg(iconPath.utensils) },
  cafe: { label: { es: "Cafe", en: "Cafe" }, color: "#a16207", svg: svg(iconPath.coffee) },
  bakery: { label: { es: "Panaderia", en: "Bakery" }, color: "#be123c", svg: svg(iconPath.croissant) },
  supermarket: { label: { es: "Supermercado", en: "Supermarket" }, color: "#64748b", svg: svg(iconPath.cart) },
  alternative: { label: { es: "Alternativo", en: "Alternative" }, color: "#0f766e", svg: svg(iconPath.spark) },
  street_art: { label: { es: "Street art", en: "Street art" }, color: "#c026d3", svg: svg(iconPath.spray) },
  nightlife: { label: { es: "Noche", en: "Nightlife" }, color: "#be185d", svg: svg(iconPath.music) },
  park: { label: { es: "Parque", en: "Park" }, color: "#15803d", svg: svg(iconPath.tree) },
  transport: { label: { es: "Transporte", en: "Transport" }, color: "#0369a1", svg: svg(iconPath.bus) },
  club: { label: { es: "Club", en: "Club" }, color: "#be185d", svg: svg(iconPath.music) },
};

export function getMapIconForCategory(category: PlaceCategory): MapIconDefinition {
  return mapIconDefinitions[category];
}

