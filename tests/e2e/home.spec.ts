import { test, expect } from '@playwright/test';

test('home page renders hero heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /chris stipes/i })).toBeVisible();
});
