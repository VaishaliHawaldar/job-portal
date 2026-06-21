import { describe, it, expect } from "vitest";
import { getJob } from "./jobs";

// Pure-logic unit test: no DOM, no React — just a function and its output.
// This is the fastest, most stable kind of test. Push logic into functions
// like this so it can be tested without rendering anything.
describe("getJob", () => {
  it("returns the job matching an id", () => {
    const job = getJob("senior-frontend-engineer");
    expect(job?.company).toBe("Nimbus Labs");
  });

  it("returns undefined for an unknown id", () => {
    expect(getJob("does-not-exist")).toBeUndefined();
  });
});
