import { test, expect } from '@playwright/test';

test.describe('Application Management', () => {
  test('Create New Applications', async ({ page }) => {
    
    // Navigate to the application
    await page.goto('http://localhost:3000/testing');
    await expect(page).toHaveURL('http://localhost:3000/testing');
    await expect(page).toHaveTitle('AgentForge');
    
    // Verify "Applications" heading is visible
    await expect(page.getByRole('heading', { name: 'Applications' })).toBeVisible();

    // Click "Create New Application"
    await page.getByRole('link', { name: 'Add Application' }).click();

    // Add First Application
    await page.getByRole('button', { name: 'Add Application' }).click();
    await page.getByRole('textbox', { name: 'Test Username' }).fill(process.env.TEST_USERNAME || '');
    await page.getByRole('textbox', { name: 'Test Password' }).fill(process.env.TEST_PASSWORD || '');
    await page.getByRole('textbox', { name: 'Application Name' }).fill('Sample Application');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://example.com');
    await page.getByRole('button', { name: 'Create' }).click();
    
    // Verify the first application is created
    await expect(page.getByRole('link', { name: 'Sample Application https://example.com Created Mar 22, 2026' })).toBeVisible();

    // Attempt to add a second application with missing field
    await page.getByRole('button', { name: 'Add Application' }).click();
    await page.getByRole('textbox', { name: 'Test Password' }).fill(process.env.TEST_PASSWORD || '');
    await page.getByRole('textbox', { name: 'Application Name' }).fill('Sample Application 2');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://example2.com');
    await page.getByRole('button', { name: 'Create' }).click();

    // Verify error message for missing username
    await expect(page.locator('text=The username field is required.')).toBeVisible();
  });
});