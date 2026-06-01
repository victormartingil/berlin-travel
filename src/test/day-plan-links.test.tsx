import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DayPlan } from "@/components/itinerary/DayPlan";
import { events } from "@/data/events";
import { itinerary } from "@/data/itinerary";
import { places } from "@/data/places";

vi.mock("@/components/itinerary/DayRouteMap", () => ({
  DayRouteMap: () => null,
}));

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

  it("adds readable context for opaque itinerary stop names", () => {
    const wednesday = itinerary.find((day) => day.date === "2026-06-10");
    expect(wednesday).toBeDefined();

    render(<DayPlan day={wednesday!} locale="es" places={places} events={events} />);

    expect(screen.getByText("Bloque principal")).toBeInTheDocument();
    expect(screen.getByText(/Museo ·/)).toHaveTextContent("Museo de arte moderno");
    expect(screen.getByText(/Alternativo ·/)).toHaveTextContent("centro artistico/cultural");
    expect(screen.getByText(/La parte que mas define el dia/)).toBeInTheDocument();
  });

  it("links event-only route items back to their venue ficha", () => {
    const saturday = itinerary.find((day) => day.date === "2026-06-13");
    expect(saturday).toBeDefined();

    render(<DayPlan day={saturday!} locale="es" places={places} events={events} />);

    expect(screen.getAllByText(/Evento ·/).some((node) => node.textContent?.includes("Else"))).toBe(true);
    expect(screen.getAllByRole("link", { name: "Ficha: Else" }).some((link) => link.getAttribute("href")?.startsWith("/places/else"))).toBe(true);
  });
});
