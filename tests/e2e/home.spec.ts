import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.getByRole('heading', { name: /cortex app/i });
    await expect(heading).toBeVisible();
  });

  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    
    const dashboardLink = page.getByRole('link', { name: /accéder au dashboard/i });
    await expect(dashboardLink).toBeVisible();
    
    await dashboardLink.click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/');
    
    const performanceCard = page.getByText(/performance/i);
    const modernCard = page.getByText(/moderne/i);
    const fastCard = page.getByText(/rapide/i);
    
    await expect(performanceCard).toBeVisible();
    await expect(modernCard).toBeVisible();
    await expect(fastCard).toBeVisible();
  });
});
