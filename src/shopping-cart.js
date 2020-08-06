const { discountTypes } = require("./constants");

class ShoppingCart {
  constructor() {
    this._productsWithQuantities = [];
    this._campaignsDiscount = 0;
    this._couponsDiscount = 0;
    this._productsWithDiscounts = {
      productCategories: [],
      totalPrice: 0,
      totalDiscountedPrice: 0,
    };
  }

  getDetailInfo() {
    return this._productsWithDiscounts;
  }

  addItem(product, quantity) {
    this._productsWithQuantities.push({
      name: product._title,
      price: product._price,
      categoryTitle: product._category._title,
      categoryParent: product._category._parent,
      quantity,
      totalPrice: product.price * quantity,
    });
  }

  getCampaignDiscount(product, campaign) {
    //  campaign has "RATE" discount type and quantity of product is enough for campaign
    if (
      campaign._discountType === discountTypes.rate &&
      product.quantity >= campaign._minItemCount
    ) {
      return (product.price * campaign._percentageOrAmount) / 100;
    }

    //  campaign has "AMOUNT" discount type and quantity of product is enough for campaign
    if (
      campaign._discountType === discountTypes.amount &&
      product.quantity >= campaign._minItemCount
    ) {
      return campaign._percentageOrAmount;
    }

    return 0;
  }

  findMaxDiscountBetweenCampaigns(item, campaigns) {
    let maxDiscount = 0;

    campaigns.forEach((campaign) => {
      const discountOfCurrentCampaign = this.getCampaignDiscount(
        item,
        campaign
      );

      // update max discount variable if current campaign discount is bigger than old one
      if (discountOfCurrentCampaign > maxDiscount) {
        maxDiscount = discountOfCurrentCampaign;
      }
    });

    return maxDiscount;
  }

  applyDiscounts(...campaigns) {
    this._productsWithQuantities.forEach((item) => {
      const campaignsOfItemCategory = campaigns.filter(
        (campaign) => campaign._category._title === item.categoryTitle
      );

      // item does not have campaign
      if (campaignsOfItemCategory.length === 0) {
        this._productsWithDiscounts({
          ...item,
          totalPrice: item.price * item.quantity,
          totalDiscount: 0,
        });
      }

      // find max discount between campaigns which have same category with product
      const maxDiscount = this.findMaxDiscountBetweenCampaigns(
        item,
        campaignsOfItemCategory
      );

      const discountedPrice = (item.price - maxDiscount) * item.quantity;

      this._productsWithDiscounts.productCategories[item.categoryTitle] = this
        ._productsWithDiscounts.productCategories[item.categoryTitle]
        ? [
            ...this._productsWithDiscounts.productCategories[
              item.categoryTitle
            ],
            {
              ...item,
              discountedPrice,
              campaignDiscountPerProduct: maxDiscount,
              totalCampaignDiscount: maxDiscount * item.quantity,
              totalDiscount: maxDiscount * item.quantity,
            },
          ]
        : [
            {
              ...item,
              discountedPrice: (item.price - maxDiscount) * item.quantity,
              campaignDiscountPerProduct: maxDiscount,
              totalCampaignDiscount: maxDiscount * item.quantity,
              totalDiscount: maxDiscount * item.quantity,
            },
          ];

      this._productsWithDiscounts.totalPrice += item.totalPrice;
      this._productsWithDiscounts.totalDiscountedPrice += discountedPrice;
    });
  }

  getCouponDiscount(coupon) {
    if (coupon._discountType === discountTypes.rate) {
      return (
        (this._productsWithDiscounts.totalDiscountedPrice *
          coupon._discountPercentageOrAmount) /
        100
      );
    }
    if (coupon._discountType === discountTypes.amount) {
      return coupon._discountPercentageOrAmount;
    }
    return 0;
  }

  applyCoupon(...coupons) {
    let maxCouponDiscount = 0;
    coupons.forEach((coupon) => {
      if (
        this._productsWithDiscounts.totalDiscountedPrice >=
        coupon._minPurchaseAmount
      ) {
        const currentCouponDiscount = this.getCouponDiscount(coupon);
        if (currentCouponDiscount > maxCouponDiscount) {
          maxCouponDiscount = currentCouponDiscount;
        }
      }
    });

    this._productsWithDiscounts.campaignsDiscount =
      this._productsWithDiscounts.totalPrice -
      this._productsWithDiscounts.totalDiscountedPrice;
    this._productsWithDiscounts.totalDiscountedPrice -= maxCouponDiscount;
    this._productsWithDiscounts.couponDiscount = maxCouponDiscount;
  }
}
module.exports = ShoppingCart;
