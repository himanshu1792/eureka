import { test, expect } from '@playwright/test';

test.describe('Test App - Application Creation', () => {
  test('should create a new application successfully', async ({ page }) => {
    
    // Navigate to example.com
    await page.goto('https://example.com');
    await expect(page).toHaveURL('https://example.com');
    await expect(page).toHaveTitle('Example Domain');

    // Navigate to applications page
    await page.goto('http://localhost:3000/applications');
    await expect(page).toHaveURL('http://localhost:3000/applications');
    await expect(page).toHaveTitle('TestForge');

    // Click on "Add Application" button
    await page.getByRole('button', { name: 'Add Application' }).click();

    // Fill out the application creation form
    await page.getByRole('textbox', { name: 'Application Name' }).fill('Sample App');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://sample.example.com');
    await page.getByRole('textbox', { name: 'Test Username' }).fill('testuser@example.com');
    await page.getByRole('textbox', { name: 'Test Password' }).fill('password123');

    // Click on "Create" button
    await page.getByRole('button', { name: 'Create' }).click();

    // Verify the new application is listed
    await page.waitForSelector('text=Sample App');
    const newApp = await page.locator('text=Sample App');
    await expect(newApp).toBeVisible();
  });
});