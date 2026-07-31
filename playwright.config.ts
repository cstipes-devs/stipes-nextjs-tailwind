import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

// Post-deployment smoke runs target a real deployment. Setting SMOKE_BASE_URL
// points the suite at that URL and disables the local dev server entirely.
const smokeBaseURL = process.env.SMOKE_BASE_URL;
const isSmoke = !!smokeBaseURL;

export default defineConfig({
  testDir: 'tests/e2e',
  use: {
    baseURL: smokeBaseURL ?? 'http://localhost:3000',
  },
  // Production cold starts and the real upstream chat service are slower than local.
  timeout: isSmoke ? 60_000 : 30_000,
  retries: isSmoke ? 2 : 0,
  fullyParallel: true,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: isSmoke
    ? undefined
    : {
        command: isCI ? 'npm run start' : 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
