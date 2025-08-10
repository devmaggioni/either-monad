import { Either, left, right } from "index";

function sayMyName(name: string, surname: string): Either<any, string> {
  try {
    return right("Olá " + name + " " + surname);
  } catch (e) {
    return left(e);
  }
}

let say = sayMyName("John", "Doe");
if (say.isRight()) console.log("sucess with either");

function errorExample(name: string, surname: string): Either<any, string> {
  try {
    throw new Error("Ops... a internal error as ocurred");
  } catch (e) {
    return left(e);
  }
}

let err = errorExample("John", "Doe");
if (err.isLeft()) console.log("catch a error!");
