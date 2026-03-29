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

test('Security test', async ({ page }) => {

    console.log('test 9: api - for modify continue started...');

    await page.addInitScript((tokenValue) => {
        window.localStorage.setItem('token', tokenValue);

    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.getByRole('button', { name: 'ORDERS' }).click();

    const viewBtn = page.getByRole('button', { name: 'View' });

    // intercept network request(continue)
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async (route) => {
            await route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/1234567890',
            });
        }
    );

    await viewBtn.first().click();
    await expect(page.getByText('You are not authorize to view this order')).toBeVisible();
    console.log('test 9: api - for modify continue executed successfully...');
});