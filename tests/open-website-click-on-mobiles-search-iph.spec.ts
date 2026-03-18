import { test, expect } from '@playwright/test';

test.describe('Amazon Mobiles Search', () => {
  test('should open Amazon, navigate to mobiles, search for iPhone, and select iPhone 16 Plus Black', async ({ page }) => {

    // Step 1: Navigate to Amazon India
    await page.goto('https://www.amazon.in/');
    await expect(page.getByRole('img', { name: 'Amazon' })).toBeVisible();

    // Step 2: Click on Mobiles
    await page.waitForSelector('a[href*="s?k=mobiles"]');
    await page.click('a[href*="s?k=mobiles"]');
    await page.waitForLoadState('networkidle');

    // Step 3: Search for iPhone
    await page.fill('input[aria-label="Search"]', 'iphone');
    await page.click('input[type="submit"][value="Go"]');
    await page.waitForLoadState('networkidle');

    // Step 4: Click on iPhone 16 Plus Black
    await page.waitForSelector('h2 a[href*="iphone-16-plus-black"]');
    const iphone16PlusBlackLink = await page.$('h2 a[href*="iphone-16-plus-black"]');
    await iphone16PlusBlackLink?.click();
    await page.waitForLoadState('networkidle');

    // Verification or final expected state can be added here
  });
});