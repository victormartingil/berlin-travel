"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Layer as LeafletLayer, Map as LeafletMap } from "leaflet";
import type { Locale } from "@/domain/common";
import type { Place } from "@/domain/place";
import { getPlaceImages } from "@/data/placeMedia";
import { useFavorites } from "@/hooks/useFavorites";
import { getMapIconForCategory } from "@/lib/mapIcons";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { appPath, publicAssetPath } from "@/lib/paths";
import { t, ui } from "@/lib/i18n";

export function TravelMap({ places, locale }: { places: Place[]; locale: Locale }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<LeafletLayer[]>([]);
  const [mapReady, setMapReady] = useState(false);
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
      setMapReady(true);
    };
    void setup();
    return () => {
      mounted = false;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!mapReady || !map || !L) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    places.forEach((place) => {
      if (!place.coordinates) return;
      const icon = getMapIconForCategory(place.category);
      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: L.divIcon({
          className: "travel-map-marker",
          html: `<span style="--marker-color:${icon.color}">${icon.svg}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18],
        }),
      }).addTo(map);

      const container = document.createElement("div");
      container.className = "travel-map-popup";
      const image = getPlaceImages(place.id)[0];
      if (image) {
        const thumb = document.createElement("img");
        thumb.src = publicAssetPath(image.src);
        thumb.alt = t(image.alt, locale);
        thumb.loading = "lazy";
        thumb.className = "travel-map-popup-image";
        container.append(thumb);
      } else {
        const fallback = document.createElement("div");
        fallback.className = "travel-map-popup-image travel-map-popup-fallback";
        fallback.style.setProperty("--marker-color", icon.color);
        const fallbackIcon = document.createElement("span");
        fallbackIcon.innerHTML = icon.svg;
        const fallbackLabel = document.createElement("span");
        fallbackLabel.textContent = t(icon.label, locale);
        fallback.append(fallbackIcon, fallbackLabel);
        container.append(fallback);
      }
      const title = document.createElement("strong");
      title.textContent = place.name;
      const meta = document.createElement("div");
      meta.textContent = `${place.category} · ${place.neighbourhood}`;
      const link = document.createElement("a");
      link.href = buildGoogleMapsPlaceUrl(place);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = t(ui.actions.maps, locale);
      const detailLink = document.createElement("a");
      detailLink.href = appPath(`/places/${place.id}/`);
      detailLink.textContent = locale === "es" ? "Abrir ficha" : "Open details";
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = fav.isFavorite(place.id) ? t(ui.actions.unfavorite, locale) : t(ui.actions.favorite, locale);
      button.addEventListener("click", () => fav.toggle(place.id));
      container.append(title, meta, link, document.createTextNode(" · "), detailLink, document.createElement("br"), button);
      marker.bindPopup(container);
      markersRef.current.push(marker);
    });
  }, [fav, locale, mapReady, places]);

  const categories = Array.from(new Set(places.map((p) => p.category)));
  const withoutCoordinates = places.filter((p) => !p.coordinates);

  return (
    <div className="space-y-3">
      <div
        ref={elRef}
        className="h-[65vh] w-full rounded-md [&_.travel-map-marker_span]:flex [&_.travel-map-marker_span]:h-8 [&_.travel-map-marker_span]:w-8 [&_.travel-map-marker_span]:items-center [&_.travel-map-marker_span]:justify-center [&_.travel-map-marker_span]:rounded-full [&_.travel-map-marker_span]:border-2 [&_.travel-map-marker_span]:border-white [&_.travel-map-marker_span]:bg-[var(--marker-color)] [&_.travel-map-marker_span]:text-white [&_.travel-map-marker_span]:shadow-lg [&_.travel-map-marker_svg]:h-4 [&_.travel-map-marker_svg]:w-4 [&_.travel-map-popup-fallback]:flex [&_.travel-map-popup-fallback]:items-center [&_.travel-map-popup-fallback]:justify-center [&_.travel-map-popup-fallback]:gap-2 [&_.travel-map-popup-fallback]:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,var(--marker-color),#111827)] [&_.travel-map-popup-fallback]:font-semibold [&_.travel-map-popup-fallback]:text-white [&_.travel-map-popup-fallback_svg]:h-5 [&_.travel-map-popup-fallback_svg]:w-5 [&_.travel-map-popup-image]:mb-2 [&_.travel-map-popup-image]:h-24 [&_.travel-map-popup-image]:w-52 [&_.travel-map-popup-image]:rounded-md [&_.travel-map-popup-image]:object-cover [&_.travel-map-popup]:space-y-2"
      />
      <div className="flex flex-wrap gap-2 text-xs">
        {categories.map((category) => (
          <span key={category} className="inline-flex items-center gap-1">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ backgroundColor: getMapIconForCategory(category).color }} dangerouslySetInnerHTML={{ __html: getMapIconForCategory(category).svg }} />
            {t(getMapIconForCategory(category).label, locale)}
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
