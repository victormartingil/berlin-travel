"use client";

import { Compass, LocateFixed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Layer as LeafletLayer, Map as LeafletMap } from "leaflet";
import type { Locale } from "@/domain/common";
import type { Place } from "@/domain/place";
import { getPlaceImages } from "@/data/placeMedia";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useFavorites } from "@/hooks/useFavorites";
import { getMapIconForCategory } from "@/lib/mapIcons";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { appPath, publicAssetPath } from "@/lib/paths";
import { t, ui } from "@/lib/i18n";
import { getCompassLabel } from "@/lib/userLocation";

function buildUserLocationIconHtml(heading: number | null): string {
  const marker = heading !== null && Number.isFinite(heading)
    ? `<g transform="rotate(${heading} 17 17)">
        <path d="M17 4.5 25 27.5 17 23.5 9 27.5Z" fill="#3b82f6" stroke="rgba(255,255,255,0.96)" stroke-width="2.25" stroke-linejoin="round"/>
        <circle cx="17" cy="17" r="3.75" fill="white"/>
      </g>`
    : `<circle cx="17" cy="17" r="9" fill="#3b82f6" stroke="rgba(255,255,255,0.96)" stroke-width="2.25"/>
       <circle cx="17" cy="17" r="3.75" fill="white"/>`;

  return `<svg aria-hidden="true" viewBox="0 0 34 34" width="34" height="34" style="display:block;overflow:visible;filter:drop-shadow(0 5px 12px rgba(37,99,235,0.26));">
    <circle cx="17" cy="17" r="15" fill="rgba(59,130,246,0.2)"/>
    ${marker}
  </svg>`;
}

export function TravelMap({ places, locale }: { places: Place[]; locale: Locale }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const markersRef = useRef<LeafletLayer[]>([]);
  const userLayersRef = useRef<LeafletLayer[]>([]);
  const hasCenteredOnUserRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);
  const fav = useFavorites();
  const { compassError, compassPermission, isCompassActive, isLocating, location, locationError, locationPermission, needsCompassGesture, requestCompass, requestLocation } = useUserLocation();

  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      if (!elRef.current || mapRef.current) return;
      const L = await import("leaflet");
      if (!mounted || !elRef.current) return;
      leafletRef.current = L;
      mapRef.current = L.map(elRef.current).setView([52.505, 13.41], 12);
      mapRef.current.createPane("travel-map-user-location");
      const userPane = mapRef.current.getPane("travel-map-user-location");
      if (userPane) {
        userPane.style.zIndex = "675";
      }
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
      userLayersRef.current.forEach((layer) => layer.remove());
      userLayersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      hasCenteredOnUserRef.current = false;
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

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!mapReady || !map || !L) return;

    userLayersRef.current.forEach((layer) => layer.remove());
    userLayersRef.current = [];

    if (!location) return;

    const latLng = [location.lat, location.lng] as [number, number];
    const accuracyCircle = L.circle(latLng, {
      color: "#2563eb",
      fillColor: "#60a5fa",
      fillOpacity: 0.12,
      opacity: 0.65,
      pane: "travel-map-user-location",
      radius: Math.max(location.accuracy, 8),
      weight: 1.5,
    }).addTo(map);

    const marker = L.marker(latLng, {
      pane: "travel-map-user-location",
      zIndexOffset: 10_000,
      icon: L.divIcon({
        className: "travel-map-user-marker",
        html: buildUserLocationIconHtml(location.heading),
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    }).addTo(map);

    const popup = document.createElement("div");
    popup.className = "travel-map-popup";
    const title = document.createElement("strong");
    title.textContent = locale === "es" ? "Tu ubicación" : "Your location";
    const accuracy = document.createElement("div");
    accuracy.textContent = locale === "es" ? `Precisión aprox. ${Math.round(location.accuracy)} m` : `Approx. accuracy ${Math.round(location.accuracy)} m`;
    popup.append(title, accuracy);
    if (location.heading !== null) {
      const heading = document.createElement("div");
      heading.textContent = locale === "es"
        ? `Brújula ${getCompassLabel(location.heading, locale)} · ${Math.round(location.heading)}°`
        : `Compass ${getCompassLabel(location.heading, locale)} · ${Math.round(location.heading)}°`;
      popup.append(heading);
    }
    marker.bindPopup(popup);

    userLayersRef.current.push(accuracyCircle, marker);

    if (!hasCenteredOnUserRef.current) {
      hasCenteredOnUserRef.current = true;
      map.setView(latLng, 15);
    }
  }, [locale, location, mapReady]);

  const categories = Array.from(new Set(places.map((p) => p.category)));
  const withoutCoordinates = places.filter((p) => !p.coordinates);
  const showLocationRetry = locationPermission === "denied" && location === null;
  const showCompassRetry = needsCompassGesture && !isCompassActive && compassPermission !== "unsupported";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm">
        <div className="space-y-1">
          {isLocating && !location ? (
            <p className="text-xs text-zinc-600">{locale === "es" ? "Intentando ubicaros..." : "Trying to locate you..."}</p>
          ) : null}
          {locationError === "denied" ? (
            <p className="text-xs text-amber-800">{locale === "es" ? "El navegador ha bloqueado la ubicación. Si queréis el punto azul, podéis reintentarlo." : "The browser blocked location. If you want the blue dot, you can retry."}</p>
          ) : null}
          {compassError === "denied" ? (
            <p className="text-xs text-amber-800">{locale === "es" ? "La orientación sigue dependiendo del dispositivo; en iPhone/iPad puede requerir confirmación manual." : "Orientation still depends on the device; on iPhone/iPad it may require manual confirmation."}</p>
          ) : null}
        </div>
        {showLocationRetry || showCompassRetry || location ? (
          <div className="flex flex-wrap gap-2">
            {location ? (
              <button
                type="button"
                onClick={() => {
                  mapRef.current?.setView([location.lat, location.lng], 15);
                }}
                className="ui-button-primary inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium"
              >
                <LocateFixed size={14} />
                {locale === "es" ? "Centrarme" : "Center on me"}
              </button>
            ) : null}
            {showLocationRetry ? (
              <button
                type="button"
                onClick={() => requestLocation()}
                className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium"
              >
                <LocateFixed size={14} />
                {locale === "es" ? "Reintentar ubicación" : "Retry location"}
              </button>
            ) : null}
            {showCompassRetry ? (
              <button
                type="button"
                onClick={() => void requestCompass()}
                className="ui-button-soft inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium"
              >
                <Compass size={14} />
                {isCompassActive
                  ? locale === "es" ? "Brújula activa" : "Compass on"
                  : locale === "es" ? "Activar orientación" : "Enable orientation"}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
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
