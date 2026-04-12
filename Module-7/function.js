function sayHello(name) {
    console.log("Hello, " + name + "!");
}
sayHello("Alice");

console.log(sayHello);

function add(a, b) {
    return a + b;
}
const result = add(5, 3);
console.log(result);

function greet(name = "Guest") {
    console.log("Hello, " + name + "!");
}
greet("Bob");

console.log(greet);