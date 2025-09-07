"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.right = exports.left = exports.logger = void 0;
const logger_1 = require("./utils/logger");
class Left {
    value;
    type = "left";
    constructor(value, autoLog = true) {
        this.value = value;
        if (autoLog)
            logger_1.logger.error(value);
    }
    get l() {
        return true;
    }
    get r() {
        return false;
    }
    isLeft() {
        return true;
    }
    isRight() {
        return false;
    }
    /**
     * @example
      let teste = right(2) // => 2
      .map((x) => x * 2) // => 4
      .map((x) => x + 6) // => 10
     */
    map(fn) {
        return (0, exports.left)(fn(this.value));
    }
}
class Right {
    value;
    type = "right";
    constructor(value) {
        this.value = value;
    }
    get l() {
        return false;
    }
    get r() {
        return true;
    }
    isLeft() {
        return false;
    }
    isRight() {
        return true;
    }
    /**
       * @example
        let teste = right(2) // => 2
        .map((x) => x * 2) // => 4
        .map((x) => x + 6) // => 10
       */
    map(fn) {
        return (0, exports.right)(fn(this.value));
    }
}
exports.logger = logger_1.logger;
const left = (value, autoLog) => new Left(value, autoLog);
exports.left = left;
const right = (value) => new Right(value);
exports.right = right;
//# sourceMappingURL=index.js.map