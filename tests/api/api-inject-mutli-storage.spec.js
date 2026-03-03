import { test, expect } from '@playwright/test';
import { usersData } from '../../testData/usersData';

const userData = { ...usersData.registeredUsersEmailIdAndPswd };

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('nikhilkumar.temp@gmail.com');
    await page.locator('#userPassword').fill('AutoTest@14');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' })

})

test('Login', async () => {

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

})