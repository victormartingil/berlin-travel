import { describe, expect, it } from "vitest";
import { places } from "@/data/places";
import { buildGoogleMapsDirectionsUrl, buildGoogleMapsPlaceUrl } from "@/lib/maps";

describe("maps urls", () => {
  it("builds place url", () => {
    const url = buildGoogleMapsPlaceUrl(places[0]);
    expect(url).toContain("google.com/maps/search");
    expect(url).toContain("Nena");
    expect(url).not.toContain("52.5032");
  });

  it("builds directions url", () => {
    const url = buildGoogleMapsDirectionsUrl("Moritzplatz", "Museum Island", "transit");
    expect(url).toContain("travelmode=transit");
  });
});
