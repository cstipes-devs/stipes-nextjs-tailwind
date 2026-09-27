import type { Locator, Page } from '@playwright/test';

// Source: app/(site)/about/page.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flows 4 and 5.
export class AboutPage {
  readonly heading: Locator;
  readonly resumeViewer: Locator;
  readonly resumeOpenLink: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1, name: 'About' });
    // The embedded <object> PDF viewer, named via aria-label.
    this.resumeViewer = page.getByLabel('Résumé PDF');
    // Distinct name from the navbar's "Download resume PDF" link, which is
    // also on this page.
    this.resumeOpenLink = page.getByRole('link', { name: 'Open resume PDF in new tab' });
  }

  async goto() {
    return this.page.goto('/about');
  }
}
