import type { Locale, LocalizedText } from "@/domain/common";

export const localeLabel: Record<Locale, string> = { es: "Español", en: "English" };

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale];
}

export const ui = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    itinerary: { es: "Ruta", en: "Itinerary" },
    map: { es: "Mapa", en: "Map" },
    food: { es: "Comer", en: "Food" },
    favorites: { es: "Favoritos", en: "Favorites" },
    more: { es: "Mas", en: "More" },
  },
  actions: {
    maps: { es: "Abrir mapa", en: "Open map" },
    source: { es: "Fuente", en: "Source" },
    official: { es: "Oficial", en: "Official" },
    ticket: { es: "Ticket", en: "Ticket" },
    reserve: { es: "Reservar", en: "Reserve" },
    favorite: { es: "Guardar", en: "Save" },
    unfavorite: { es: "Guardado", en: "Saved" },
  },
  filters: {
    search: { es: "Buscar", en: "Search" },
    allAreas: { es: "Todos los barrios", en: "All areas" },
    allPrices: { es: "Todos los precios", en: "All prices" },
    allVerification: { es: "Toda verificacion", en: "All verification" },
    priority: { es: "Prioridad", en: "Priority" },
  },
  labels: {
    verified: { es: "Verificado", en: "Verified" },
    needs_verification: { es: "Revisar antes", en: "Check before" },
    outdated: { es: "Desactualizado", en: "Outdated" },
    unknown: { es: "Sin confirmar", en: "Unknown" },
    rainy: { es: "Lluvia", en: "Rain" },
    booking: { es: "Reserva", en: "Booking" },
    cashless: { es: "Tarjeta", en: "Card" },
    noFavorites: { es: "Todavia no hay favoritos.", en: "No favorites yet." },
  },
} as const;
