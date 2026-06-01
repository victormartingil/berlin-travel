import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { ui } from "@/lib/i18n";

describe("FavoriteButton", () => {
  it("calls toggle handler", () => {
    const onToggle = vi.fn();
    render(<FavoriteButton active={false} onToggle={onToggle} locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
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
