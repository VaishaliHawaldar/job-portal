import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobBoard from "@/components/job-board";

// Component test: render the component, then assert on what a USER would see
// (accessible roles/text), not on internal state. That keeps the test valid
// even if we refactor the implementation.
describe("JobBoard", () => {
  it("renders the heading and the job list", () => {
    render(<JobBoard />);

    expect(
      screen.getByRole("heading", { level: 1, name: /find your next role/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /senior frontend engineer/i }),
    ).toBeInTheDocument();
  });

  it("filters the list as the user types in the search box", async () => {
    const user = userEvent.setup();
    render(<JobBoard />);

    await user.type(screen.getByPlaceholderText(/search title/i), "devops");

    // The matching job stays...
    expect(
      screen.getByRole("heading", { name: /devops engineer/i }),
    ).toBeInTheDocument();
    // ...and a non-matching one is removed from the DOM.
    expect(
      screen.queryByRole("heading", { name: /product designer/i }),
    ).not.toBeInTheDocument();
  });
});
