import { test, expect } from '@playwright/test';

test('Dropdown happy path', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/dropdown');
  await page.locator('#dropdown').selectOption('2');
  await expect(page.locator('#dropdown')).toHaveValue('2');
});

test('Dropdown default value', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/dropdown');
  await expect(page.locator('#dropdown')).toHaveValue('');
});
