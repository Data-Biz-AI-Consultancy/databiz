import { test, expect } from '@playwright/test';

test.describe('Data Biz E2E Tests', () => {
  test('should load landing page successfully, check title, logo and favicon', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Data Biz | AI & Data Consultancy/);
    
    // Check navigation items exist
    const offersLink = page.locator('nav').getByRole('link', { name: 'Offers', exact: true });
    await expect(offersLink).toBeVisible();

    // Verify brand logo exists in top navigation
    const navLogo = page.locator('nav').locator('img[alt="Data Biz Logo"]');
    await expect(navLogo).toBeVisible();
    await expect(navLogo).toHaveAttribute('src', 'assets/DataBiz_logo.png');

    // Verify brand logo exists in footer
    const footerLogo = page.locator('footer').locator('img[alt="Data Biz Logo"]');
    await expect(footerLogo).toBeVisible();
    await expect(footerLogo).toHaveAttribute('src', 'assets/DataBiz_logo.png');

    // Verify favicon link exists in head
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', 'assets/DataBiz_logo.png');
  });

  test('should verify Open Graph and Twitter metadata tags in head', async ({ page }) => {
    await page.goto('/');
    
    // Open Graph
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', 'https://databizaitech.com/assets/DataBiz_banner_logo.png');
    
    // Twitter
    const twitterImage = page.locator('meta[property="twitter:image"]');
    await expect(twitterImage).toHaveAttribute('content', 'https://databizaitech.com/assets/DataBiz_banner_logo.png');
  });

  test('should verify LinkedIn URLs on footer', async ({ page }) => {
    // Landing page footer LinkedIn link should point to company page
    await page.goto('/');
    const indexLinkedInLink = page.locator('footer').locator('a[aria-label="LinkedIn"]');
    await expect(indexLinkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/databiz-ai-tech');

    // About page footer LinkedIn link should point to personal profile
    await page.goto('/about.html');
    const aboutLinkedInLink = page.locator('footer').locator('a[aria-label="LinkedIn"]');
    await expect(aboutLinkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jimmy-pang-hk603');
  });

  test('should verify hero CTA links correctly to insights page', async ({ page }) => {
    await page.goto('/');
    const viewMethodologyBtn = page.getByRole('link', { name: 'EXPLORE AI INSIGHTS' });
    await expect(viewMethodologyBtn).toHaveAttribute('href', 'insights.html');
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

