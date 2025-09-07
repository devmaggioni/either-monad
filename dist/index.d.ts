export type Either<L, R> = Left<L> | Right<R>;
declare class Left<L> {
    readonly value: L;
    readonly type = "left";
    constructor(value: L, autoLog?: boolean);
    get l(): true;
    get r(): false;
    isLeft(): this is Left<L>;
    isRight(): this is Right<never>;
    /**
     * @example
      let teste = right(2) // => 2
      .map((x) => x * 2) // => 4
      .map((x) => x + 6) // => 10
     */
    map<T>(fn: (value: L) => T): Either<T, never>;
}
declare class Right<R> {
    readonly value: R;
    readonly type = "right";
    constructor(value: R);
    get l(): false;
    get r(): true;
    isLeft(): this is Left<never>;
    isRight(): this is Right<R>;
    /**
       * @example
        let teste = right(2) // => 2
        .map((x) => x * 2) // => 4
        .map((x) => x + 6) // => 10
       */
    map<T>(fn: (value: R) => T): Either<never, T>;
}
export declare const logger: {
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    debug: (...args: any[]) => void;
};
export declare const left: <L>(value: L, autoLog?: boolean) => Either<L, never>;
export declare const right: <R>(value: R) => Either<never, R>;
export {};
//# sourceMappingURL=index.d.ts.map