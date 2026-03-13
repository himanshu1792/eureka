import { test, expect } from '@playwright/test';

test.describe('Application Management', () => {
  test('Create a new application and verify its addition to the list', async ({ page }) => {
    // Navigate to the applications page
    await page.goto('http://localhost:3000/applications');
    await page.waitForLoadState('networkidle');

    // Click the "Create New App" button
    await page.click('button[data-testid="create-new-app"]');

    // Fill in the application form
    await page.fill('input[data-testid="app-name"]', 'Test App');
    await page.fill('textarea[data-testid="app-description"]', 'This is a test application.');

    // Submit the form
    await page.click('button[data-testid="submit-app"]');

    // Verify the application is in the list
    await page.waitForSelector('li[data-testid="app-list-item"]');
    const appName = await page.textContent('li[data-testid="app-list-item"]:last-child');
    expect(appName).toBe('Test App');
  });
});