// JavaScript Closures

// A closure is a function that has access to its own scope, the outer function's scope, and the global scope. 
// It allows a function to access variables from an enclosing scope even after it has left the scope in which it was declared.

function outerFunction() {
    let number = 0;

    function innerFunction() {
        number++;
        console.log("Counted Number is:" + number);
    }
    return innerFunction;
}

const counter = outerFunction();

counter();
counter();
counter();
counter();
counter();
counter();
