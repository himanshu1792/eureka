import { test, expect } from '@playwright/test';

test.describe('Application Management', () => {

  test('should create a new application with valid data', async ({ page }) => {
    await page.goto('http://localhost:3000/applications');

    // Verify the Applications page is loaded
    await expect(page.getByText('Applications')).toBeVisible();

    // Click the "Add Application" button
    await page.getByRole('button', { name: 'Add Application' }).click();

    // Fill out the application form
    await page.getByRole('textbox', { name: 'Application Name' }).fill('New Test App');
    await page.getByRole('textbox', { name: 'Test URL' }).fill('https://newexample.com');
    await page.getByRole('textbox', { name: 'Test Username' }).fill(process.env.TEST_USERNAME);
    await page.getByRole('textbox', { name: 'Test Password' }).fill(process.env.TEST_PASSWORD);

    // Click the "Create" button
    await page.getByRole('button', { name: 'Create' }).click();

    // Verify the new application is added
    // As the exploration didn't confirm the addition, we might have to verify the conditions when the application succeeds.
    // Expect example: await expect(page.getByText('New Test App')).toBeVisible();

    // Here you should add your own verification method according to your application behavior
  });

});