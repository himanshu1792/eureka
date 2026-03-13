import { test, expect } from '@playwright/test';

test.describe('Application Management', () => {
  test('should create a new application successfully', async ({ page }) => {
    // Navigate to the applications page
    await page.goto('http://localhost:3000/applications');
    await page.waitForLoadState('domcontentloaded');

    // Click on "Add Application" button
    await page.getByRole('button', { name: 'Add Application' }).click();

    // Fill in the application form
    await page.getByRole('textbox', { name: 'Application Name' }).fill('RandomApp');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://randomapp.com');
    
    // Use environment variables for sensitive information
    await page.getByRole('textbox', { name: 'Test Username' }).fill(process.env.TEST_USERNAME || '');
    await page.getByRole('textbox', { name: 'Test Password' }).fill(process.env.TEST_PASSWORD || '');

    // Click on "Create" button
    await page.getByRole('button', { name: 'Create' }).click();

    // Verify the application is added to the list
    await page.waitForSelector('text=RandomApp');
    const appExists = await page.locator('text=RandomApp').isVisible();
    expect(appExists).toBe(true);
  });
});