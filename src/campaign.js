class Campaign {
  constructor(category, percentageOrAmount, minItemCount, discountType) {
    this._category = category;
    this._percentageOrAmount = percentageOrAmount;
    this._minItemCount = minItemCount;
    this._discountType = discountType;
  }
}

module.exports = Campaign;
