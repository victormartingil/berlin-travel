"use client";

import { useEffect, useRef, useState } from "react";
import { getOrientationHeading } from "@/lib/userLocation";

type LocationPermissionState = PermissionState | "unsupported" | "unknown";
type CompassPermissionState = "idle" | "unsupported" | "granted" | "denied";
type HeadingSource = "geolocation" | "deviceorientation";
type DeviceOrientationWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export type UserLocationSnapshot = {
  accuracy: number;
  heading: number | null;
  headingSource: HeadingSource | null;
  lat: number;
  lng: number;
  speed: number | null;
  updatedAt: number;
};

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 15_000,
  timeout: 15_000,
};
const ORIENTATION_AUTO_WAIT_MS = 1_200;
const LOCATION_STORAGE_KEY = "berlin-guide-last-location";
const LOCATION_CACHE_MAX_AGE_MS = 5 * 60_000;

function buildLocationSnapshot(position: GeolocationPosition, previous: UserLocationSnapshot | null): UserLocationSnapshot {
  const nextHeading = typeof position.coords.heading === "number" && Number.isFinite(position.coords.heading)
    ? position.coords.heading
    : null;

  return {
    accuracy: position.coords.accuracy,
    heading: previous?.headingSource === "deviceorientation" ? previous.heading : nextHeading,
    headingSource: previous?.headingSource === "deviceorientation" ? previous.headingSource : nextHeading !== null ? "geolocation" : previous?.headingSource ?? null,
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    speed: position.coords.speed,
    updatedAt: position.timestamp,
  };
}

