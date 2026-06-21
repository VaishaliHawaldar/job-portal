// Adds DOM-aware matchers like toBeInTheDocument() to Vitest's expect.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount any rendered components after each test so DOM/state never leaks
// between tests — a common source of flaky, order-dependent suites.
afterEach(() => {
  cleanup();
});
