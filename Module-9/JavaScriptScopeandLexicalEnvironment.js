//Global Scope

let name = "Atif";

function sayHello() {
    console.log("Hello " + name);
}

sayHello();

//Function Scope

function greet() {
    let message = "Hello";
    console.log(message);
}
greet();
// console.log(message); // This will throw an error because message is not defined in the global scope

// Block Scope

if (true) {
    var age = 26;
    console.log(age);
}

// console.log(age); // This will throw an error because it is not inside the block scope if we use let if we use var it will work because var is function scoped not block scoped
// var is function scoped and let and const are block scoped. This means that variables declared with var are accessible outside of the block they are declared in, while variables declared with let and const are only accessible within the block they are declared in.
// let and const are also hoisted but they are not initialized until the code execution reaches their declaration, while var is hoisted and initialized with undefined. This means that if you try to access a variable declared with let or const before its declaration, you will get a ReferenceError, while if you try to access a variable declared with var before its declaration, you will get undefined.
// Lexical Environment

function outerFunction() {
    let name = "Atif";

    function innerFunction() {
        console.log("Hello " + name);
    }
    innerFunction();
}
outerFunction();
// Lexical Environment is the environment in which a function is declared. It consists of the variables and functions that are accessible to the function. In this example, innerFunction has access to the variable name because it is declared in the outerFunction's lexical environment.