const { discountTypes } = require("./constants");
const Category = require("./category");
const Product = require("./product");
const Campaign = require("./campaign");
const Coupon = require("./coupon");
const Cart = require("./shopping-cart");
const DeliveryCostCalculator = require("./delivery-cost-calculator");

const main = () => {
  // #region category start
  const foodCategory = new Category("food");
  const electronicCategory = new Category("electronic");
  // #endregion category finish

  // #region product start
  const orange = new Product("Orange", 20, foodCategory);
  const apple = new Product("Apple", 60, foodCategory);

  const keyboard = new Product("Keyboard", 350, electronicCategory);
  const mouse = new Product("Mouse", 250, electronicCategory);
  // #endregion product finish

  // #region campaigns start
  const firstCampaign = new Campaign(foodCategory, 30, 30, discountTypes.rate);
  const secondCampaign = new Campaign(
    electronicCategory,
    10,
    5,
    discountTypes.rate
  );
  const thirdCampaign = new Campaign(foodCategory, 5, 10, discountTypes.amount);
  // #endregion campaigns finish

  //#region coupon start
  const firstCoupon = new Coupon(100, 10, discountTypes.rate);
  const secondCoupon = new Coupon(75, 25, discountTypes.amount);
  //#endregion coupon finish

  const cart = new Cart();

  cart.addItem(orange, 30);
  cart.addItem(apple, 20);
  cart.addItem(keyboard, 5);
  cart.addItem(mouse, 4);

  cart.applyDiscounts(firstCampaign, secondCampaign, thirdCampaign);
  cart.applyCoupon(firstCoupon, secondCoupon);

  const deliveryCostCalculator = new DeliveryCostCalculator(10, 3, 2.99);
  const deliveryCost = deliveryCostCalculator.calculateFor(cart);

  console.log("Detail Info of the Cart:", cart.getDetailInfo());
  console.log("Total Amount:", cart.getDetailInfo().totalDiscountedPrice);
  console.log("Delivery Cost:", deliveryCost);
};

main();
