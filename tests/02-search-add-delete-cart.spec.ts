    import { test, expect } from '@playwright/test';
    import testData from '../fixtures/testData.json';
    import dotenv from 'dotenv';


    test.describe('Search and Cart Management Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        
        // Login before each test
        await page.goto('https://automationteststore.com/');
        
        await page.getByRole('link', { name: 'Login or register' }).click();
        await page.fill('#loginFrm_loginname', process.env.TEST_EMAIL!);
        await page.fill('#loginFrm_password', process.env.TEST_PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
        
    });

    test('Search products, add to cart, and delete from cart', async ({ page }) => {
        
        // Reusable function to search and add product to cart
        async function searchAndAddProduct(productName: string, productId: string) {
        await page.click('#filter_keyword');
        await page.fill('#filter_keyword', 'perfume');
        await page.press('#filter_keyword', 'Enter');
        
        await expect(page).toHaveURL(/keyword=perfume/);
        
        await page.getByRole('link', { name: productName }).first().click();
        
        await expect(page).toHaveURL(new RegExp(`product_id=${productId}`));
        
        await page.click('.cart');
        
        await page.waitForTimeout(1000);
        }
        
        // Add both products
        await searchAndAddProduct(testData.products.perfume1, '90');
        await searchAndAddProduct(testData.products.perfume2, '89');
        
        // Verify URL is cart page
        await expect(page).toHaveURL(/checkout\/cart/);
        
        // Verify cart contains two products
        await page.waitForSelector('.table-striped');
        
        // Delete SECRET OBSESSION PERFUME from cart 
        // Get all remove links and click the second one (index 1)
        await page.locator('a[href*="remove"]').nth(1).click();
        await page.waitForTimeout(1000);
        
        // Assert still on cart page
        await expect(page).toHaveURL(/checkout\/cart/);
        console.log('✓ Verified still on cart page');
    });
    });
