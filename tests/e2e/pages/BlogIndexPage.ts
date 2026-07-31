import type { Locator, Page } from '@playwright/test';

// Source: app/(site)/blog/page.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flow 3.
export class BlogIndexPage {
  readonly heading: Locator;
  // href-based by necessity: post titles come from MDX frontmatter, and
  // content/posts/chat-bot.mdx currently has none, so the link renders with no
  // accessible name and zero size. See the Flow 3 defect note in
  // docs/CRITICAL_FLOWS.md — switch to getByRole('link', { name }) once fixed.
  readonly postLinks: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1, name: 'Writing & Case Studies' });
    this.postLinks = page.locator('a[href^="/blog/"]');
  }

  async goto() {
    await this.page.goto('/blog');
  }

  async firstPostHref(): Promise<string | null> {
    return this.postLinks.first().getAttribute('href');
  }
}
