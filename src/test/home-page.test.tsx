import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

describe("HomePage", () => {
  it("renders title", () => {
    render(
      <LocaleProvider>
        <FavoritesProvider>
          <HomePage />
        </FavoritesProvider>
      </LocaleProvider>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("links the accommodation card to its internal detail page", () => {
    render(
      <LocaleProvider>
        <FavoritesProvider>
          <HomePage />
        </FavoritesProvider>
      </LocaleProvider>
    );

    expect(screen.getByRole("link", { name: "Ver ficha" }).getAttribute("href")).toMatch(/^\/places\/accommodation-nena-moritzplatz\/?$/);
  });
});
