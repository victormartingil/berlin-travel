"use client";

import { MapPin, Route } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Layer as LeafletLayer, Map as LeafletMap } from "leaflet";
import type { Locale } from "@/domain/common";
import type { NightlifeEvent } from "@/domain/event";
import type { ItineraryDay } from "@/domain/itinerary";
import type { Place } from "@/domain/place";
import { getItineraryRouteStops } from "@/lib/itineraryRoute";
import { buildGoogleMapsRouteUrl } from "@/lib/maps";
import { appPath } from "@/lib/paths";
import { t } from "@/lib/i18n";

export function DayRouteMap({ day, places, events, locale }: { day: ItineraryDay; places: Place[]; events: NightlifeEvent[]; locale: Locale }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const layersRef = useRef<LeafletLayer[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const stops = useMemo(() => getItineraryRouteStops(day, places, events), [day, places, events]);
  const routeUrl = buildGoogleMapsRouteUrl(stops.map((stop) => stop.place.address ?? `${stop.place.name}, Berlin`), "walking");

  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      if (!elRef.current || mapRef.current) return;
      const L = await import("leaflet");
      if (!mounted || !elRef.current) return;
      leafletRef.current = L;
      mapRef.current = L.map(elRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      }).setView([52.505, 13.41], 12);
      L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
      setMapReady(true);
    };
    void setup();
    return () => {
      mounted = false;
      layersRef.current.forEach((layer) => layer.remove());
      layersRef.current = [];
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

    layersRef.current.forEach((layer) => layer.remove());
    layersRef.current = [];

    const latLngs = stops.map((stop) => [stop.place.coordinates!.lat, stop.place.coordinates!.lng] as [number, number]);
    if (latLngs.length > 1) {
      const line = L.polyline(latLngs, {
        color: "#059669",
        weight: 4,
        opacity: 0.82,
        dashArray: "8 8",
      }).addTo(map);
      layersRef.current.push(line);
    }

    for (const stop of stops) {
      const marker = L.marker([stop.place.coordinates!.lat, stop.place.coordinates!.lng], {
        icon: L.divIcon({
          className: "day-route-marker",
          html: `<span>${stop.order}</span>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -18],
        }),
      }).addTo(map);

      const popup = document.createElement("div");
      popup.className = "day-route-popup";
      const title = document.createElement("strong");
      title.textContent = `${stop.order}. ${stop.place.name}`;
      const block = document.createElement("div");
      block.textContent = `${stop.block} · ${t(stop.item.title, locale)}`;
      const detail = document.createElement("a");
      detail.href = appPath(`/places/${stop.place.id}/`);
      detail.textContent = locale === "es" ? "Abrir ficha" : "Open details";
      popup.append(title, block, detail);
      marker.bindPopup(popup);
      layersRef.current.push(marker);
    }

    if (latLngs.length === 1) {
      map.setView(latLngs[0], 13);
    } else if (latLngs.length > 1) {
      map.fitBounds(L.latLngBounds(latLngs), { padding: [26, 26], maxZoom: 14 });
    }
  }, [locale, mapReady, stops]);

  if (!stops.length) return null;

  return (
    <section className="space-y-3 rounded-md border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{locale === "es" ? "Mapa del día" : "Day map"}</p>
          <p className="text-xs text-zinc-600">
            {locale === "es"
              ? "Puntos numerados en el orden sugerido. La línea une el recorrido principal, no las alternativas."
              : "Numbered stops in the suggested order. The line connects the main route, not alternatives."}
          </p>
        </div>
        <a className="inline-flex items-center gap-2 rounded-md bg-emerald-900 px-3 py-2 text-xs text-white" href={routeUrl} target="_blank" rel="noreferrer">
          <Route size={14} />
          {locale === "es" ? "Abrir recorrido" : "Open route"}
        </a>
      </div>
      <div
        ref={elRef}
        className="h-64 w-full rounded-md border border-zinc-200 bg-zinc-100 [&_.day-route-marker_span]:flex [&_.day-route-marker_span]:h-8 [&_.day-route-marker_span]:w-8 [&_.day-route-marker_span]:items-center [&_.day-route-marker_span]:justify-center [&_.day-route-marker_span]:rounded-full [&_.day-route-marker_span]:border-2 [&_.day-route-marker_span]:border-white [&_.day-route-marker_span]:bg-emerald-700 [&_.day-route-marker_span]:text-sm [&_.day-route-marker_span]:font-bold [&_.day-route-marker_span]:text-white [&_.day-route-marker_span]:shadow-lg [&_.day-route-popup]:space-y-1"
      />
      <ol className="grid gap-2 text-xs text-zinc-700 sm:grid-cols-2">
        {stops.map((stop) => (
          <li key={`${day.date}-${stop.place.id}`} className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-[11px] font-bold text-white">{stop.order}</span>
            <span>
              <span className="font-medium">{stop.place.name}</span>
              {stop.event ? <span className="text-zinc-500"> · {stop.event.title}</span> : null}
            </span>
          </li>
        ))}
      </ol>
      <p className="flex items-center gap-1 text-xs text-zinc-500">
        <MapPin size={13} />
        {locale === "es" ? "El recorrido es orientativo: ajustadlo con transporte, lluvia y energía real." : "Route is indicative: adjust for transit, rain and real energy."}
      </p>
    </section>
  );
}
