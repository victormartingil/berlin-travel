import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { TravelMap } from "@/components/map/TravelMap";
import { places } from "@/data/places";

const bindPopupMock = vi.fn();
const circleSetStyleMock = vi.fn();
const circleMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
  setStyle: circleSetStyleMock,
}));
const markerMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  bindPopup: bindPopupMock,
  remove: vi.fn(),
}));
const localStorageState = new Map<string, string>();
const mapOffMock = vi.fn();
const mapOnMock = vi.fn();
const permissionStatusMock = { onchange: null, state: "prompt" } as unknown as PermissionStatus;
const watchPositionMock = vi.fn();

vi.mock("leaflet", () => ({
  default: {},
  circle: circleMock,
  map: vi.fn(() => ({
    createPane: vi.fn(),
    getPane: vi.fn(() => ({ style: {} })),
    off: mapOffMock,
    on: mapOnMock,
    remove: vi.fn(),
    setView: vi.fn().mockReturnThis(),
  })),
  tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
  marker: markerMock,
  divIcon: vi.fn((options) => options),
}));

describe("TravelMap", () => {
  beforeEach(() => {
    bindPopupMock.mockClear();
    circleMock.mockClear();
    circleSetStyleMock.mockClear();
    mapOffMock.mockClear();
    mapOnMock.mockClear();
    markerMock.mockClear();
    watchPositionMock.mockReset();
    watchPositionMock.mockReturnValue(1);
    localStorageState.clear();
    Object.defineProperty(global.window, "localStorage", {
      configurable: true,
      value: {
        clear: () => localStorageState.clear(),
        getItem: (key: string) => localStorageState.get(key) ?? null,
        removeItem: (key: string) => localStorageState.delete(key),
        setItem: (key: string, value: string) => localStorageState.set(key, value),
      },
    });
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

  it("renders user location as a single anchored marker after a successful geolocation fix", async () => {
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
      expect(markerMock).toHaveBeenCalledWith([52.51, 13.4], expect.objectContaining({ pane: "travel-map-user-location", zIndexOffset: 10_000 }));
      const markerCalls = markerMock.mock.calls as unknown[][];
      const userMarkerOptions = markerCalls.at(-1)?.[1] as { icon?: { html?: string } } | undefined;
      expect(circleMock).not.toHaveBeenCalled();
      expect(mapOnMock).not.toHaveBeenCalledWith("zoomstart", expect.any(Function));
      expect(mapOnMock).not.toHaveBeenCalledWith("zoomend", expect.any(Function));
      expect(userMarkerOptions?.icon?.html).toContain("viewBox=\"0 0 54 54\"");
      expect(userMarkerOptions?.icon?.html).toContain("data-accuracy-halo=\"true\"");
      expect(userMarkerOptions?.icon?.html).toContain("r=\"18\"");
      expect(userMarkerOptions?.icon?.html).toContain("rotate(45 27 27)");
      expect(userMarkerOptions?.icon).toEqual(expect.objectContaining({ iconAnchor: [27, 27], iconSize: [54, 54] }));
    });
  });

  it("scales the marker halo based on geolocation accuracy without adding vector layers", async () => {
    watchPositionMock.mockImplementation((success: PositionCallback) => {
      success({
        coords: {
          accuracy: 120,
          heading: null,
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
        <TravelMap places={[]} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(markerMock).toHaveBeenCalledWith([52.51, 13.4], expect.objectContaining({ pane: "travel-map-user-location" }));
    });

    const markerCalls = markerMock.mock.calls as unknown[][];
    const userMarkerOptions = markerCalls.at(-1)?.[1] as { icon?: { html?: string } } | undefined;
    expect(circleMock).not.toHaveBeenCalled();
    expect(userMarkerOptions?.icon?.html).toContain("r=\"26\"");
    expect(userMarkerOptions?.icon?.html).not.toContain("rotate(");
  });

  it("rehydrates the last cached location immediately after reload", async () => {
    window.localStorage.setItem("berlin-guide-last-location", JSON.stringify({
      accuracy: 22,
      heading: null,
      headingSource: null,
      lat: 52.52,
      lng: 13.405,
      speed: null,
      updatedAt: Date.now(),
    }));

    render(
      <FavoritesProvider>
        <TravelMap places={[]} locale="es" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(markerMock).toHaveBeenCalledWith([52.52, 13.405], expect.objectContaining({ pane: "travel-map-user-location" }));
      const markerCalls = markerMock.mock.calls as unknown[][];
      const userMarkerOptions = markerCalls.at(-1)?.[1] as { icon?: { html?: string } } | undefined;
      expect(circleMock).not.toHaveBeenCalled();
      expect(userMarkerOptions?.icon?.html).toContain("viewBox=\"0 0 54 54\"");
      expect(userMarkerOptions?.icon?.html).toContain("r=\"18\"");
      expect(userMarkerOptions?.icon?.html).not.toContain("rotate(");
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

    await waitFor(
      async () => {
        expect(await screen.findByRole("button", { name: /activar orientación/i })).toBeInTheDocument();
      },
      { timeout: 2_000 },
    );
  }, 8_000);
});
