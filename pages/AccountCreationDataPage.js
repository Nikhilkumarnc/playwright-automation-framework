export default class AccountCreateDataPage {

    constructor(page) {

        this.page = page;

        this.title = page.getByRole('radio', { name: 'Mr.' });
        this.passwordField = page.getByLabel('Password *');
        this.dobDay = page.locator('#days');
        this.dobMonth = page.locator('#months');
        this.dobYear = page.locator('#years');
        this.firstNameField = page.getByRole('textbox', { name: 'First name *' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last name *' });
        this.address1 = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.country = page.getByLabel('Country *');
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipcode = page.locator('#zipcode');
        this.mobileNumber = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createBtn = page.getByRole('button', { name: 'Create Account' });
        this.accCrtdContinueLink = page.getByRole('link', { name: 'Continue' });

    }

    async completeAccountRegistration(userDetails) {

        await this.title.click();
        await this.passwordField.fill(userDetails.password);
        await this.firstNameField.fill(userDetails.firstName);
        await this.lastNameField.fill(userDetails.lastName);
        await this.address1.fill(userDetails.streetAddress);
        await this.country.selectOption({ label: userDetails.country });
        await this.state.fill(userDetails.state);
        await this.city.fill(userDetails.city);
        await this.zipcode.fill(userDetails.zipcode);
        await this.mobileNumber.fill(userDetails.mobile)
        await this.createBtn.click();
    };

    async accountCreatedContinue() {
        await this.accCrtdContinueLink.click();
    }

}
