import { test, expect } from '@playwright/test';

test.describe('SRP Website Routing and Rendering', () => {
  test('Home page renders correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Stunning Realty Partners/);
    await expect(page.locator('h1')).toContainText('Brokerage');
  });

  test('Navigation to Properties page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav >> text=Properties');
    await expect(page).toHaveURL(/\/listings/);
    await expect(page.locator('h1')).toContainText('Premium Assets');
  });

  test('Navigation to Services page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav >> text=Network Benefits');
    await expect(page).toHaveURL(/\/services/);
    await expect(page.locator('h1')).toContainText('Elevate Your Career');
  });

  test('Navigation to About page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav >> text=About SRP');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1')).toContainText('Stunning Realty Partners');
  });

  test('Navigation to Contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav >> text=Contact');
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText('Elite Brokerage Support');
  });

  test('Individual property page renders', async ({ page }) => {
    // Navigate to listings first to find a property link
    await page.goto('/listings');
    // Click the first property card link
    const firstProperty = page.locator('a[href^="/property/"]').first();
    await firstProperty.click();
    await expect(page).toHaveURL(/\/property\//);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Partner Inquiry Desk')).toBeVisible();
  });
});
