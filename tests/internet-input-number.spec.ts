import { test, expect } from '@playwright/test';

test.describe('Input numerical values directly', () => {
  [
    { label: 'Life, the universe, and everything', val: 42 },
    { label: 'Number of US states', val: 50 },
    { label: 'The square of your imagination', val: -1}
  ].forEach(({ label, val }) => {
    test(label, async ({ page }) => {
      await page.goto('https://the-internet.herokuapp.com/inputs');
      const numInput = await page.getByRole('spinbutton');
      await numInput.click();
      await numInput.fill(val.toString());
      await numInput.press('Enter');
      await expect(numInput).toHaveValue(val.toString());
    });
  });
});

test('Increment numerical value with keyboard', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/inputs');
  const numInput = await page.getByRole('spinbutton');
  await expect(numInput).toBeEmpty();
  await numInput.click();
  await numInput.press('ArrowUp');
  await numInput.press('ArrowUp');
  await numInput.press('ArrowUp');
  await numInput.press('ArrowUp');
  await expect(numInput).toHaveValue('4');
});
