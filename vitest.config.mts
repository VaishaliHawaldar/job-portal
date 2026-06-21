import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // tsconfigPaths lets tests resolve the "@/*" alias just like the app does.
  plugins: [tsconfigPaths(), react()],
  test: {
    // jsdom gives us a fake DOM so React components can render without a browser.
    environment: "jsdom",
    // Run this file once before the suite to register custom matchers / cleanup.
    setupFiles: ["./vitest.setup.ts"],
  },
});
