let num = 123453657567;

console.log(num.toExponential());

let num2 = 3.1415926535897932384626433832795;

console.log(num2.toFixed(2));

let num3 = 3.1415926535897932384626433832795;

console.log(num3.toPrecision(2));

let num4 = 3.1415926535897932384626433832795;

console.log(num4.toLocaleString('en-US'));
console.log(num4.toLocaleString('bn-BD'));

let num5 = 3.1415926535897932384626433832795;

let results = num5.toString();
console.log(typeof results); // Output: string

let num6 = 3.1415926535897932384626433832795;

console.log(num6.valueOf()); // Output: 3.141592653589793

let num7 = 3.1415926535897932384626433832795;

let results2 = parseInt(num7);
console.log(results2); // Output: 3

let num8 = "3.1415926535897932384626433832795";

let results3 = parseFloat(num8);
console.log(results3); // Output: 3.1

console.log(Number.MAX_VALUE); // Output: 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // Output: 5e-324
console.log(Number.POSITIVE_INFINITY); // Output: Infinity
console.log(Number.NEGATIVE_INFINITY); // Output: -Infinity
console.log(Number.NaN); // Output: NaN