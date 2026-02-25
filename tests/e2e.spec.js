import { test, expect } from '@playwright/test';

import { paymentData } from '../testData/paymentData.js';
import { usersData } from '../testData/usersData.js';

import HomePage from '../pages/HomePage.js';
import SignUpLoginPage from '../pages/SignUpLoginPage.js';
import AccountCreateDataPage from '../pages/AccountCreationDataPage.js';
import ProductsPage from '../pages/ProductsPage.js';
import CartPage from '../pages/CartPage.js';
import PaymentPage from '../pages/PaymentPage.js';

const registeredUsers = {
    ...usersData.registrationUserDetails, emailId: `user${Date.now()}@test.com`
};

const debitCardData = { ...paymentData.debitCardData };

const newlyCreatedEmailId = registeredUsers.emailId;

// console.log('newlyCreatedEmailId: ', newlyCreatedEmailId);

test('Complete Order', async ({ page }) => {

    // All POM class objects
    const homePage = new HomePage(page);
    const signUpLoginPage = new SignUpLoginPage(page);
    const accountCreationDataPage = new AccountCreateDataPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const paymentPage = new PaymentPage(page);

    // Create account
    await homePage.navigate();
    await homePage.clickOnSignUPOrLoginLink();
    await signUpLoginPage.signupWithUserDetails(registeredUsers);
    await accountCreationDataPage.completeAccountRegistration(registeredUsers);
    await expect(page.getByRole('heading', { name: 'Account Created!', level: 2 })).toBeVisible();
    await accountCreationDataPage.accountCreatedContinue();
    await expect(page).toHaveURL('/');
    await homePage.logout();  // Logouts newly created account
    await expect(page).toHaveURL('https://automationexercise.com/login');

    // Login with newly created email
    await homePage.navigate();
    await homePage.clickOnSignUPOrLoginLink();
    await signUpLoginPage.loginWithNewAccount(registeredUsers);
    await expect(page.getByText('Logged in as')).toHaveText(`Logged in as ${registeredUsers.name}`);

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

    // Logout after e2e test
    await homePage.logout();
    await expect(page).toHaveURL('https://automationexercise.com/login');

    // await page.pause();
})