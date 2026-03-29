import { test, expect, request } from '@playwright/test';

test('Intercepting network requests using abort()', async ({ page }) => {

    console.log('test 11: for api request abort started...');

    await page.route('**/*.css', (route) => { route.abort(); })
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    console.log('test 11: for api request abort executed successfully :)');

});