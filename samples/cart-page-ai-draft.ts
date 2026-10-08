
class CartPage {
  page: Page;

  // Cart items — listed individually by index
  item0Name        = '[data-testid="item-name-0"]';
  item0Price       = '[data-testid="item-unit-price-0"]';
  item0QtyInput    = '[data-testid="item-quantity-input-0"]';
  item0QtyIncrease = '[data-testid="item-quantity-increase-0"]';
  item0QtyDecrease = '[data-testid="item-quantity-decrease-0"]';
  item0Remove      = '[data-testid="item-remove-0"]';
  item0SaveLater   = '[data-testid="item-save-later-0"]';
  item0LineTotal   = '[data-testid="item-line-total-0"]';
  item1Name        = '[data-testid="item-name-1"]';
  item1Price       = '[data-testid="item-unit-price-1"]';
  item1QtyInput    = '[data-testid="item-quantity-input-1"]';
  item1QtyIncrease = '[data-testid="item-quantity-increase-1"]';
  item1QtyDecrease = '[data-testid="item-quantity-decrease-1"]';
  item1Remove      = '[data-testid="item-remove-1"]';
  item1SaveLater   = '[data-testid="item-save-later-1"]';
  item1LineTotal   = '[data-testid="item-line-total-1"]';

  // Order summary
  subtotal = '[data-testid="subtotal-value"]';
  shipping = '[data-testid="shipping-value"]';
  total    = '[data-testid="order-total"]';
  discount = '[data-testid="discount-value"]';

  // Promo
  promoInput = '[data-testid="promo-code-input"]';
  promoApply = '[data-testid="promo-apply-button"]';
  promoMsg   = '.promo-status-message';
  promoErr   = '#promo-alert-text';

  // CTA
  checkoutBtn = '[data-testid="checkout-button"]';

  async setItemQuantityAndVerifyTotal(itemIndex: number, qty: number) {
    const inputSelector = `[data-testid="item-quantity-input-${itemIndex}"]`;
    await this.page.fill(inputSelector, String(qty));
    await this.page.click(`[data-testid="item-quantity-increase-${itemIndex}"]`);
    await expect(
      this.page.locator(this.total)
    ).not.toContainText('£272.97');
  }

  async applyPromoAndCheckDiscount(code: string) {
    await this.page.fill(this.promoInput, code);
    await this.page.click(this.promoApply);
    await expect(
      this.page.locator(this.promoMsg)
    ).toBeVisible();
    await expect(
      this.page.locator(this.discount)
    ).not.toContainText('—');
  }

  async removeItemAndProceedToCheckout(itemIndex: number) {
    await this.page.click(`[data-testid="item-remove-${itemIndex}"]`);
    await this.page.click(this.checkoutBtn);
    return new CheckoutPage(this.page);
  }

  async goToCheckout() {
    await this.page.click(this.checkoutBtn);
    await this.page.waitForURL('**/checkout');
    return new CheckoutPage(this.page);
  }
}