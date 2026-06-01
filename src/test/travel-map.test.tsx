import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { TravelMap } from "@/components/map/TravelMap";
import { places } from "@/data/places";

const markerMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  bindPopup: vi.fn(),
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
});

