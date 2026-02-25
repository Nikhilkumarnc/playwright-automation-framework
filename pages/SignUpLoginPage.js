export default class SignUpLoginPage {

    constructor(page) {

        this.page = page;
        this.nameField = page.getByPlaceholder('Name');
        this.signUpEmailAddressField = page.locator('[data-qa="signup-email"]');
        this.signUPBtn = page.getByRole('button', { name: 'Signup' });

        this.loginEmailAddressField = page.locator('[data-qa="login-email"]');
        this.passwordField = page.locator('[placeholder="Password"]');
        this.loginBtn = page.getByRole('button', { name: 'Login' });

    }

    async signupWithUserDetails(userDetails) {
        await this.nameField.fill(userDetails.name);
        await this.signUpEmailAddressField.fill(userDetails.emailId);
        await this.signUPBtn.click();

    }

    async loginAccount(registeredUsers) {
        await this.loginEmailAddressField.fill(registeredUsers.emailId1);
        await this.passwordField.fill(registeredUsers.password);
        await this.loginBtn.click();
    }

    async loginWithNewAccount(registeredUsers) {
        await this.loginEmailAddressField.fill(registeredUsers.emailId);
        await this.passwordField.fill(registeredUsers.password);
        await this.loginBtn.click();
    }
}