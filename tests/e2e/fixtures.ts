import { test as base, expect, type Page, type Route } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ChatWidget } from './pages/ChatWidget';

// The JSON response shapes the client accepts, in the fallback order
// implemented in ChatWindow.tsx:62-73. Each is a documented invariant
// (docs/CRITICAL_FLOWS.md, Flow 1): the upstream contract is loose, so
// narrowing this chain silently produces blank replies.
export const RESPONSE_SHAPES = [
  'choices',
  'messageContent',
  'answer',
  'reply',
  'response',
  'message',
  'text',
  'output',
] as const;
export type ResponseShape = (typeof RESPONSE_SHAPES)[number];

function bodyForShape(shape: ResponseShape, text: string): unknown {
  switch (shape) {
    case 'choices':
      return { choices: [{ message: { content: text } }] };
    case 'messageContent':
      return { message: { content: text } };
    default:
      return { [shape]: text };
  }
}

// Mocks the app's own /api/chat boundary. Lazy: no route is installed until a
// method is called, so specs that never use this fixture intercept nothing.
// Smoke specs must never use it — they certify the real upstream.
export class ChatApiMock {
  private installed = false;
  private handler: (route: Route) => Promise<void> = (route) => route.continue();
  requestCount = 0;

  constructor(private page: Page) {}

  private async install() {
    if (this.installed) return;
    this.installed = true;
    await this.page.route('**/api/chat', async (route) => {
      this.requestCount += 1;
      await this.handler(route);
    });
  }

  /** Fulfill every chat request with the given shape wrapping `text`. */
  async replyWith(shape: ResponseShape, text: string) {
    this.handler = (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(bodyForShape(shape, text)),
      });
    await this.install();
  }

  /** Fulfill with an arbitrary JSON body (e.g. an unrecognized shape). */
  async replyRaw(body: unknown) {
    this.handler = (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    await this.install();
  }

  /** Fulfill with a non-JSON text body — the client must render it as-is. */
  async replyPlainText(text: string) {
    this.handler = (route) =>
      route.fulfill({ status: 200, contentType: 'text/plain; charset=utf-8', body: text });
    await this.install();
  }

  /** Upstream failure: the client must show the red error bubble. */
  async failUpstream(status = 500, body = 'upstream error') {
    this.handler = (route) =>
      route.fulfill({ status, contentType: 'text/plain; charset=utf-8', body });
    await this.install();
  }

  /** Network-level failure (connection refused). */
  async abort() {
    this.handler = (route) => route.abort('connectionrefused');
    await this.install();
  }

  /** Fulfill only for a specific message; everything else passes through. */
  async onlyFor(message: string, body: unknown) {
    this.handler = async (route) => {
      const raw = route.request().postData();
      try {
        if (raw && JSON.parse(raw)?.message === message) {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(body),
          });
          return;
        }
      } catch {
        // fall through to continue when payload cannot be parsed
      }
      await route.continue();
    };
    await this.install();
  }

  /** Count requests without altering them (guard tests). */
  async trackOnly() {
    this.handler = (route) => route.continue();
    await this.install();
  }

  async dispose() {
    if (this.installed) {
      await this.page.unroute('**/api/chat');
      this.installed = false;
    }
  }
}

type Fixtures = {
  homePage: HomePage;
  blogIndexPage: BlogIndexPage;
  blogPostPage: BlogPostPage;
  aboutPage: AboutPage;
  chatWidget: ChatWidget;
  chatApi: ChatApiMock;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  blogIndexPage: async ({ page }, use) => {
    await use(new BlogIndexPage(page));
  },
  blogPostPage: async ({ page }, use) => {
    await use(new BlogPostPage(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  chatWidget: async ({ page }, use) => {
    await use(new ChatWidget(page));
  },
  chatApi: async ({ page }, use) => {
    const mock = new ChatApiMock(page);
    await use(mock);
    await mock.dispose();
  },
});

export { expect };
