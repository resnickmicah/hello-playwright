import { test, expect } from '@playwright/test';

// This is an example of a spec where I commit the output of Playwright's codegen
// with no modifications. I will leave some comments below of what I would do differently
// with links to Playwright's "Best Practices" documentation: 
// https://playwright.dev/docs/best-practices

test('Happy path', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
  await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});



test('Correct username, wrong password', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  // It's interesting to note the 
  await expect(page.getByText('Your password is invalid! ×')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your password is invalid! ×');
});

test('Wrong username, correct password', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('wrongusername');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
});

test('Wrong username, wrong password', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('wrongusername');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText('Your username is invalid! ×')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
});
