import { test, expect } from '@playwright/test';

import { usersData } from '../../testData/usersData.js';
import { paymentData } from '../../testData/paymentData.js';

import HomePage from '../../pages/HomePage.js';
import SignUpLoginPage from '../../pages/SignUpLoginPage.js';
import AccountCreateDataPage from '../../pages/AccountCreationDataPage.js';

const userData = { ...usersData.registrationUserDetails, emailId: `user${Date.now()}@test.com` };

test.describe('Account Creation', () => {

    test('@smoke User account should be created', async ({ page }) => {

        // await page.pause();
        const homePage = new HomePage(page);
        const signUpLoginPage = new SignUpLoginPage(page);
        const accountCreationDataPage = new AccountCreateDataPage(page);

        await homePage.navigate();
        await homePage.clickOnSignUPOrLoginLink();

        await signUpLoginPage.signupWithUserDetails(userData);

        await accountCreationDataPage.completeAccountRegistration(userData);
        await expect(page.getByRole('heading', { name: 'Account Created!', level: 2 })).toBeVisible();
        await accountCreationDataPage.accountCreatedContinue();
        await expect(page).toHaveURL('/');

        await homePage.logout();
        await expect(page).toHaveURL('https://automationexercise.com/login');

    })
})