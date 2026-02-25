export default class CartPage {
    constructor(page) {
        this.page = page;
        this.productsInCart = page.locator('.cart_description');
        this.checkoutBtn = page.getByText('Proceed To Checkout');
        this.addressDetails = page.getByText('Address Details');
        this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
    }

    async checkout() {
        await this.checkoutBtn.click();
    }

    async clickOnPlaceOrderBtn() {
        await this.placeOrderBtn.click();
    }
}