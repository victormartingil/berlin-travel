"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Place } from "@/domain/place";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

export function TravelMap({ places }: { places: Place[] }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

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
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!map || !L) return;
    const markers: LeafletMarker[] = [];
    places.forEach((p) => {
      if (!p.coordinates) return;
      const marker = L.marker([p.coordinates.lat, p.coordinates.lng]).addTo(map);
      marker.bindPopup(`<div><strong>${p.name}</strong><br/>${p.category} · ${p.neighbourhood}<br/><a href="${buildGoogleMapsPlaceUrl(p)}" target="_blank">Open in Maps</a></div>`);
      markers.push(marker);
    });
    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [places]);

  return <div ref={elRef} style={{ height: "65vh", width: "100%" }} />;
}
