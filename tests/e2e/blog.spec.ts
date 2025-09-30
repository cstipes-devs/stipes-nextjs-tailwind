import { test, expect } from '@playwright/test';

test('chat bot article renders mermaid diagram', async ({ page }) => {
  await page.goto('/blog/chat-bot');
  await expect(page.locator('svg[data-diagram="architecture"]')).toBeVisible();
});
