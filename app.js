// /*
// =====================================================
// What is JavaScript?
// -----------------------------------------------------
// JavaScript is a high-level, interpreted programming
// language used to make web pages interactive.
// It runs in the browser and on servers (Node.js).
// =====================================================
// */

// /*
// =====================================================
// Why do we need JavaScript?
// -----------------------------------------------------
// - Add interactivity to websites
// - Validate forms
// - Communicate with APIs
// - Build web & mobile applications
// =====================================================
// */

// // ==============================
// // Variables & Constants
// // ==============================

// // var (function-scoped, avoid in modern JS)
// var oldVariable = "I am var";

// // let (block-scoped, recommended)
// let userName = "Atif";

// // const (block-scoped, cannot be reassigned)
// const country = "Bangladesh";

// // country = "Japan"; ❌ Error (cannot reassign const)

// // ==============================
// // Data Types
// // ==============================

// let age = 23;                   // Number
// let price = 99.99;              // Number
// let isDeveloper = true;          // Boolean
// let company = null;              // Null
// let experience;                 // Undefined
// let skills = ["JS", "Vue", "Laravel"]; // Array (object)
// let profile = {                 // Object
//   name: "Atif",
//   role: "Frontend Developer"
// };

// console.log(typeof age);        // number
// console.log(typeof skills);     // object

// // ==============================
// // Operators
// // ==============================

// // Arithmetic Operators
// let a = 10;
// let b = 3;

// console.log(a + b); // Addition
// console.log(a - b); // Subtraction
// console.log(a * b); // Multiplication
// console.log(a / b); // Division
// console.log(a % b); // Modulus

// // Comparison Operators
// console.log(a > b);    // true
// console.log(a === b);  // false
// console.log(a !== b);  // true

// // Logical Operators
// let hasJob = true;
// let hasVisa = false;

// console.log(hasJob && hasVisa); // false
// console.log(hasJob || hasVisa); // true
// console.log(!hasJob);           // false

// // ==============================
// // Conditionals
// // ==============================

// // if-else
// let marks = 75;

// if (marks >= 80) {
//   console.log("Grade: A");
// } else if (marks >= 60) {
//   console.log("Grade: B");
// } else {
//   console.log("Grade: C");
// }

// // switch-case
// let day = "Monday";

// switch (day) {
//   case "Monday":
//     console.log("Start of work week");
//     break;
//   case "Friday":
//     console.log("Weekend is coming");
//     break;
//   default:
//     console.log("Normal day");
// }

// // ==============================
// // Loops
// // ==============================

// // for loop
// for (let i = 1; i <= 3; i++) {
//   console.log("For loop:", i);
// }

// // while loop
// let count = 1;
// while (count <= 3) {
//   console.log("While loop:", count);
//   count++;
// }

// // for-of (used for arrays)
// for (let skill of skills) {
//   console.log("Skill:", skill);
// }

// // for-in (used for objects)
// for (let key in profile) {
//   console.log(key + ":", profile[key]);
// }

// // ==============================
// // Scoping (var, let, const)
// // ==============================

// function testScope() {
//   if (true) {
//     var x = 10;   // function-scoped
//     let y = 20;   // block-scoped
//     const z = 30; // block-scoped
//   }

//   console.log(x); // ✅ Works
//   // console.log(y); ❌ Error
//   // console.log(z); ❌ Error
// }

// testScope();

// ==============================
// Comments
// ==============================

// Single-line comment

/*
Multi-line
comment
used for documentation
*/

// ==============================
// End of JavaScript Basics
// ==============================

// console.log("Hello, World!");

// var a = 99;

// if (a/2 === 50) {
//     console.log("a is 100");
// }

// else if  (a/3 === 33) {
//     console.log("a is 99");
// }
// else {
//     console.log("a is not 100");
// }

// var i = 1;

// // while (i <= 10) {
// //     console.log(i);
// //     i++;
// // }

// for (i = 1; i <= 10; i++) {
//     console.log(i);
// }

// let day = "Friday";
// switch (day) {
//     case "Monday":
//         console.log("Today is Monday");
//         break;
//     case "Tuesday":
//         console.log("Today is Tuesday");
//         break;
//     default:
//         console.log("Today is not Monday or Tuesday");
// }

if (true) {
    var abc = 3;
let xyz = 5;
const pi = 3.14;

console.log("I am inside the block");
console.log(abc);
console.log(xyz);
console.log(pi);
}
console.log("I am outside the block");
console.log(abc);
// console.log(xyz); // Error
// console.log(pi); // Error