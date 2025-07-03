import { test, expect } from '@playwright/test';

// This is an example of a spec where I commit the output of Playwright's codegen
// with no modifications. I will leave some comments below of what I would do differently
// with links to Playwright's "Best Practices" documentation: 
// https://playwright.dev/docs/best-practices

test('Happy path', async ({ page }) => {
  // The common step of loading the login page can be extracted to a "beforeEach" block:
  // https://playwright.dev/docs/best-practices#make-tests-as-isolated-as-possible
  await page.goto('https://the-internet.herokuapp.com/login');

  // Instead of repeating the element's selector on all the following lines like the codegen does,
  // I would add the following:
  // const usernameInput = await page.getByRole('textbox', { name: 'Username' });
  // Then call that input's methods e.g. 
  // await usernameInput.click();

  await page.getByRole('textbox', { name: 'Username' }).click();

  // Depending on your security posture, you may not want to check in username and password even for just
  // a test server or an ephemeral server that only runs for the duration of the test suite.
  // Obviously if this were a smoke test for a production system, you don't want to check in production secrets
  // into source code. Those should be injected into the suite via environment variables and your CI/CD system's
  // secrets manager.
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();

  // If there were more assertions you wanted to make on the authorized page in separate tests,
  // you could extract the above login flow to a 'beforeEach' block as well.
  await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
  await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});



test('Correct username, wrong password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  // It's interesting to note the selectorp priorities from the codegen here.
  // Per Playwright's Best Practices guide: https://playwright.dev/docs/best-practices#test-user-visible-behavior
  // it will always try to prioritize selectors that are user-visible,
  // e.g. getting an element by text.
  await expect(page.getByText('Your password is invalid! ×')).toBeVisible();
  // In the case of the second line where we assert text content,
  // Playwright's codegen does fall back to an HTML ID attribute selector
  await expect(page.locator('#flash')).toContainText('Your password is invalid! ×');
});

test('Wrong username, correct password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('wrongusername');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
});

test('Wrong username, wrong password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('wrongusername');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
});
