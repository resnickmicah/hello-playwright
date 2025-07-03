import { test, expect } from '@playwright/test';

test('Toggle unchecked checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  await expect(page.getByRole('checkbox').first()).not.toBeChecked();
  await page.getByRole('checkbox').first().check();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
});

test('Toggle checked checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  await expect(page.getByRole('checkbox').nth(1)).toBeChecked();
  await page.getByRole('checkbox').nth(1).uncheck();
  await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();
});
