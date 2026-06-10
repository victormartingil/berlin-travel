import { describe, expect, it } from "vitest";
import { getCompassLabel, getOrientationHeading, normalizeHeading } from "@/lib/userLocation";

describe("userLocation helpers", () => {
  it("normalizes headings into the 0-359 range", () => {
    expect(normalizeHeading(-15)).toBe(345);
    expect(normalizeHeading(725)).toBe(5);
  });

  it("returns locale-aware compass labels", () => {
    expect(getCompassLabel(224, "en")).toBe("SW");
    expect(getCompassLabel(224, "es")).toBe("SO");
    expect(getCompassLabel(314, "es")).toBe("NO");
  });

  it("prefers native compass heading when available", () => {
    const event = {
      alpha: 70,
      webkitCompassHeading: 130,
    } as DeviceOrientationEvent & { webkitCompassHeading: number };

    expect(getOrientationHeading(event)).toBe(130);
  });

  it("falls back to alpha-based heading", () => {
    const event = {
      alpha: 90,
    } as DeviceOrientationEvent;

    expect(getOrientationHeading(event)).toBe(270);
  });
});
