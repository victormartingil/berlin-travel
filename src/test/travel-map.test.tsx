import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { TravelMap } from "@/components/map/TravelMap";
import { places } from "@/data/places";

const bindPopupMock = vi.fn();
const circleMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
}));
const polylineMock = vi.fn(() => ({
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn(),
}));
const markerInstances: Array<{ on: ReturnType<typeof vi.fn> }> = [];
const markerMock = vi.fn(() => {
  const instance = {
    addTo: vi.fn().mockReturnThis(),
    bindPopup: bindPopupMock,
    on: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  };
  markerInstances.push(instance);
  return instance;
});
const permissionStatusMock = { onchange: null, state: "prompt" } as unknown as PermissionStatus;
const watchPositionMock = vi.fn();

vi.mock("leaflet", () => ({
  default: {},
  circle: circleMock,
  polyline: polylineMock,
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
    polylineMock.mockClear();
    markerInstances.length = 0;
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

  it("starts geolocation when the user requests it", async () => {
    render(
      <FavoritesProvider>
        <TravelMap places={places.slice(0, 2)} locale="es" />
      </FavoritesProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /mostrar mi ubicación/i }));

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

    fireEvent.click(screen.getByRole("button", { name: /show my location/i }));

    await waitFor(() => {
      expect(circleMock).toHaveBeenCalledWith([52.51, 13.4], expect.objectContaining({ radius: 18 }));
    });
  });

  it("shows a walking preview card after selecting a marker", async () => {
    const destination = places.find((place) => place.id === "yaam");
    expect(destination?.coordinates).toBeDefined();

    render(
      <FavoritesProvider>
        <TravelMap places={destination ? [places[0], destination] : places.slice(0, 2)} locale="es" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(markerInstances.length).toBeGreaterThan(1);
    });

    const clickHandler = markerInstances.at(-1)?.on.mock.calls.find(([eventName]) => eventName === "click")?.[1] as (() => void) | undefined;
    expect(clickHandler).toBeDefined();
    await act(async () => {
      clickHandler?.();
    });

    expect(await screen.findByText(/trayecto estimado/i)).toBeInTheDocument();
    expect(screen.getByText(/km a pie/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /abrir ruta a pie/i })).toHaveAttribute("href", expect.stringContaining("google.com/maps/dir"));
    expect(polylineMock).toHaveBeenCalled();
  });

  it("closes the route preview card", async () => {
    const destination = places.find((place) => place.id === "yaam");
    expect(destination?.coordinates).toBeDefined();

    render(
      <FavoritesProvider>
        <TravelMap places={destination ? [places[0], destination] : places.slice(0, 2)} locale="en" />
      </FavoritesProvider>,
    );

    await waitFor(() => {
      expect(markerInstances.length).toBeGreaterThan(1);
    });

    const clickHandler = markerInstances.at(-1)?.on.mock.calls.find(([eventName]) => eventName === "click")?.[1] as (() => void) | undefined;
    await act(async () => {
      clickHandler?.();
    });

    const closeButton = await screen.findByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/estimated walk preview/i)).not.toBeInTheDocument();
    });
  });
});
