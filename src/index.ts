import { logger as Logger } from "@utils/logger";

export type Either<L, R> = Left<L> | Right<R>;

class Left<L> {
  readonly value: L;
  readonly type = "left";

  constructor(value: L, autoLog = true) {
    this.value = value;
    if (autoLog) Logger.error(value);
  }

  isLeft(): this is Left<L> {
    return true;
  }
  isRight(): this is Right<never> {
    return false;
  }

  /**
   * @example
    let teste = right(2) // => 2
    .map((x) => x * 2) // => 4
    .map((x) => x + 6) // => 10
   */
  map<T>(fn: (value: L) => T): Either<T, never> {
    return left(fn(this.value));
  }
}

class Right<R> {
  readonly value: R;
  readonly type = "right";

  constructor(value: R) {
    this.value = value;
  }

  isLeft(): this is Left<never> {
    return false;
  }
  isRight(): this is Right<R> {
    return true;
  }

  /**
     * @example
      let teste = right(2) // => 2
      .map((x) => x * 2) // => 4
      .map((x) => x + 6) // => 10
     */
  map<T>(fn: (value: R) => T): Either<never, T> {
    return right(fn(this.value));
  }
}

export const logger = Logger;
export const left = <L>(value: L, autoLog?: boolean): Either<L, never> =>
  new Left(value, autoLog);
export const right = <R>(value: R): Either<never, R> => new Right(value);
