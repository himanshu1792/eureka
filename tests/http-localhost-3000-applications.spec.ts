```typescript
import { test, expect } from '@playwright/test';

test.describe('Applications Page', () => {

  const url = 'http://localhost:3000/applications';

  test('Scenario 1: Open Applications Page', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle('TestForge');

    const navigationLinks = [
      { name: 'TestForge', selector: 'text="TestForge"' },
      { name: 'Dashboard', selector: 'text="Dashboard"' },
      { name: 'Applications', selector: 'text="Applications"' },
      { name: 'Smoke Testing', selector: 'text="Smoke Testing"' },
      { name: 'Regression Testing', selector: 'text="Regression Testing"' },
      { name: 'Run History', selector: 'text="Run History"' },
    ];

    for (const link of navigationLinks) {
      await expect(page.getByRole('link', { name: link.name })).toBeVisible();
    }
  });

  test('Scenario 2: Open "Add Application" Modal', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Add Application' }).click();
    await expect(page.getByRole('heading', { name: 'Add Application' })).toBeVisible();

    const formFields = [
      { placeholder: 'My Web Application' },
      { placeholder: 'https://staging.example.com' },
      { placeholder: 'admin@example.com' },
      { placeholder: 'Enter test password' },
    ];

    for (const field of formFields) {
      await expect(page.getByPlaceholderText(field.placeholder)).toBeVisible();
    }

    const buttons = [
      { name: 'Cancel' },
      { name: 'Create' },
    ];

    for (const button of buttons) {
      await expect(page.getByRole('button', { name: button.name })).toBeVisible();
    }
  });

  test('Scenario 3: Create New Application with Valid Data', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Add Application' }).click();

    await page.getByPlaceholderText('My Web Application').fill('Sample App');
    await page.getByPlaceholderText('https://staging.example.com').fill('https://example.com');
    await page.getByPlaceholderText('admin@example.com').fill(process.env.TEST_USERNAME || '');
    await page.getByPlaceholderText('Enter test password').fill(process.env.TEST_PASSWORD || '');
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.locator('text="Sample App"')).toBeVisible();
  });

  test('Scenario 4: Toggle Password Visibility', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Add Application' }).click();

    await page.getByPlaceholderText('Enter test password').fill('securepassword');
    const showPasswordButton = page.getByRole('button', { name: 'Show password' });
    await showPasswordButton.click();

    // Assuming there's a way to verify the password field visibility
    // Specific logic here would depend on application behavior/implementation
  });

  test('Scenario 5: Form Validation for Empty Submission', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Add Application' }).click();
    await page.getByRole('button', { name: 'Create' }).click();

    // Assuming the application displays an error when fields are empty
    await expect(page.locator('text="Please fill out this field."')).toBeVisible();
  });

  test('Scenario 6: Form Validation for Invalid URL', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Add Application' }).click();

    await page.getByPlaceholderText('My Web Application').fill('Sample App');
    await page.getByPlaceholderText('https://staging.example.com').fill('invalid_url');
    await page.getByPlaceholderText('admin@example.com').fill(process.env.TEST_USERNAME || '');
    await page.getByPlaceholderText('Enter test password').fill(process.env.TEST_PASSWORD || '');
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.locator('text="Invalid URL format"')).toBeVisible();
  });
  
});
```