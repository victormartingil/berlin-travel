import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import ContextPage from "@/app/context/page";
import SafetyPage from "@/app/safety/page";
import HomePage from "@/app/page";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { contextCards, mediaRecommendations } from "@/data/contextGuide";
import { safetyCards } from "@/data/safetyGuide";

function renderWithProviders(ui: ReactElement) {
  return render(
    <LocaleProvider>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </LocaleProvider>,
  );
}

describe("context and safety content", () => {
  it("renders context, media and safety pages", () => {
    renderWithProviders(<ContextPage />);
    expect(screen.getByRole("heading", { name: /Historia, politica y cultura/i })).toBeInTheDocument();
    expect(screen.getByText("Good Bye, Lenin!")).toBeInTheDocument();

    renderWithProviders(<SafetyPage />);
    expect(screen.getByRole("heading", { name: /Guia de seguridad/i })).toBeInTheDocument();
    expect(screen.getByText(/112: ambulancia/)).toBeInTheDocument();
  });

  it("keeps sensitive guidance sourced and dated", () => {
    expect(contextCards.length).toBeGreaterThanOrEqual(4);
    expect(mediaRecommendations.length).toBeGreaterThanOrEqual(6);
    for (const card of safetyCards) {
      expect(card.sourceUrl).toMatch(/^https:\/\//);
      expect(card.lastVerifiedAt).toMatch(/^2026-06-02$/);
      expect(card.items.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("links context and safety from home quick actions", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole("link", { name: /Contexto/ }).getAttribute("href")).toMatch(/^\/context\/?$/);
    expect(screen.getByRole("link", { name: /Seguridad/ }).getAttribute("href")).toMatch(/^\/safety\/?$/);
  });
});
