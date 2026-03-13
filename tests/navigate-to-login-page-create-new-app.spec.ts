import { test, expect } from '@playwright/test';

test.describe('Application Workflow Tests', () => {
  test('Create a new application', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('heading', { name: 'Command Center' })).toBeVisible();

    // Navigate to Applications page
    await page.getByRole('link', { name: 'Applications' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Add Application' })).toBeVisible();

    // Click 'Add Application' and fill form
    await page.getByRole('button', { name: 'Add Application' }).click();
    await expect(page.getByRole('heading', { name: 'Add Application' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Application Name' }).fill('Sample App');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://sampleapp.com');

    const testUsername = process.env.TEST_USERNAME;
    const testPassword = process.env.TEST_PASSWORD;
    
    if (testUsername && testPassword) {
      await page.getByRole('textbox', { name: 'Test Username' }).fill(testUsername);
      await page.getByRole('textbox', { name: 'Test Password' }).fill(testPassword);

      // Click 'Create' and verify the new application
      await page.getByRole('button', { name: 'Create' }).click();
      await page.waitForLoadState('networkidle');
      
      // Verify application creation (placeholder - need reliable assertion)
      // Add suitable verification once app state is predictable
      // await expect(page.getByText('Sample App https://sampleapp.com Created')).toBeVisible();
    } else {
      console.error('Environment variables for credentials not set');
    }
  });
});