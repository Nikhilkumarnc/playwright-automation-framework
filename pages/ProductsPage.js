export default class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.productsList = page.locator('.single-products');
        this.continueBtnAfterAddToCart = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartIcon = page.getByRole('link', { name: 'Cart' })
    }

    async addProductToCart() {
        await this.productsLink.click();
        await this.productsList.filter({ hasText: 'Colour Blocked Shirt – Sky Blue' }).locator('.add-to-cart').first().click();
    }

    async continueAfterAddToCart() {
        await this.continueBtnAfterAddToCart.click();
    }

    async goToCart() {
        await this.cartIcon.click();
        await page.waitForURL('**/view_cart');
        await expect(page.locator('#cart_info_table')).toBeVisible({ timeout: 10000 });
    }
}