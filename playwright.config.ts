import { defineConfig, devices } from '@playwright/test';
import { loadEnvConfig } from '@next/env';

// Playwright does not read .env files on its own. Reuse Next.js's loader so
// the test suite and the app resolve env vars identically (.env.local wins).
loadEnvConfig(process.cwd(), true, { info: () => {}, error: console.error });

const isCI = !!process.env.CI;

// Post-deployment smoke runs target a real deployment. Setting SMOKE_BASE_URL
// points the suite at that URL and disables the local dev server entirely.
// Treat an empty value as unset, so `SMOKE_BASE_URL= npm run e2e` is a valid
// way to override a value persisted in .env.local.
const smokeBaseURL = process.env.SMOKE_BASE_URL || undefined;
const isSmoke = !!smokeBaseURL;

// Local server origin; override with PLAYWRIGHT_BASE_URL when :3000 is taken.
// The port is passed through to the dev/start command below, so the server
// Playwright launches actually listens where baseURL expects it.
const localBaseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const localPort = new URL(localBaseURL).port || '3000';

export default defineConfig({
  testDir: 'tests/e2e',
  // When targeting a deployment, run ONLY @smoke specs. The other tiers mock
  // the network (page.route), and pointing those at a real deployment is both
  // meaningless and against the rules in docs/CRITICAL_FLOWS.md. This matters
  // because SMOKE_BASE_URL can be set persistently in .env.local, where it
  // would otherwise silently leak into `npm run e2e`.
  grep: isSmoke ? /@smoke/ : undefined,
  // Always write the HTML report; keep the terminal output readable too.
  // `open: 'never'` matters — the default ('on-failure') launches a browser and
  // blocks the process, which would hang smoke runs and CI. View it on demand
  // with `npm run report`. Smoke runs write to a separate folder so certifying
  // a deployment never overwrites the local run's report.
  reporter: [
    ['list'],
    ['html', { outputFolder: isSmoke ? 'playwright-report/smoke' : 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: smokeBaseURL ?? localBaseURL,
    // Diagnostics for failures: a trace on first retry, plus screenshot/video
    // kept only when a test fails. Cheap on green runs, invaluable on red.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
        command: isCI ? `npm run start -- -p ${localPort}` : `npm run dev -- -p ${localPort}`,
        url: localBaseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
