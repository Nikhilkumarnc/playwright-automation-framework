import { test, expect, request } from '@playwright/test';

test('Intercepting network requests using abort()', async ({ page }) => {

    await page.route('**/*.css', (route) => { route.abort(); })
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

});