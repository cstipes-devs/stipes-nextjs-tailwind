import { test, expect } from './fixtures';

test('home page renders hero heading', async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.heroHeading).toBeVisible();
});
