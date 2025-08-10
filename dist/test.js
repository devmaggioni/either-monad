"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function sayMyName(name, surname) {
    try {
        return (0, index_1.right)("Olá " + name + " " + surname);
    }
    catch (e) {
        return (0, index_1.left)(e);
    }
}
let say = sayMyName("John", "Doe");
if (say.isRight())
    console.log("sucess with either");
function errorExample(name, surname) {
    try {
        throw new Error("Ops... a internal error as ocurred");
    }
    catch (e) {
        return (0, index_1.left)(e);
    }
}
let err = errorExample("John", "Doe");
if (err.isLeft())
    console.log("catch a error!");
//# sourceMappingURL=test.js.map