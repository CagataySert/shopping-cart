const { expect, it, beforeEach } = require("@jest/globals");
const Coupon = require("./coupon");
const { discountTypes } = require("./constants");

jest.mock("./coupon.js"); // Coupon is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Coupon.mockClear();
});

it("should call constructor", () => {
  const coupon = new Coupon(10, 10, discountTypes.rate);

  expect(Coupon).toHaveBeenCalledTimes(1);
  expect(coupon).toBeTruthy();
});

it("should not call constructor without trigger", () => {
  expect(Coupon).not.toHaveBeenCalled();
});
