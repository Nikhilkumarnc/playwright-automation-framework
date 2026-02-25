import { test, expect } from '@playwright/test';

import { usersData } from '../testData/usersData.js';
import { paymentData } from '../testData/paymentData.js';

import HomePage from '../pages/HomePage.js';
import SignUpLoginPage from '../pages/SignUpLoginPage.js';
import ProductsPage from '../pages/ProductsPage.js';
import CartPage from '../pages/CartPage.js';
import PaymentPage from '../pages/PaymentPage.js';
import AccountCreateDataPage from '../pages/AccountCreationDataPage.js';


const userData = { ...usersData.registrationUserDetails, emailId: `user${Date.now()}@test.com` };

const registeredUsers = {
    ...usersData.registeredUsersEmailIdAndPswd
}

const debitCardData = { ...paymentData.debitCardData }

test.describe.parallel('parallel', () => {

    test('User account should be created', async ({ page }) => {

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

    })

    test('Complete Order', async ({ page }) => {

        // All POM class objects
        const homePage = new HomePage(page);
        const signUpLogin = new SignUpLoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const paymentPage = new PaymentPage(page);

        // Login 
        await homePage.navigate();
        await homePage.clickOnSignUPOrLoginLink();
        await signUpLogin.loginAccount(registeredUsers);
        await expect(page.getByText('Logged in as')).toHaveText(`Logged in as ${registeredUsers.user1}`);

        // Add product
        await productsPage.addProductToCart();
        await expect(page.getByText('Your product has been added to cart.')).toBeVisible();
        await productsPage.continueAfterAddToCart();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await productsPage.goToCart();
        await expect(page.locator('#cart_info_table')).toBeVisible();

        // Cart checkout
        await cartPage.checkout();
        await expect(page.getByText('Address Details')).toBeVisible();
        await cartPage.clickOnPlaceOrderBtn();
        await expect(page.locator('input[name="name_on_card"]')).toBeVisible();

        // Payment
        await paymentPage.completePayment(debitCardData);
        await expect(page.getByRole('heading', { name: 'Order Placed!', level: 2 })).toBeVisible();

    })

})