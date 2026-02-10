    import { test, expect } from '@playwright/test';
    import testData from '../fixtures/testData.json';


    test.describe('Search and Cart Management Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        
        // Login before each test
        await page.goto('https://automationteststore.com/');
        await page.getByRole('link', { name: 'Login or register' }).click();
        await page.fill('#loginFrm_loginname', process.env.TEST_EMAIL!);
        await page.fill('#loginFrm_password', process.env.TEST_PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();

        // Wait for Login success
        await page.waitForSelector('.maintext');
        expect(page.locator('.maintext')).toContainText(testData.text.maintext_login);

            
    });

    test('Search products, add to cart, and delete from cart', async ({ page }) => {
        
        // Reusable function to search and add product to cart
        async function searchAndAddProduct(productName: string) {
        await page.click('#filter_keyword');
        await page.fill('#filter_keyword', 'perfume');
        await page.press('#filter_keyword', 'Enter');
        
        await expect(page).toHaveURL(/keyword=perfume/);

        
        await page.getByRole('link', { name: productName }).first().click();

        // Wait for page load success
        await page.waitForSelector('.productname');
        expect(page.locator('.productname .bgnone')).toContainText(productName);
        expect(page.locator('.productfilneprice')).toContainText("$");
                
        //cClick on Add To Cart Button
        await page.click('.cart');
        
        await page.waitForTimeout(1000);
        }
        
        // Add both products
        await searchAndAddProduct(testData.products.perfume1);
        await searchAndAddProduct(testData.products.perfume2);

        // Verify cart contains two products
        expect(page.locator('.heading1 .maintext')).toContainText(' Shopping Cart');
        await expect(page.locator('a[href*="remove"]')).toHaveCount(2);        

        
        // Delete SECRET OBSESSION PERFUME from cart 
        await page.locator('a[href*="remove"]').nth(0).click();
        await page.waitForTimeout(1000);

        // Verify cart contains single product
        await expect(page.locator('a[href*="remove"]')).toHaveCount(1);
        
        // Click Checkout button
        await page.click('#cart_checkout1');
        
        // Wait for checkout page to load
        await page.waitForTimeout(2000);
        
        // Assertfor Checkout confirmation page
        expect(page.locator('.maintext')).toContainText(testData.text.maintext_checkout_confirmation);
        
        // Click Confirm Order button
        await page.getByRole('button', { name: 'Confirm Order' }).click();
        
        // Wait for success page
        await page.waitForTimeout(5000);
        
        // Assert on success page
        expect(page.locator('.maintext')).toContainText(testData.text.maintext_checkout);
        
        // Logout
        await page.hover('li[data-id="menu_account"]');
        await page.click('li[data-id="menu_logout"]');
        
        expect(page.locator('.maintext')).toContainText(testData.text.maintext_logout);

        
    });
    });
