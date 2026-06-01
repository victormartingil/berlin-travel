"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Layer as LeafletLayer, Map as LeafletMap } from "leaflet";
import type { Locale } from "@/domain/common";
import type { Place } from "@/domain/place";
import { useFavorites } from "@/hooks/useFavorites";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { t, ui } from "@/lib/i18n";

const categoryColors: Record<string, string> = {
  accommodation: "#111827",
  history: "#7c2d12",
  museum: "#1d4ed8",
  gallery: "#7e22ce",
  market: "#15803d",
  vegetarian: "#16a34a",
  restaurant: "#ca8a04",
  cafe: "#a16207",
  bakery: "#be123c",
  alternative: "#0f766e",
  street_art: "#c026d3",
  park: "#15803d",
  club: "#be185d",
  transport: "#0369a1",
};

export function TravelMap({ places, locale }: { places: Place[]; locale: Locale }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<LeafletLayer[]>([]);
  const fav = useFavorites();

  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      if (!elRef.current || mapRef.current) return;
      const L = await import("leaflet");
      if (!mounted || !elRef.current) return;
      leafletRef.current = L;
      mapRef.current = L.map(elRef.current).setView([52.505, 13.41], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    };
    void setup();
    return () => {
      mounted = false;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!map || !L) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    places.forEach((place) => {
      if (!place.coordinates) return;
      const color = categoryColors[place.category] ?? "#111827";
      const marker = L.circleMarker([place.coordinates.lat, place.coordinates.lng], {
        radius: place.category === "accommodation" ? 8 : 6,
        color,
        fillColor: color,
        fillOpacity: 0.85,
        weight: 2,
      }).addTo(map);

      const container = document.createElement("div");
      container.className = "space-y-2";
      const title = document.createElement("strong");
      title.textContent = place.name;
      const meta = document.createElement("div");
      meta.textContent = `${place.category} · ${place.neighbourhood}`;
      const link = document.createElement("a");
      link.href = buildGoogleMapsPlaceUrl(place);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = t(ui.actions.maps, locale);
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = fav.isFavorite(place.id) ? t(ui.actions.unfavorite, locale) : t(ui.actions.favorite, locale);
      button.addEventListener("click", () => fav.toggle(place.id));
      container.append(title, meta, link, document.createElement("br"), button);
      marker.bindPopup(container);
      markersRef.current.push(marker);
    });
  }, [fav, locale, places]);

  const categories = Array.from(new Set(places.map((p) => p.category)));
  const withoutCoordinates = places.filter((p) => !p.coordinates);

  return (
    <div className="space-y-3">
      <div ref={elRef} className="h-[65vh] w-full rounded-md" />
      <div className="flex flex-wrap gap-2 text-xs">
        {categories.map((category) => (
          <span key={category} className="inline-flex items-center gap-1">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryColors[category] ?? "#111827" }} />
            {category}
          </span>
        ))}
      </div>
      {withoutCoordinates.length > 0 ? (
        <p className="text-sm text-zinc-600">
          {withoutCoordinates.length} {locale === "es" ? "lugares sin coordenadas se muestran solo en la lista." : "places without coordinates are shown only in the list."}
        </p>
      ) : null}
    </div>
  );
}
