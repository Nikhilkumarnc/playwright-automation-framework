import { test, expect, request } from '@playwright/test'
import APIUtils from '../../utils/APIUtils'

const loginPayload = { userEmail: "nikhilkumar.temp@gmail.com", userPassword: "AutoTest@14" };
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }]
}

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    // console.log('response: ', response)

});

test('API test  ', async ({ page }) => {

    const rows = page.locator('th[scope="row"]');

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.getByRole('button', { name: 'ORDERS' }).click();

    for (let i = rows.length - 1; i > await rows.length - 1; i--) {
        const rowOrderId = rows.nth(i).textContent();
        if (response.orderId.includes(rowOrderId)) {
            expect(response.orderId.includes(rowOrderId)).toBeTruthy();
            break;
        } else {
            console.log('Order id received from API is not exists on the UI');
        }
    }

    // await page.pause();
})

