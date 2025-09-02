import { error, isError, Result, success } from "./utils/Result";
import { Stack } from "./utils/Stack";

type Operand = number;

const OPERATORS = ["+", "-", "*", "/"] as const;

type Operator = (typeof OPERATORS)[number];

type Token = Operand | Operator;

const isOperator = (token: Token): token is Operator => OPERATORS.includes(token as Operator);

type BinaryOperation = (first: Operand, second: Operand) => Result<Operand>;

const BINARY_OPERATIONS: Record<Operator, BinaryOperation> = {
  "+": (first, second) => success(first + second),
  "-": (first, second) => success(first - second),
  "*": (first, second) => success(first * second),
  "/": (first, second) => {
    if (second === 0) {
      return error("Division by 0.");
    }
    return success(first / second);
  },
};

type Input = Token[];

const evaluate = (input: Input): Result<Operand> => {
  const stack = new Stack<Operand>();

  const recursiveEvaluate = (input: Input): Result<Operand> => {
    if (input.length === 0) {
      if (stack.length > 1) {
        return error("Input is not valid.");
      }

      return success(stack.pop());
    }

    const [token, ...rest] = input;

    if (isOperator(token)) {
      if (stack.length < 2) {
        return error("Input is not valid.");
      }

      const [first, second] = stack.pop2();

      const result = BINARY_OPERATIONS[token](first, second);

      if (isError(result)) {
        // Result could/should be improved to handle that
        return result;
      }

      stack.push(result.result);

      return recursiveEvaluate(rest);
    }

    stack.push(token);

    return recursiveEvaluate(rest);
  };

  return recursiveEvaluate(input);
};

export default evaluate;
