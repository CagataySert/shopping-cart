const { expect, it, beforeEach } = require("@jest/globals");
const Product = require("./product");
const Category = require("./category");
const { discountTypes } = require("./constants");

jest.mock("./product.js"); // Product is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Product.mockClear();
});

it("should call constructor", () => {
  const category = new Category("food");
  const product = new Product("apple", 10, category);

  expect(Product).toHaveBeenCalledTimes(1);
  expect(product).toBeTruthy();
});

it("should not call constructor without trigger", () => {
  expect(Product).not.toHaveBeenCalled();
});
