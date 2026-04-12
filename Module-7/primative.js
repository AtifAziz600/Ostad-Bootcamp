//Number

let num = 10;
let num_10 = 10.5;

//String
let str1 = "Hello, World!";
let str2 = 'JavaScript is fun.';
let str3 = `Template literals are great!`;

//Boolean
let isTrue = true;
let isFalse = false;

//Undefined
let undef; 
//Null
let emptyValue = null;

//Symbol
let sym1 = Symbol('id');
let sym2 = Symbol('id');

//BigInt
let bigIntNum = 9007199254741991n;
console.log(typeof num);          // number
console.log(typeof str1);
console.log(typeof isTrue);      // boolean
console.log(typeof undef);      // undefined
console.log(typeof emptyValue);  // object
console.log(typeof sym1);      // symbol
console.log(typeof bigIntNum);   // bigint
console.log(sym1 === sym2);     // false