function readCachedLocation(): UserLocationSnapshot | null {
  if (typeof window === "undefined" || !window.localStorage) return null;

  try {
    const raw = window.localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<UserLocationSnapshot>;
    if (
      typeof parsed?.lat !== "number"
      || typeof parsed.lng !== "number"
      || typeof parsed.accuracy !== "number"
      || typeof parsed.updatedAt !== "number"
      || Date.now() - parsed.updatedAt > LOCATION_CACHE_MAX_AGE_MS
    ) {
      window.localStorage.removeItem(LOCATION_STORAGE_KEY);
      return null;
    }

    return {
      accuracy: parsed.accuracy,
      heading: typeof parsed.heading === "number" ? parsed.heading : null,
      headingSource: parsed.headingSource === "deviceorientation" || parsed.headingSource === "geolocation" ? parsed.headingSource : null,
      lat: parsed.lat,
      lng: parsed.lng,
      speed: typeof parsed.speed === "number" ? parsed.speed : null,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    window.localStorage.removeItem(LOCATION_STORAGE_KEY);
    return null;
  }
}

export function useUserLocation() {
  const watchIdRef = useRef<number | null>(null);
  const permissionRef = useRef<PermissionStatus | null>(null);
  const deviceOrientationListenerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(null);
  const orientationFallbackTimeoutRef = useRef<number | null>(null);
  const compassActiveRef = useRef(false);
  const [locationPermission, setLocationPermission] = useState<LocationPermissionState>("unknown");
  const [compassPermission, setCompassPermission] = useState<CompassPermissionState>("idle");
  const [location, setLocation] = useState<UserLocationSnapshot | null>(() => readCachedLocation());
  const [locationError, setLocationError] = useState<string | null>(null);
  const [compassError, setCompassError] = useState<string | null>(null);
  const [isCompassActive, setIsCompassActive] = useState(false);
  const [needsCompassGesture, setNeedsCompassGesture] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    compassActiveRef.current = isCompassActive;
  }, [isCompassActive]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage || !location) return;

    try {
      window.localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } catch {
      // Ignore storage failures; live geolocation still works without cache.
    }
  }, [location]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("geolocation" in navigator)) {
      queueMicrotask(() => setLocationPermission("unsupported"));
      return;
    }

    const geolocation = navigator.geolocation;

    const startWatching = () => {
      if (watchIdRef.current !== null) return;

      setIsLocating(true);
      setLocationError(null);
      watchIdRef.current = geolocation.watchPosition(
        (position) => {
          setLocation((previous) => buildLocationSnapshot(position, previous));
          setLocationPermission("granted");
          setIsLocating(false);
        },
        (error) => {
          setIsLocating(false);
          setLocationError(error.code === error.PERMISSION_DENIED ? "denied" : error.message);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermission("denied");
          }
        },
        GEOLOCATION_OPTIONS,
      );
    };

    void (async () => {
      if (!("permissions" in navigator) || !navigator.permissions?.query) return;

      try {
        const permissionStatus = await navigator.permissions.query({ name: "geolocation" as PermissionName });
        permissionRef.current = permissionStatus;
        setLocationPermission(permissionStatus.state);

        permissionStatus.onchange = () => {
          setLocationPermission(permissionStatus.state);
          if (permissionStatus.state === "granted") {
            startWatching();
          }
        };

        if (permissionStatus.state === "granted") {
          startWatching();
        } else if (permissionStatus.state === "prompt") {
          startWatching();
        }
      } catch {
        setLocationPermission("unknown");
        startWatching();
      }
    })();

    return () => {
      if (watchIdRef.current !== null) {
        geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (permissionRef.current) {
        permissionRef.current.onchange = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const DeviceOrientationCtor = window.DeviceOrientationEvent as DeviceOrientationWithPermission | undefined;
    if (!DeviceOrientationCtor) {
      queueMicrotask(() => setCompassPermission("unsupported"));
      queueMicrotask(() => setNeedsCompassGesture(false));
      return;
    }

    queueMicrotask(() => setNeedsCompassGesture(false));

    if (deviceOrientationListenerRef.current) return;

    const listener = (event: DeviceOrientationEvent) => {
      const heading = getOrientationHeading(event);
      if (heading === null) return;
      if (orientationFallbackTimeoutRef.current !== null) {
        window.clearTimeout(orientationFallbackTimeoutRef.current);
        orientationFallbackTimeoutRef.current = null;
      }
      setCompassPermission("granted");
      setIsCompassActive(true);
      setNeedsCompassGesture(false);
      setLocation((previous) => {
        if (!previous) return previous;
        return {
          ...previous,
          heading,
          headingSource: "deviceorientation",
        };
      });
    };

    deviceOrientationListenerRef.current = listener;
    window.addEventListener("deviceorientation", listener);

    if (typeof DeviceOrientationCtor.requestPermission === "function") {
      orientationFallbackTimeoutRef.current = window.setTimeout(() => {
        if (!compassActiveRef.current) {
          setNeedsCompassGesture(true);
        }
      }, ORIENTATION_AUTO_WAIT_MS);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (orientationFallbackTimeoutRef.current !== null) {
        window.clearTimeout(orientationFallbackTimeoutRef.current);
        orientationFallbackTimeoutRef.current = null;
      }
      if (deviceOrientationListenerRef.current) {
        window.removeEventListener("deviceorientation", deviceOrientationListenerRef.current);
        deviceOrientationListenerRef.current = null;
      }
    };
  }, []);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationPermission("unsupported");
      setLocationError("unsupported");
      return;
    }

    if (watchIdRef.current !== null) return;

    setIsLocating(true);
    setLocationError(null);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setLocation((previous) => buildLocationSnapshot(position, previous));
        setLocationPermission("granted");
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        setLocationError(error.code === error.PERMISSION_DENIED ? "denied" : error.message);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermission("denied");
        }
      },
      GEOLOCATION_OPTIONS,
    );
  };

  const requestCompass = async () => {
    if (typeof window === "undefined") return;

    const DeviceOrientationCtor = window.DeviceOrientationEvent as DeviceOrientationWithPermission | undefined;
    if (!DeviceOrientationCtor) {
      setCompassPermission("unsupported");
      setCompassError("unsupported");
      setNeedsCompassGesture(false);
      return;
    }

    setCompassError(null);

    if (typeof DeviceOrientationCtor.requestPermission === "function") {
      try {
        const permission = await DeviceOrientationCtor.requestPermission();
        if (permission !== "granted") {
          setCompassPermission("denied");
          setCompassError("denied");
          setNeedsCompassGesture(true);
          return;
        }
        setNeedsCompassGesture(false);
      } catch {
        setCompassPermission("denied");
        setCompassError("denied");
        setNeedsCompassGesture(true);
        return;
      }
    }

    if (deviceOrientationListenerRef.current) {
      setCompassPermission("granted");
      setIsCompassActive(true);
      return;
    }

    const listener = (event: DeviceOrientationEvent) => {
      const heading = getOrientationHeading(event);
      if (heading === null) return;
      setCompassPermission("granted");
      setIsCompassActive(true);
      setNeedsCompassGesture(false);
      setLocation((previous) => {
        if (!previous) return previous;
        return {
          ...previous,
          heading,
          headingSource: "deviceorientation",
        };
      });
    };

    deviceOrientationListenerRef.current = listener;
    window.addEventListener("deviceorientation", listener);
    setCompassPermission("granted");
  };

  return {
    compassError,
    compassPermission,
    isCompassActive,
    isLocating,
    location,
    locationError,
    locationPermission,
    needsCompassGesture,
    requestCompass,
    requestLocation,
  };
}
