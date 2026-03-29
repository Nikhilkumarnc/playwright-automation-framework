import { test, expect, request } from '@playwright/test';
import APIUtils from '../../utils/APIUtils';

const loginPayload = {
    userEmail: "nikhilkumar.temp@gmail.com",
    userPassword: "AutoTest@14"
};

const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }]
};

const fakeOrdersPayload = {
    data: [],
    message: "No Orders"
};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Intercepting network requests using fulfill', async ({ page }) => {

    console.log('test 10: for api mocking fulfilld started...');

    await page.addInitScript((tokenValue) => {
        window.localStorage.setItem('token', tokenValue);

    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // intercept network request(fulfill)
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async (route) => {
            const originalResponse = await page.request.fetch(route.request());
            const mockedBody = JSON.stringify(fakeOrdersPayload);

            await route.fulfill({
                response: originalResponse,
                body: mockedBody
            });
        }
    );

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await expect(page.getByText('You have No Orders to show at')).toBeVisible();

    console.log('test 10: for api mocking fulfilld started...');

});