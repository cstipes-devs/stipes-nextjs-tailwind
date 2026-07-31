import { test, expect, RESPONSE_SHAPES } from './fixtures';

// Contract tests for the chat flow's API error handling and response parsing.
// The upstream contract is loose (docs/CRITICAL_FLOWS.md, Flow 1), so every
// documented response shape and failure mode gets its own test. All requests
// are mocked at the /api/chat boundary via the chatApi fixture — this tier
// exists precisely to exercise the negative space the live smoke test cannot.

test.describe('chat response-shape contract', () => {
  for (const shape of RESPONSE_SHAPES) {
    test(`renders a reply from the '${shape}' response shape`, async ({ homePage, chatApi }) => {
      const replyText = `reply via ${shape}`;
      await chatApi.replyWith(shape, replyText);

      await homePage.goto();
      await homePage.chat.open();
      await homePage.chat.send('hello');

      await expect(homePage.chat.lastMessage()).toHaveText(replyText);
      await expect(homePage.chat.errorBubbles).toHaveCount(0);
    });
  }

  test('renders an unrecognized JSON shape as raw JSON (last-resort fallback)', async ({
    homePage,
    chatApi,
  }) => {
    const body = { totally: 'unexpected' };
    await chatApi.replyRaw(body);

    await homePage.goto();
    await homePage.chat.open();
    await homePage.chat.send('hello');

    await expect(homePage.chat.lastMessage()).toHaveText(JSON.stringify(body));
  });

  test('renders a non-JSON text reply as-is', async ({ homePage, chatApi }) => {
    await chatApi.replyPlainText('plain text answer');

    await homePage.goto();
    await homePage.chat.open();
    await homePage.chat.send('hello');

    await expect(homePage.chat.lastMessage()).toHaveText('plain text answer');
    await expect(homePage.chat.errorBubbles).toHaveCount(0);
  });
});

test.describe('chat error handling', () => {
  test('upstream 500 shows the error bubble and the input stays usable', async ({
    homePage,
    chatApi,
  }) => {
    await chatApi.failUpstream(500, 'upstream exploded');

    await homePage.goto();
    await homePage.chat.open();
    await homePage.chat.send('hello');

    await expect(homePage.chat.errorBubbles).toHaveCount(1);
    await expect(homePage.chat.lastMessage()).toHaveText('upstream exploded');

    // The widget must recover: typing again re-enables Send.
    await homePage.chat.input.fill('trying again');
    await expect(homePage.chat.sendButton).toBeEnabled();
  });

  test('network failure shows the error bubble', async ({ homePage, chatApi }) => {
    await chatApi.abort();

    await homePage.goto();
    await homePage.chat.open();
    await homePage.chat.send('hello');

    await expect(homePage.chat.errorBubbles).toHaveCount(1);
    await expect(homePage.chat.lastMessage()).not.toBeEmpty();
  });

  test('empty and whitespace input cannot be sent', async ({ homePage, chatApi }) => {
    await chatApi.trackOnly();

    await homePage.goto();
    await homePage.chat.open();

    await expect(homePage.chat.sendButton).toBeDisabled();

    await homePage.chat.input.fill('   ');
    await expect(homePage.chat.sendButton).toBeDisabled();

    // Implicit form submission via Enter must also be a no-op.
    await homePage.chat.input.press('Enter');
    await expect(homePage.chat.messages).toHaveCount(1); // intro only
    expect(chatApi.requestCount).toBe(0);
  });
});
