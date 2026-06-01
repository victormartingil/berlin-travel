import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { ThemeProvider, themeStorageKey, useTheme } from "@/components/theme/ThemeProvider";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

function ThemeProbe() {
  const { preference, resolvedTheme } = useTheme();
  return <span data-testid="theme-probe">{preference}:{resolvedTheme}</span>;
}

function renderThemeUi() {
  return render(
    <ThemeProvider>
      <LocaleProvider>
        <ThemeSwitch />
        <ThemeProbe />
      </LocaleProvider>
    </ThemeProvider>,
  );
}

function mockLocalStorage() {
  const store = new Map<string, string>();
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => store.set(key, value)),
      removeItem: vi.fn((key: string) => store.delete(key)),
      clear: vi.fn(() => store.clear()),
    },
  });
}

beforeEach(() => {
  mockLocalStorage();
});

afterEach(() => {
  window.localStorage?.clear();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-preference");
});

describe("ThemeProvider", () => {
  it("falls back to dark when system preference cannot be detected", async () => {
    Object.defineProperty(window, "matchMedia", { configurable: true, value: undefined });

    renderThemeUi();

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("dark"));
    expect(screen.getByTestId("theme-probe")).toHaveTextContent("system:dark");
  });

  it("stores a manual light theme preference", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    const view = renderThemeUi();
    fireEvent.click(view.getByRole("button", { name: /claro/i }));

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("light"));
    expect(window.localStorage.getItem(themeStorageKey)).toBe("light");
  });
});
