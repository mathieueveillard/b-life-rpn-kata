export type MappingFunction<U, V> = (u: U) => Result<V>;

type AbstractResult<Type> = {
  type: Type;
};

export type Success<U> = AbstractResult<"SUCCESS"> & { result: U };

export type Error = AbstractResult<"ERROR"> & { error: string };

export type Result<U> = Success<U> | Error;

export const success = <U>(result: U): Success<U> => ({
  type: "SUCCESS",
  result,
});

export const error = (e: string): Error => ({
  type: "ERROR",
  error: e,
});

export const isError = <U>(result: Result<U>): result is Error => result.type === "ERROR";

/*
 * Testing facilities
 */

export const getResult = <U>(result: Result<U>): U => (result as Success<U>).result;

export const getError = <U>(result: Result<U>): string => (result as Error).error;
