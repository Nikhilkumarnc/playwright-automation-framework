export default class HomePage {

    constructor(page) {

        this.page = page;
        this.homePageLink = page.getByRole('link', { name: 'Home' });
        this.signUpSignInlink = page.getByRole('link', { name: 'Signup / Login' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.loggedInAsLink = page.getByText('Logged in as')
    }

    async navigate() {
        await this.page.goto('/',  { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnSignUPOrLoginLink() {
        await this.signUpSignInlink.waitFor({ state: 'visible' });
        await this.signUpSignInlink.click();
    }

    async logout() {
        await this.logoutLink.click();
    }

};