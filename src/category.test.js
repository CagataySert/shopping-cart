const { expect, it, beforeEach } = require("@jest/globals");
const Category = require("./category");

jest.mock("./category.js"); // Category is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Category.mockClear();
});

it("should call constructor", () => {
  const category = new Category("food");

  expect(Category).toHaveBeenCalledTimes(1);
  expect(category).toBeTruthy();
});

it("should not call constructor without trigger", () => {
  expect(Category).not.toHaveBeenCalled();
});
