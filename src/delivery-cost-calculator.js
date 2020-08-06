class DeliveryCostCalculator {
  constructor(costPerDelivery, costPerProduct, fixedCost) {
    this._costPerDelivery = costPerDelivery;
    this._costPerProduct = costPerProduct;
    this._fixedCost = fixedCost;
  }

  calculateFor(cart) {
    // calculated by the number of distinct categories in the cart
    const numberOfDeliveries = Object.keys(cart.detailInfo.productCategories)
      .length;

    // number of different products in the cart.
    const numberOfProducts = cart._productsWithQuantities.length;

    return (
      this._costPerDelivery * numberOfDeliveries +
      this._costPerProduct * numberOfProducts +
      this._fixedCost
    );
  }
}

module.exports = DeliveryCostCalculator;
