import { describe, it } from "node:test";
import assert from "node:assert";
import sum from "./index.js";

describe("sum() function", () => {
  describe("when given valid arguments", () => {
    it("should calculate the sum correctly", () => {
      // Arrange
      const operandA = 1;
      const operandB = 1;

      // Action
      const actualValue = sum(operandA, operandB);

      // Assert
      const expectedValue = 2;
      assert.equal(actualValue, expectedValue);
    });
  });

  describe("when given invalid arguments (edge cases)", () => {
    describe("when an argument is not a number", () => {
      it("should return 0 if the first parameter ('a') is not a number", () => {
        // Arrange
        const operandA = "1";
        const operandB = 1;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 0;
        assert.equal(actualValue, expectedValue);
      });

      it("should return 0 if the second parameter ('b') is not a number", () => {
        // Arrange
        const operandA = 1;
        const operandB = "1";

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 0;
        assert.equal(actualValue, expectedValue);
      });
    });

    describe("when an argument is negative", () => {
      it("should return 0 if first parameter ('a') is less than 0", () => {
        // Arrange
        const operandA = -1;
        const operandB = 1;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 0;
        assert.equal(actualValue, expectedValue);
      });

      it("should return 0 if second parameter ('b') is less than 0", () => {
        // Arrange
        const operandA = 1;
        const operandB = -1;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 0;
        assert.equal(actualValue, expectedValue);
      });
    });
  });
});
