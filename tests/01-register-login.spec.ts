    import { test, expect } from '@playwright/test';
    import testData from '../fixtures/testData.json';
    import { replaceTimestamp } from '../utils/helpers';


    test.describe('Registration and Login Tests', () => {
    
    test('Register new user and Login', async ({ page }) => {


        // Navigate to website
        await page.goto('https://automationteststore.com/');

        // Click Login or Register button
        await page.getByRole('link', { name: 'Login or register' }).click();

        // Click Continue to register
        await page.getByRole('button', { name: 'Continue' }).first().click();

        // Fill registration form - directly from testData
        await page.fill('#AccountFrm_firstname', testData.registration.firstName);
        await page.fill('#AccountFrm_lastname', testData.registration.lastName);
        await page.fill('#AccountFrm_email', replaceTimestamp(testData.registration.email));
        await page.fill('#AccountFrm_telephone', testData.registration.telephone);
        await page.fill('#AccountFrm_fax', testData.registration.fax);
        await page.fill('#AccountFrm_company', testData.registration.company);
        await page.fill('#AccountFrm_address_1', testData.registration.address1);
        await page.fill('#AccountFrm_address_2', testData.registration.address2);
        await page.fill('#AccountFrm_city', testData.registration.city);
        await page.fill('#AccountFrm_postcode', testData.registration.postcode);
        
        // Select country
        await page.selectOption('#AccountFrm_country_id', { label: 'Nepal' });
        await page.waitForTimeout(500);
        
        // Select region
        await page.selectOption('#AccountFrm_zone_id', { label: 'Bagmati' });
        
        await page.fill('#AccountFrm_loginname', replaceTimestamp(testData.registration.loginName));
        await page.fill('#AccountFrm_password', testData.registration.password);
        await page.fill('#AccountFrm_confirm', testData.registration.passwordConfirm);
        
        // Check privacy policy
        await page.check('#AccountFrm_agree');
        

        // Click Continue to submit
        await page.getByRole('button', { name: 'Continue' }).click();
        
        // Wait for account creation success
        await page.waitForSelector('.maintext');
        const successMessage = await page.textContent('.maintext');
        expect(successMessage).toContain('Your Account Has Been Created!');

        // Click on logo to go home
        await page.click('.logo');

        // Logout first
        await page.getByRole('link', { name: 'Logoff' }).click();

        // Now login with credentials from .env
        await page.getByRole('link', { name: 'Login or register' }).click();

        // Fill login credentials from .env - directly
        await page.fill('#loginFrm_loginname', process.env.TEST_EMAIL!);
        await page.fill('#loginFrm_password', process.env.TEST_PASSWORD!);

        // Click Login button
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Click logo to go to homepage
        await page.click('.logo');
        
        // Assert redirected to homepage
        await expect(page).toHaveURL('https://automationteststore.com/');

    });
    });
