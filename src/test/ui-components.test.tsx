import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { SiteNav } from "@/components/layout/SiteNav";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { ui } from "@/lib/i18n";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("FavoriteButton", () => {
  it("calls toggle handler", () => {
    const onToggle = vi.fn();
    render(<FavoriteButton active={false} onToggle={onToggle} locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe("SiteNav", () => {
  it("uses a compact mobile nav and opens secondary links in a panel", () => {
    render(
      <ThemeProvider>
        <LocaleProvider>
          <SiteNav />
        </LocaleProvider>
      </ThemeProvider>,
    );

    expect(screen.getAllByRole("link", { name: /Inicio/ }).length).toBeGreaterThan(0);
    const more = screen.getByRole("button", { name: "Mas" });
    expect(more).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(more);

    expect(more).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: /Favoritos/ }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Mercados/ }).length).toBeGreaterThan(0);
  });
});

describe("i18n dictionary", () => {
  it("keeps critical nav labels translated", () => {
    expect(ui.nav.home.es).toBeTruthy();
    expect(ui.nav.home.en).toBeTruthy();
    expect(ui.nav.map.es).toBeTruthy();
    expect(ui.nav.map.en).toBeTruthy();
  });
});
