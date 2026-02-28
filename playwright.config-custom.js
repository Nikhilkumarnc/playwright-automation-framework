// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    // retries: 1,
    use: {
        baseURL: 'https://automationexercise.com/',
        headless: false,
        screenshot: 'only-on-failure'
        // video: 'retain-on-failure',
    },
});