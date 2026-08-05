import type { Locator, Page } from '@playwright/test';
import { ChatWidget } from './ChatWidget';

// Source: app/(site)/page.tsx, components/Hero.tsx, components/Navbar.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flow 2.
export class HomePage {
  readonly heroHeading: Locator;
  readonly featuredPostLink: Locator;
  readonly navResumeLink: Locator;
  readonly heroResumeLink: Locator;
  readonly heroContactLink: Locator;
  readonly chat: ChatWidget;

  constructor(readonly page: Page) {
    // Invariant: "Chris Stipes" is the only h1 on the page.
    this.heroHeading = page.getByRole('heading', { level: 1, name: 'Chris Stipes' });
    // Featured blog card heading is hardcoded in page.tsx, not frontmatter.
    this.featuredPostLink = page.getByRole('link', { name: /how i built this site/i });
    // The hero and navbar resume links share the accessible name
    // "Download resume PDF", so both must be scoped to their own region or
    // the locator is ambiguous under strict mode.
    this.navResumeLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Download resume PDF' });

    const hero = page.locator('section').filter({ has: this.heroHeading });
    this.heroResumeLink = hero.getByRole('link', { name: 'Download resume PDF' });
    this.heroContactLink = hero.getByRole('link', { name: 'Contact Chris Stipes via email' });
    this.chat = new ChatWidget(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
