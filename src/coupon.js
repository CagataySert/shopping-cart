class Coupon {
  constructor(minPurchaseAmount, discountPercentageOrAmount, discountType) {
    this._minPurchaseAmount = minPurchaseAmount;
    this._discountPercentageOrAmount = discountPercentageOrAmount;
    this._discountType = discountType;
  }
}

module.exports = Coupon;
