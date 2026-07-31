import type { Locator, Page } from '@playwright/test';

// Source: app/(site)/about/page.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flow 5.
export class AboutPage {
  readonly heading: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1, name: 'About' });
  }

  async goto() {
    return this.page.goto('/about');
  }
}
