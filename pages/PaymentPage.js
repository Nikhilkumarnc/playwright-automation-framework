export default class PaymentPage {

    constructor(page) {
        this.page = page;
        this.cardNameField = page.locator('input[name="name_on_card"]');
        this.cardNumberField = page.locator('input[name="card_number"]');
        this.CVVField = page.getByRole('textbox', { name: 'ex.' });
        this.monthField = page.getByRole('textbox', { name: 'MM' });
        this.yearField = page.getByRole('textbox', { name: 'YYYY' });
        this.paymentBtn = page.getByRole('button', { name: 'Pay and Confirm Order' })
        this.orderPlacedMsg = page.getByText('Order Placed!');
        // const downloadPromise = page.waitForEvent('download');
        this.downloadInvoiceBtn = page.getByRole('link', { name: 'Download Invoice' });
        // const download = await downloadPromise;
        this.continueBtnAftePayment = page.getByRole('link', { name: 'Continue' });
    }

    async completePayment(debitCardData) {
        await this.cardNameField.fill(debitCardData.nameOnCard);
        await this.cardNumberField.fill(debitCardData.cardNumber);
        await this.CVVField.fill(debitCardData.cvv);
        await this.monthField.fill(debitCardData.month);
        await this.yearField.fill(debitCardData.year);
        await this.paymentBtn.click();
    }
}