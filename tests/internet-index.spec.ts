import { test, expect } from '@playwright/test';

const NEEDS_AUTH = [
  "/basic_auth",
  "/digest_auth",
  "/download_secure",
];


test('Check A/B testing link', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  const abTestingLink = page.getByRole('link', { name: 'A/B Testing' });
  const abTestingLinkPath = await abTestingLink.getAttribute('href');
  if (abTestingLinkPath === null) {
    throw new Error(`abTestingLink ${abTestingLink} has no href attribute`);
  }
  const abTestingLinkPathPattern = new RegExp(abTestingLinkPath);
  await abTestingLink.click();
  await expect(page).toHaveURL(abTestingLinkPathPattern);
});

// TODO: Investigate parallelizing across separate test cases
test('Check all links', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  const listItems = await page.getByRole('listitem').all();

  for (const item of listItems) {
    await page.goto('https://the-internet.herokuapp.com/');
    const link = await item.getByRole('link');
    const linkText = await link.textContent();
    console.log(`Examining ${linkText}'s href attribute`);
    const linkPath = await link.getAttribute('href');
    if (linkPath === null) {
      throw new Error(`Link ${link} has no href attribute`);
    }
    if (NEEDS_AUTH.includes(linkPath)) {
      // TODO: See if Playwright has APIs for handling basic auth or sending custom HTTP headers
      console.log(`Skipping ${linkPath} which requires browser native auth`);
      continue
    }
    const linkPathPattern = new RegExp(linkPath);
    console.log(`Clicking link to ${linkPath}`);
    await link.click();
    // Just asserting it doesn't redirect to a 404 page
    // Don't stop the test for only one broken link:
    // https://playwright.dev/docs/best-practices#use-soft-assertions
    await expect.soft(page).toHaveURL(linkPathPattern);
  }
});
