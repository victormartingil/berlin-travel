import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RatingBadge } from "@/components/ui/RatingBadge";

describe("RatingBadge", () => {
  it("renders a Google rating snapshot accessibly", () => {
    render(
      <RatingBadge
        locale="es"
        rating={{
          placeId: "yaam",
          source: "google_places",
          rating: 4.4,
          reviewCount: 1832,
          lastVerifiedAt: "2026-06-02",
        }}
      />,
    );

    expect(screen.getByLabelText(/Google Maps: 4.4 estrellas/i)).toBeInTheDocument();
    expect(screen.getByText("4.4")).toBeInTheDocument();
    expect(screen.getByText("(1,8 mil)")).toBeInTheDocument();
  });

  it("renders nothing without a rating", () => {
    const { container } = render(<RatingBadge locale="en" />);
    expect(container).toBeEmptyDOMElement();
  });
});
