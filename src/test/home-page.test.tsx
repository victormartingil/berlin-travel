import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

describe("HomePage", () => {
  it("renders title", () => {
    render(
      <LocaleProvider>
        <HomePage />
      </LocaleProvider>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
