import evaluate from ".";
import { getError, getResult } from "./utils/Result";

test("An operand evaluates as itself", () => {
  expect(getResult(evaluate([1]))).toEqual(1);
});

test("[Triangulation] An operand evaluates as itself", () => {
  expect(getResult(evaluate([2]))).toEqual(2);
});

test("An operator is not a valid input", () => {
  expect(getError(evaluate(["+"]))).toEqual("Input is not valid.");
});

test("It should evaluate simple expressions", () => {
  expect(getResult(evaluate([1, 1, "+"]))).toEqual(2);
});

test("It should evaluate complex expressions", () => {
  expect(getResult(evaluate([1, 1, "+", 1, "+"]))).toEqual(3);
});

test("It should evaluate complex expressions", () => {
  expect(getResult(evaluate([1, 1, 1, "+", "+"]))).toEqual(3);
});

test("It should handle substraction", () => {
  expect(getResult(evaluate([1, 2, "-"]))).toEqual(-1);
});

test("It should handle multiplication", () => {
  expect(getResult(evaluate([1, 2, "*"]))).toEqual(2);
});

test("It should handle division", () => {
  expect(getResult(evaluate([1, 2, "/"]))).toEqual(0.5);
});

test("It should handle division by 0", () => {
  expect(getError(evaluate([1, 0, "/"]))).toEqual("Division by 0.");
});

test("More invalid input", () => {
  expect(getError(evaluate([1, "+"]))).toEqual("Input is not valid.");
});

test("More invalid input", () => {
  expect(getError(evaluate([1, "+"]))).toEqual("Input is not valid.");
});

test("More invalid input", () => {
  expect(getError(evaluate([1, 1, 1, "+"]))).toEqual("Input is not valid.");
});
