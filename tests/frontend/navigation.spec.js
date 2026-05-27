import { test, expect } from '@playwright/test';

test.describe('Data Biz E2E Tests', () => {
  test('should load landing page successfully and have correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Data Biz | Modern Data Command/);
    
    // Check navigation items exist
    const offersLink = page.locator('nav').getByRole('link', { name: 'Offers', exact: true });
    await expect(offersLink).toBeVisible();
  });

  test('should navigate to offers page and check content', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'Offers', exact: true }).click();
    await expect(page).toHaveURL(/\/offers.html/);
    await expect(page.locator('h1')).toContainText(/Tailored solutions/i);
  });

  test('should navigate to case studies page and check content', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'Case Study', exact: true }).click();
    await expect(page).toHaveURL(/\/case-study.html/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to insights page and check content', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'Insights', exact: true }).click();
    await expect(page).toHaveURL(/\/insights.html/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to toolings page and check content', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'Toolings', exact: true }).click();
    await expect(page).toHaveURL(/\/toolings.html/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to about page and check content', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(/\/about.html/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should toggle dark/light mode and persist it', async ({ page }) => {
    await page.goto('/');
    
    const htmlElement = page.locator('html');
    const themeButton = page.locator('#theme-toggle');

    // Default: light mode (no dark class)
    await expect(htmlElement).not.toHaveClass(/dark/);

    // Toggle theme to dark
    await themeButton.click();
    await expect(htmlElement).toHaveClass(/dark/);

    // Reload page and check if it persists
    await page.reload();
    await expect(htmlElement).toHaveClass(/dark/);

    // Toggle theme back to light
    await themeButton.click();
    await expect(htmlElement).not.toHaveClass(/dark/);
  });

  test('should load Bella AI Assistant widget and toggle open/close', async ({ page }) => {
    await page.goto('/');
    
    // Check trigger button is present
    const trigger = page.locator('#ai-trigger');
    await expect(trigger).toBeVisible();
    
    // Check chat drawer starts closed (not containing class 'open')
    const chatWindow = page.locator('#ai-chat');
    await expect(chatWindow).not.toHaveClass(/open/);
    
    // Click trigger and verify drawer opens
    await trigger.click();
    await expect(chatWindow).toHaveClass(/open/);
    
    // Check welcome message is loaded
    const welcomeMsg = page.locator('#ai-messages');
    await expect(welcomeMsg).toContainText(/Ciao!/);
  });
});

