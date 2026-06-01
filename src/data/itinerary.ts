import type { ItineraryDay } from "@/domain/itinerary";

const day = (date: string, es: string, en: string): ItineraryDay => ({
  date,
  label: { es, en },
  blocks: {
    morning: [{ id: `${date}-m1`, title: { es: "Paseo por barrio", en: "Neighborhood walk" }, placeId: "accommodation-nena-moritzplatz", verification: { status: "unknown" } }],
    lunch: [{ id: `${date}-l1`, title: { es: "Comida vegetariana", en: "Vegetarian lunch" }, placeId: "mustafa-gemuse-kebap", verification: { status: "unknown" } }],
    afternoon: [{ id: `${date}-a1`, title: { es: "Museo/galería", en: "Museum/gallery" }, placeId: "hamburger-bahnhof", verification: { status: "unknown" } }],
    dinner: [{ id: `${date}-d1`, title: { es: "Cena y paseo", en: "Dinner and walk" }, placeId: "five-elephant", verification: { status: "unknown" } }],
    evening: [{ id: `${date}-e1`, title: { es: "Atardecer y descanso", en: "Sunset and rest" }, placeId: "tempelhofer-feld", verification: { status: "unknown" } }],
    night: [{ id: `${date}-n1`, title: { es: "Noche electrónica", en: "Electronic night" }, placeId: "sisyphos", verification: { status: "unknown" } }],
    alternatives: [{ id: `${date}-x1`, title: { es: "Alternativa low-budget", en: "Low-budget alternative" }, placeId: "markthalle-neun", verification: { status: "unknown" } }],
  },
});

export const itinerary: ItineraryDay[] = [
  day("2026-06-10", "Día 1 · Llegada", "Day 1 · Arrival"),
  day("2026-06-11", "Día 2 · Kreuzberg", "Day 2 · Kreuzberg"),
  day("2026-06-12", "Día 3 · Mitte", "Day 3 · Mitte"),
  day("2026-06-13", "Día 4 · Arte", "Day 4 · Art"),
  day("2026-06-14", "Día 5 · Mercados", "Day 5 · Markets"),
  day("2026-06-15", "Día 6 · Museos", "Day 6 · Museums"),
  day("2026-06-16", "Día 7 · Cierre", "Day 7 · Wrap-up"),
];
