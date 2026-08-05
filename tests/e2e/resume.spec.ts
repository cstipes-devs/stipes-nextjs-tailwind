import { test, expect } from './fixtures';

// Resume download flow (docs/CRITICAL_FLOWS.md Flow 4).
//
// Both entry points are certified: the navbar link (currently correct) and
// the hero link (currently 404s in production — see the Flow 4 defect note).
// These assert the CORRECT behavior, so the hero test fails until the link is
// pointed at a file that exists. That failure is the point: it is a live bug,
// not a test to be relaxed.

test.describe('resume download', () => {
  test('hero resume button points at a downloadable PDF', async ({ homePage, request }) => {
    await homePage.goto();

    await expect(homePage.heroResumeLink).toBeVisible();
    const href = await homePage.heroResumeLink.getAttribute('href');
    expect(href).toBeTruthy();

    const response = await request.get(href!);
    expect(
      response.ok(),
      `Hero resume link points at "${href}", which returned ${response.status()}. ` +
        'Update Hero.tsx to the current asset in public/.',
    ).toBeTruthy();
    expect(response.headers()['content-type']).toContain('pdf');
  });

  test('navbar and hero resume links point at the same asset', async ({ homePage }) => {
    await homePage.goto();

    const navHref = await homePage.navResumeLink.getAttribute('href');
    const heroHref = await homePage.heroResumeLink.getAttribute('href');

    // Divergence here is what allowed the hero link to rot unnoticed while the
    // navbar link was kept current. Sharing one constant would prevent it.
    expect(heroHref, 'hero and navbar resume links have drifted apart').toBe(navHref);
  });
});
