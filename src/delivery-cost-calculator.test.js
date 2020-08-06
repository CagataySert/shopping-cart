const { expect, it, beforeEach } = require("@jest/globals");
const DeliveryCostCalculator = require("./delivery-cost-calculator");

jest.mock("./delivery-cost-calculator.js"); // DeliveryCostCalculator is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  DeliveryCostCalculator.mockClear();
});

it("should call constructor", () => {
  const deliveryCostCalculator = new DeliveryCostCalculator(10, 10, 2.99);

  expect(DeliveryCostCalculator).toHaveBeenCalledTimes(1);
  expect(deliveryCostCalculator).toBeTruthy();
});

it("should not call constructor without trigger", () => {
  expect(DeliveryCostCalculator).not.toHaveBeenCalled();
});
