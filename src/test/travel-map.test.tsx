import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { TravelMap } from "@/components/map/TravelMap";
import { places } from "@/data/places";

const bindPopupMock = vi.fn();
const circleMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
}));
const markerMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  bindPopup: bindPopupMock,
  remove: vi.fn(),
}));
const permissionStatusMock = { onchange: null, state: "prompt" } as unknown as PermissionStatus;
const watchPositionMock = vi.fn();

vi.mock("leaflet", () => ({
  default: {},
  circle: circleMock,
  map: vi.fn(() => ({ setView: vi.fn().mockReturnThis(), remove: vi.fn() })),
  tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
  marker: markerMock,
  divIcon: vi.fn((options) => options),
}));

describe("TravelMap", () => {
  beforeEach(() => {
    bindPopupMock.mockClear();
    circleMock.mockClear();
    markerMock.mockClear();
    watchPositionMock.mockReset();
    watchPositionMock.mockReturnValue(1);
    (permissionStatusMock as { state: PermissionState }).state = "prompt";
    Object.defineProperty(global.navigator, "geolocation", {
      configurable: true,
      value: {
        clearWatch: vi.fn(),
        watchPosition: watchPositionMock,
      },
    });
    Object.defineProperty(global.navigator, "permissions", {
      configurable: true,
      value: {
        query: vi.fn().mockResolvedValue(permissionStatusMock),
      },
    });
    Object.defineProperty(global.window, "DeviceOrientationEvent", {
      configurable: true,
      value: class DeviceOrientationEventMock {},
    });
  });

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

  it("adds the YAAM thumbnail to its popup", async () => {
    const yaam = places.find((place) => place.id === "yaam");
    expect(yaam).toBeDefined();

    render(
      <FavoritesProvider>
        <TravelMap places={yaam ? [yaam] : []} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      const popup = bindPopupMock.mock.calls.at(-1)?.[0] as HTMLElement | undefined;
      expect(popup?.querySelector("img")?.getAttribute("src")).toBe("/images/places/yaam-01.jpg");
      expect(popup?.querySelector("img")?.getAttribute("alt")).toContain("YAAM");
    });
  });

  it("adds the accommodation thumbnail to its popup", async () => {
    const accommodation = places.find((place) => place.id === "accommodation-nena-moritzplatz");
    expect(accommodation).toBeDefined();

    render(
      <FavoritesProvider>
        <TravelMap places={accommodation ? [accommodation] : []} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      const popup = bindPopupMock.mock.calls.at(-1)?.[0] as HTMLElement | undefined;
      expect(popup?.querySelector("img")?.getAttribute("src")).toBe("/images/places/accommodation-nena-moritzplatz-01.jpg");
      expect(popup?.querySelector("img")?.getAttribute("alt")).toContain("Nena Apartments");
    });
  });

  it("starts geolocation automatically on map load when permission is prompt", async () => {
    render(
      <FavoritesProvider>
        <TravelMap places={places.slice(0, 2)} locale="es" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(watchPositionMock).toHaveBeenCalled();
    });
  });

  it("renders the user accuracy layer after a successful geolocation fix", async () => {
    watchPositionMock.mockImplementation((success: PositionCallback) => {
      success({
        coords: {
          accuracy: 18,
          heading: 45,
          latitude: 52.51,
          longitude: 13.4,
          speed: 0,
          altitude: null,
          altitudeAccuracy: null,
          toJSON: () => ({}),
        },
        timestamp: Date.now(),
        toJSON: () => ({}),
      } as GeolocationPosition);
      return 1;
    });

    render(
      <FavoritesProvider>
        <TravelMap places={places.slice(0, 2)} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(circleMock).toHaveBeenCalledWith([52.51, 13.4], expect.objectContaining({ radius: 18 }));
    });
  });

  it("shows retry location only after a denied geolocation permission", async () => {
    watchPositionMock.mockImplementation((_success: PositionCallback, error: PositionErrorCallback) => {
      error({
        code: 1,
        message: "denied",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError);
      return 1;
    });

    render(
      <FavoritesProvider>
        <TravelMap places={places.slice(0, 2)} locale="es" />
      </FavoritesProvider>,
    );

    expect(await screen.findByRole("button", { name: /reintentar ubicación/i })).toBeInTheDocument();
  });

  it("shows orientation fallback button when the device needs a gesture", async () => {
    Object.defineProperty(global.window, "DeviceOrientationEvent", {
      configurable: true,
      value: class DeviceOrientationEventMock {
        static requestPermission = vi.fn();
      },
    });

    render(
      <FavoritesProvider>
        <TravelMap places={places.slice(0, 2)} locale="es" />
      </FavoritesProvider>,
    );

    expect(await screen.findByRole("button", { name: /activar orientación/i })).toBeInTheDocument();
  });
});
