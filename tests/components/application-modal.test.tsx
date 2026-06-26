import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationModal from "@/components/application-modal";
import { JOBS } from "@/lib/jobs";

describe("ApplicationModal", () => {
  const job = JOBS[0];

  it("shows which job is being applied for", () => {
    render(<ApplicationModal job={job} onClose={() => {}} />);

    expect(
      screen.getByRole("heading", {
        name: new RegExp(`apply for ${job.title}`, "i"),
      }),
    ).toBeInTheDocument();
  });

  it("submits the form and shows a success message", async () => {
    const user = userEvent.setup();
    render(<ApplicationModal job={job} onClose={() => {}} />);

    await user.type(screen.getByLabelText(/full name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.click(
      screen.getByRole("button", { name: /submit application/i }),
    );

    // The mock submit resolves after a short delay — findBy* polls until the
    // success text appears (or times out), so we await asynchronous UI safely.
    expect(
      await screen.findByText(/application sent/i, {}, { timeout: 2000 }),
    ).toBeInTheDocument();
  });

  it("calls onClose when the ✕ button is clicked", async () => {
    const user = userEvent.setup();
    // vi.fn() is a spy: it records whether and how it was called.
    const onClose = vi.fn();
    render(<ApplicationModal job={job} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });
});
