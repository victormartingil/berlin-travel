import { describe, expect, it } from "vitest";
import { formatDistanceKm, formatDurationMinutes, getHaversineDistanceKm, getRoutePreviewMetrics, getRoutePreviewTone, getRoutePreviewToneLabel } from "@/lib/routePreview";

describe("route preview helpers", () => {
  it("computes haversine distance between coordinates", () => {
    const distance = getHaversineDistanceKm(
      { lat: 52.5032, lng: 13.4101 },
      { lat: 52.5076, lng: 13.3904 },
    );

    expect(distance).toBeGreaterThan(1);
    expect(distance).toBeLessThan(2);
  });

  it("formats walking distance labels", () => {
    expect(formatDistanceKm(0.84, "es")).toBe("0.8 km a pie");
    expect(formatDistanceKm(3.26, "en")).toBe("3.3 km walk");
  });

  it("formats walking duration labels", () => {
    expect(formatDurationMinutes(11, "es")).toBe("11 min andando");
    expect(formatDurationMinutes(74, "en")).toBe("1 h 14 min walk");
  });

  it("classifies trip tone from duration", () => {
    expect(getRoutePreviewTone(8)).toBe("short");
    expect(getRoutePreviewTone(18)).toBe("medium");
    expect(getRoutePreviewTone(34)).toBe("long");
    expect(getRoutePreviewToneLabel("long", "es")).toBe("Mejor pensarlo con transporte");
  });

  it("builds preview metrics from two points", () => {
    const metrics = getRoutePreviewMetrics(
      { lat: 52.5032, lng: 13.4101 },
      { lat: 52.5076, lng: 13.3904 },
      "en",
    );

    expect(metrics.walkingDistanceKm).toBeGreaterThan(metrics.airDistanceKm);
    expect(metrics.durationMin).toBeGreaterThan(0);
    expect(metrics.distanceLabel).toContain("km");
    expect(metrics.durationLabel).toContain("walk");
  });
});
