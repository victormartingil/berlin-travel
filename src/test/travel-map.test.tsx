import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { TravelMap } from "@/components/map/TravelMap";
import { places } from "@/data/places";

const bindPopupMock = vi.fn();
const markerMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  bindPopup: bindPopupMock,
  remove: vi.fn(),
}));

vi.mock("leaflet", () => ({
  default: {},
  map: vi.fn(() => ({ setView: vi.fn().mockReturnThis(), remove: vi.fn() })),
  tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
  marker: markerMock,
  divIcon: vi.fn((options) => options),
}));

describe("TravelMap", () => {
  it("renders markers after the async Leaflet setup completes", async () => {
    render(
      <FavoritesProvider>
        <TravelMap places={places.slice(0, 3)} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(markerMock).toHaveBeenCalled();
    });
  });

  it("adds a licensed thumbnail to popups when media exists", async () => {
    const placeWithImage = places.find((place) => place.id === "teufelsberg");
    expect(placeWithImage).toBeDefined();

    render(
      <FavoritesProvider>
        <TravelMap places={placeWithImage ? [placeWithImage] : []} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      const popup = bindPopupMock.mock.calls.at(-1)?.[0] as HTMLElement | undefined;
      expect(popup?.querySelector("img")?.getAttribute("src")).toBe("/images/places/teufelsberg-01.jpg");
    });
  });
});
