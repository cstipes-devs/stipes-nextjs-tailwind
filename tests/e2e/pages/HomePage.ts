import type { Locator, Page } from '@playwright/test';
import { ChatWidget } from './ChatWidget';

// Source: app/(site)/page.tsx, components/Hero.tsx, components/Navbar.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flow 2.
export class HomePage {
  readonly heroHeading: Locator;
  readonly featuredPostLink: Locator;
  readonly navResumeLink: Locator;
  readonly chat: ChatWidget;

  constructor(readonly page: Page) {
    // Invariant: "Chris Stipes" is the only h1 on the page.
    this.heroHeading = page.getByRole('heading', { level: 1, name: 'Chris Stipes' });
    // Featured blog card heading is hardcoded in page.tsx, not frontmatter.
    this.featuredPostLink = page.getByRole('link', { name: /how i built this site/i });
    this.navResumeLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Download resume PDF' });
    this.chat = new ChatWidget(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
