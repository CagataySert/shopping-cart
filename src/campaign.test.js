const { expect, it, beforeEach } = require("@jest/globals");
const Campaign = require("./campaign");
const Category = require("./category");
const { discountTypes } = require("./constants");

jest.mock("./campaign.js"); // Campaign is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Campaign.mockClear();
});

it("should call constructor", () => {
  const category = new Category("apple");
  const campaign = new Campaign(category, 10, 5, discountTypes.rate);

  expect(Campaign).toHaveBeenCalledTimes(1);
  expect(campaign).toBeTruthy();
});

it("should not call constructor without trigger", () => {
  expect(Campaign).not.toHaveBeenCalled();
});
