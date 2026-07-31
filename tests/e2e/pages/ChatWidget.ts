import type { Locator, Page } from '@playwright/test';

// Component object for the floating chat widget.
// Sources: app/(site)/components/ChatWidget.tsx, ChatWindow.tsx.
// Invariants covered: docs/CRITICAL_FLOWS.md Flow 1.
export class ChatWidget {
  readonly launcher: Locator;
  readonly minimizeButton: Locator;
  readonly input: Locator;
  readonly sendButton: Locator;
  // The message list exposes no landmark or list role — bubbles are plain divs
  // inside the scroll container (ChatWindow.tsx:92-114). Class-based locator by
  // necessity; flagged as an accessibility gap in docs/CRITICAL_FLOWS.md.
  readonly messages: Locator;
  // Error state is conveyed only by color (bg-red-900/50), not by a role or
  // aria-live region — same accessibility gap as above.
  readonly errorBubbles: Locator;

  constructor(readonly page: Page) {
    this.launcher = page.getByRole('button', { name: 'Open Stipes bot' });
    this.minimizeButton = page.getByRole('button', { name: 'Minimize chat' });
    this.input = page.getByPlaceholder('Type your message...');
    // exact: the label flips to "Sending…" while a request is in flight.
    this.sendButton = page.getByRole('button', { name: 'Send', exact: true });
    this.messages = page.locator('.overflow-y-auto > div');
    this.errorBubbles = page.locator('.overflow-y-auto > div.bg-red-900\\/50');
  }

  async open() {
    await this.launcher.click();
  }

  async send(text: string) {
    await this.input.fill(text);
    await this.sendButton.click();
  }

  lastMessage(): Locator {
    return this.messages.last();
  }
}
