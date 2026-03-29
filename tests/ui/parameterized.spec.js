import { test, expect } from '@playwright/test';

import { usersData } from '../../testData/usersData';

import HomePage from '../../pages/HomePage';


const parameterizedData = [...usersData.parameterizeData];

test('Login test with multiple users sequentially', async ({ page }) => {

    const homePage = new HomePage(page);

    // Launch & navigate once
    await homePage.navigate();
    await homePage.clickOnSignUPOrLoginLink();

    for (const user of parameterizedData) {

        // console.log(`Trying login with: ${user.username}`);
        console.log('test 5: parametrized started...');

        await page.locator('[data-qa="login-email"]').fill(user.username);
        await page.locator('[placeholder="Password"]').fill(user.password);
        await page.getByRole('button', { name: 'Login' }).click();

        const successLocator = page.getByText(/Logged in as/);
        const errorLocator = page.getByText(/incorrect|Invalid/i);

        if (await successLocator.isVisible().catch(() => false)) {

            const fullText = await successLocator.innerText();
            console.log(`${fullText}`);

            // Logout before next iteration
            await homePage.logout();
            // await expect(page).toHaveURL('https://automationexercise.com/login');

            // Go back to login page
            await homePage.clickOnSignUPOrLoginLink();

        } else if (await errorLocator.isVisible().catch(() => false)) {

            const errorText = await errorLocator.innerText();
            console.log(`${errorText}`);

        }
    }

    console.log('test 5: parametrized executed :)');

});