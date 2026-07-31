import { test, expect } from './fixtures';

test('chat bot article loads', async ({ blogPostPage }) => {
  const response = await blogPostPage.goto('chat-bot');
  expect(response?.ok()).toBeTruthy();
  await expect(blogPostPage.article).toBeVisible();
});

test('missing post returns 404', async ({ blogPostPage }) => {
  const response = await blogPostPage.goto('does-not-exist');
  expect(response?.status()).toBe(404);
});
