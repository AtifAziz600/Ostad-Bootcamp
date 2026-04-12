// Javascript Operators
// Arithmetic Operators
// +, -, *, /, %, ++, --
// Assignment Operators
// =, +=, -=, *=, /=, %=
// Comparison Operators
// ==, ===, !=, !==, >, <, >=, <=
// Logical Operators
// &&, ||, !
// Bitwise Operators
// &, |, ^, ~, <<, >>, >>
// Ternary Operator
// condition ? expression1 : expression2
// Typeof Operator
// typeof operand
// instanceof Operator
// operand instanceof constructor
// Spread Operator
// ...
// Nullish Coalescing Operator
// ??
// Optional Chaining Operator
// ?.
// Exponentiation Operator
// **
// Comma Operator
// ,
// Delete Operator
// delete object.property
// Void Operator
// void expression
// Grouping Operator
// (expression)
// Yield Operator
// yield expression
// Await Operator
// await expression
// New Operator
// new constructor(arguments)
// This Operator
// this
// In Operator
// property in object
// For In Loop

// Arithmetic Operators Example

let a = 10;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(++a);
console.log(--b);

// Assignment Operators Example

let c = 20;
c += 5;

console.log(c);

let d = 15;

d = d + 5;

console.log(d);

// Comparison Operators Example

let e = 10;
let f = 5;

console.log(e == f);
console.log(e === f);
console.log(e != f);
console.log(e !== f);
console.log(e > f);
console.log(e < f);
console.log(e >= f);
console.log(e <= f);

// Logical Operators Example

let g = true;
let h = false;

console.log(g && h);
console.log(g || h);
console.log(!g);

// Bitwise Operators Example

let i = 5; // 0101
let j = 3; // 0011

console.log(i & j);
console.log(i | j);
console.log(i ^ j);
console.log(~i);
console.log(i << 1);
console.log(i >> 1);

// Ternary Operator Example

let k = 10;
let l = (k > 5) ? "Greater than 5" : "Less than or equal to 5";

console.log(l);

let age = 18;

let status = (age >= 18) ? "Adult" : "Minor";

console.log(status);

// Typeof Operator Example

let m = "Hello";
console.log(typeof m);

// instanceof Operator Example

let n = [1, 2, 3];
console.log(n instanceof Array);
console.log(n instanceof Object);

// Spread Operator Example
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6];

console.log(arr2);

// Nullish Coalescing Operator Example

let o = null;
let p = o ?? "Default Value";

console.log(p);