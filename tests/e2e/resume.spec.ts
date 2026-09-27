import { test, expect } from './fixtures';

// Resume download flow (docs/CRITICAL_FLOWS.md Flow 4).
//
// Every consumer of RESUME_PATH is certified: the navbar link, the hero link,
// and the embedded viewer on /about. Each follows the real rendered href, so
// the specs are rename-proof and catch any consumer drifting from the others.

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

  test('about page embeds the same resume the navbar links to', async ({ homePage, aboutPage, request }) => {
    await homePage.goto();
    const navHref = await homePage.navResumeLink.getAttribute('href');
    expect(navHref).toBeTruthy();

    await aboutPage.goto();
    await expect(aboutPage.resumeViewer).toBeVisible();
    const data = await aboutPage.resumeViewer.getAttribute('data');
    expect(data?.split('#')[0], 'about viewer embeds a different asset than the navbar').toBe(navHref);

    const openHref = await aboutPage.resumeOpenLink.getAttribute('href');
    expect(openHref).toBe(navHref);
    const response = await request.get(openHref!);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('pdf');
  });
});
