import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DayPlan } from "@/components/itinerary/DayPlan";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { places } from "@/data/places";

describe("DayPlan internal links", () => {
  it("links mentioned place names to their internal detail pages", () => {
    const saturday = itinerary.find((day) => day.date === "2026-06-13");
    expect(saturday).toBeDefined();

    render(<DayPlan day={saturday!} locale="es" places={places} events={events} />);

    expect(screen.getAllByRole("link", { name: "RAW-Gelaende" }).some((link) => link.getAttribute("href")?.startsWith("/places/raw-gelaende"))).toBe(true);
    expect(screen.getAllByRole("link", { name: "Ficha: RAW-Gelaende" }).some((link) => link.getAttribute("href")?.startsWith("/places/raw-gelaende"))).toBe(true);
    expect(screen.getAllByRole("link", { name: "REWE voll pflanzlich" }).some((link) => link.getAttribute("href")?.startsWith("/places/rewe-voll-pflanzlich"))).toBe(true);
    expect(screen.getAllByRole("link", { name: "AEDEN" }).some((link) => link.getAttribute("href")?.startsWith("/places/aeden"))).toBe(true);
  });
});
