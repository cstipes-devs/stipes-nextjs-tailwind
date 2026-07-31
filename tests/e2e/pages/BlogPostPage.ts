import type { Locator, Page } from '@playwright/test';

// Source: app/(site)/blog/[slug]/page.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flow 3.
export class BlogPostPage {
  readonly article: Locator;
  // Drift note (live-verified): the post page renders TWO h1s — the
  // frontmatter title (currently empty, Flow 3 defect) and a second h1 from
  // the MDX body's own `# heading`. `.first()` targets the frontmatter title.
  // Assert attached, not visible, until the frontmatter defect is fixed.
  readonly title: Locator;
  readonly bodyHeading: Locator;

  constructor(readonly page: Page) {
    this.article = page.locator('article');
    this.title = this.article.locator('h1').first();
    this.bodyHeading = this.article.locator('h1').nth(1);
  }

  async goto(slug: string) {
    return this.page.goto(`/blog/${slug}`);
  }
}
