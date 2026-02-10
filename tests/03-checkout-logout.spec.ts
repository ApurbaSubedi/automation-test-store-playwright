    import { test, expect } from '@playwright/test';
    import testData from '../fixtures/testData.json';
    import dotenv from 'dotenv';


    test.describe('Checkout and Logout Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('https://automationteststore.com/');
        
        await page.getByRole('link', { name: 'Login or register' }).click();
        await page.fill('#loginFrm_loginname', process.env.TEST_EMAIL!);
        await page.fill('#loginFrm_password', process.env.TEST_PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
        
        console.log('✓ Logged in successfully');
        
        // Search and add product to cart
        await page.click('#filter_keyword');
        await page.fill('#filter_keyword', 'perfume');
        await page.press('#filter_keyword', 'Enter');
        
        await page.getByRole('link', { name: testData.products.perfume1 }).first().click();
        await page.click('.cart');
        await page.waitForTimeout(1000);
    });

    test('Checkout cart items and logout', async ({ page }) => {
        
        // Verify cart contains the product
        await page.waitForSelector('.table-striped');
        
        // Click Checkout button
        await page.click('#cart_checkout1');
        
        // Wait for checkout page to load
        await page.waitForTimeout(2000);
        
        // Click Confirm Order button
        await page.getByRole('button', { name: 'Confirm Order' }).click();
        
        // Wait for success page
        await page.waitForTimeout(2000);
        
        // Assert on success page
        await expect(page).toHaveURL(/checkout\/success/);
        
        // Verify success message
        const successHeading = await page.locator('.maintext').textContent();
        expect(successHeading).toContain('Your Order Has Been Processed!');
        
        // Logout
        await page.getByRole('link', { name: 'Logoff' }).click();
        
        // Verify logout - check login link appears
        await page.waitForSelector('//a[contains(text(), "Login or register")]');
    });
    });
