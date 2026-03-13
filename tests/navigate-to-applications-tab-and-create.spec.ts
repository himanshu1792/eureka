import { test, expect } from '@playwright/test';

test.describe('Application Management', () => {

  test('should navigate to applications tab and create a new app', async ({ page }) => {

    await page.goto('http://localhost:3000');
    await expect(page.getByText('AI-powered test generation. Describe what to test, get working Playwright scripts.')).toBeVisible();

    await page.getByRole('link', { name: 'Applications' }).click();
    await page.waitForURL('http://localhost:3000/applications');
    await expect(page.getByRole('heading', { name: 'Applications' })).toBeVisible();

    await page.getByRole('button', { name: 'Add Application' }).click();
    await expect(page.getByRole('heading', { name: 'Add Application' })).toBeVisible();

    // Fill the application creation form
    await page.getByRole('textbox', { name: 'Application Name' }).fill('New Test App');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://example.com');
    await page.getByRole('textbox', { name: 'Test Username' }).fill(process.env.TEST_USERNAME || '');
    await page.getByRole('textbox', { name: 'Test Password' }).fill(process.env.TEST_PASSWORD || '');

    // Verify the form fields are correctly filled
    await expect(page.getByRole('textbox', { name: 'Application Name' })).toHaveValue('New Test App');
    await expect(page.getByRole('textbox', { name: 'Test URL' })).toHaveValue('https://example.com');
    await expect(page.getByRole('textbox', { name: 'Test Username' })).toHaveValue(process.env.TEST_USERNAME || '');
    await expect(page.getByRole('textbox', { name: 'Test Password' })).toHaveValue(process.env.TEST_PASSWORD || '');

    await page.getByRole('button', { name: 'Create' }).click();

    // Verify the new application appears in the list
    await expect(page).toHaveURL('http://localhost:3000/applications');
    // Add appropriate assertions to ensure the application "New Test App" appears in the applications list
    
  });
});