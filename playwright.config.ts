import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORTFOLIO_E2E_PORT ?? "3105");
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 0,
  reporter: "list",
  use: { baseURL, trace: "retain-on-failure" },
  // Never reuse a dev server: another project may already be running on port 3000.
  webServer: { command: `npm run build && npm run start -- --hostname 127.0.0.1 --port ${port}`, url: baseURL, reuseExistingServer: false, timeout: 120_000 },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
