import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { PlaceCard } from "@/components/places/PlaceCard";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { places } from "@/data/places";

vi.mock("next/navigation", () => ({
  usePathname: () => "/art/",
}));

describe("PlaceCard", () => {
  it("renders an embedded thumbnail when place media exists", () => {
    const place = places.find((item) => item.id === "berlinische-galerie");
    expect(place).toBeDefined();

    render(
      <LocaleProvider>
        <FavoritesProvider>
          <PlaceCard place={place!} locale="es" />
        </FavoritesProvider>
      </LocaleProvider>,
    );

    expect(screen.getByRole("img", { name: /Berlinische Galerie/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Berlinische Galerie/i })[0]).toHaveAttribute("href", "/places/berlinische-galerie");
  });
});
