import { test, expect } from '@playwright/test';

test('chat bot article loads', async ({ page }) => {
  const response = await page.goto('/blog/chat-bot');
  expect(response?.ok()).toBeTruthy();
});
