import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DayRouteMap } from "@/components/itinerary/DayRouteMap";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { places } from "@/data/places";

const bindPopupMock = vi.fn();
const markerMock = vi.fn((latLng: [number, number], options: { icon: { html: string } }) => {
  void latLng;
  void options;
  return {
    addTo: vi.fn().mockReturnThis(),
    bindPopup: bindPopupMock,
    remove: vi.fn(),
  };
});
const polylineMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
}));
const fitBoundsMock = vi.fn();

vi.mock("leaflet", () => ({
  default: {},
  control: { zoom: vi.fn(() => ({ addTo: vi.fn() })) },
  divIcon: vi.fn((options) => options),
  latLngBounds: vi.fn((bounds) => bounds),
  map: vi.fn(() => ({
    fitBounds: fitBoundsMock,
    remove: vi.fn(),
    setView: vi.fn().mockReturnThis(),
  })),
  marker: markerMock,
  polyline: polylineMock,
  tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
}));

describe("DayRouteMap", () => {
  it("renders numbered markers and a route line for a day", async () => {
    const saturday = itinerary.find((day) => day.date === "2026-06-13");
    expect(saturday).toBeDefined();

    render(<DayRouteMap day={saturday!} places={places} events={events} locale="es" />);

    await waitFor(() => {
      expect(markerMock).toHaveBeenCalled();
      expect(polylineMock).toHaveBeenCalled();
      expect(fitBoundsMock).toHaveBeenCalled();
    });

    const routePoints = (polylineMock.mock.calls as unknown as [[number, number][]][])[0]?.[0];
    expect(markerMock.mock.calls[0]?.[1].icon.html).toContain("<svg");
    expect(markerMock.mock.calls[1]?.[1].icon.html).toContain(">1<");
    expect(routePoints?.[0]).toEqual([52.5032, 13.4101]);
  });
});
