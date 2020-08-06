const { expect, it, beforeEach } = require("@jest/globals");
const { discountTypes } = require("./constants");
const Product = require("./product");
const Category = require("./category");
const Campaign = require("./campaign");
const Coupon = require("./coupon");
const ShoppingCart = require("./shopping-cart");

jest.mock("./shopping-cart.js"); // Product is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  ShoppingCart.mockClear();
});

it("should call constructor", () => {
  const category = new Category("food");
  const product = new Product("apple", 10, category);
  const campaign = new Campaign(category, 10, 2, discountTypes.rate);
  const coupon = new Coupon(1, 10, discountTypes.rate);

  const cart = new ShoppingCart();

  cart.addItem(product, 10);
  cart.applyDiscounts(campaign);
  cart.applyCoupon(coupon);

  expect(ShoppingCart).toHaveBeenCalledTimes(1);
  expect(cart).toBeTruthy();
});

it("should not call constructor without trigger", () => {
  expect(ShoppingCart).not.toHaveBeenCalled();
});
