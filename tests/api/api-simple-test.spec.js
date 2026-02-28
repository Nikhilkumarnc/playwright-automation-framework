import { test, expect, request } from '@playwright/test'

const loginPayload = { userEmail: "nikhilkumar.temp@gmail.com", userPassword: "AutoTest@14" };
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }]
}

let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload });
    expect(loginResponse.ok()).toBeTruthy();
    // expect(loginResponse.status()).toBe(200);
    const loginResponseJson = await loginResponse.json();
    // const loginResponseBody = await loginResponse.body();
    // const loginResponseText = await loginResponse.text();
    console.log('\nloginResponseJson: ', loginResponseJson);
    // console.log('\nloginResponseBody: ', loginResponseBody);
    // console.log('\nloginResponseText: ', loginResponseText);
    token = loginResponseJson.token;

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload, headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
    // expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log('orderResponseJson: ', orderResponseJson);
    orderId = orderResponseJson.orders[0];
})

test('Login Page', async ({ page }) => {

    const rows = page.locator('th[scope="row"]');

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.getByRole('button', { name: 'ORDERS' }).click();

    for (let i = rows.length - 1; i > await rows.length - 1; i--) {
        const rowOrderId = rows.nth(i).textContent();
        if (orderId.includes(rowOrderId)) {
            expect(orderId.includes(rowOrderId)).toBeTruthy();
            break;
        } else {
            console.log('Order id received from API is not exists on the UI');
        }
    }

    await page.pause();
})

