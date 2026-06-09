import { describe, expect, it } from "vitest";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { places } from "@/data/places";
import { getItineraryRouteStops } from "@/lib/itineraryRoute";
import { buildGoogleMapsRouteUrl } from "@/lib/maps";

describe("itinerary route helpers", () => {
  it("builds ordered day stops from places and event venues", () => {
    const saturday = itinerary.find((day) => day.date === "2026-06-13");
    expect(saturday).toBeDefined();

    const stops = getItineraryRouteStops(saturday!, places, events);

    expect(stops.length).toBeGreaterThan(4);
    expect(stops.map((stop) => stop.order)).toEqual(stops.map((_, index) => index + 1));
    expect(stops.map((stop) => stop.place.id)).toContain("raw-gelaende");
    expect(stops.map((stop) => stop.place.id)).toContain("humboldthain-club");
    expect(stops.some((stop) => stop.block === "alternatives")).toBe(false);
  });

  it("creates a Google Maps route with waypoints", () => {
    const url = buildGoogleMapsRouteUrl(["A Berlin", "B Berlin", "C Berlin"], "walking");

    expect(url).toContain("origin=A+Berlin");
    expect(url).toContain("destination=C+Berlin");
    expect(url).toContain("waypoints=B+Berlin");
  });
});
