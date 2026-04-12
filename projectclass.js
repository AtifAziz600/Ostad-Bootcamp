"use strict"; // STRICT MODE

console.log("Welcome Everyone......");

/* =========================
   OBJECT & METHODS
========================= */

const obj = {
  name: "John",
  age: 23,
  spouse: {
    name: "Michel",
    age: 56,
  },
  speak: () => {
    console.log("John is speaking...");
  },
  friends: ["Alex", "Bob"]
};

// Object methods
console.log(Object.keys(obj));      // ['name','age','spouse','speak','friends']
console.log(Object.values(obj));    // values of object
console.log(Object.entries(obj));   // key-value pairs
console.log(obj.hasOwnProperty("age")); // true

obj.speak();

/* =========================
   ARRAY & METHODS
========================= */

const obj2 = {
    address: "123 Main St",
    city: "New York",
    country: "USA",
    age: 30,
}

console.log(obj2);

function sum2 (a, b, c) {
    return a + b + c;
}
console.log(sum2(1, 2, 3));

const games = [
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  { name: "Chess" },
  function () {
    console.log("This is a function inside an array");
  },
  12345,
  true,
  ["Nested Array", "Another Element", { name: "Nested Object" }]
];

// push
games.push("Hockey");
console.log(games);

// pop
games.pop();
console.log(games);

// shift
games.shift();
console.log(games);

// unshift
games.unshift("Volleyball");
console.log(games);

// forEach
games.forEach((item, index) => {
  console.log(index, item);
});

// map
const upperGames = games.map(item =>
  typeof item === "string" ? item.toUpperCase() : item
);
console.log(upperGames);

// filter
const onlyStrings = games.filter(item => typeof item === "string");
console.log(onlyStrings);

// find
const foundGame = games.find(item => item === "Cricket");
console.log(foundGame);

// findIndex
const gameIndex = games.findIndex(item => item === "Basketball");
console.log(gameIndex);

// reduce
const combinedGames = onlyStrings.reduce((acc, curr) => {
  return acc + ", " + curr;
});
console.log(combinedGames);

/* =========================
   SET & METHODS
========================= */

const gameSet = new Set(["Football", "Cricket", "Football"]);

// add
gameSet.add("Hockey");

// has
console.log(gameSet.has("Cricket")); // true

// delete
gameSet.delete("Football");

// forEach
gameSet.forEach(value => console.log(value));

// keys / values / entries
console.log([...gameSet.keys()]);
console.log([...gameSet.values()]);
console.log([...gameSet.entries()]);

// clear
// gameSet.clear();

// Set operations
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// union
const union = new Set([...setA, ...setB]);
console.log(union);

// intersection
const intersection = new Set(
  [...setA].filter(x => setB.has(x))
);
console.log(intersection);

// difference
const difference = new Set(
  [...setA].filter(x => !setB.has(x))
);
console.log(difference);

/* =========================
   MAP & METHODS
========================= */

const userMap = new Map();

// set
userMap.set("name", "John");
userMap.set("age", 23);

// get
console.log(userMap.get("name"));

// has
console.log(userMap.has("age"));

// size
console.log(userMap.size);

// keys / values / entries
console.log([...userMap.keys()]);
console.log([...userMap.values()]);
console.log([...userMap.entries()]);

// delete
userMap.delete("age");

// clear
// userMap.clear();

/* =========================
   SPREAD OPERATOR
========================= */

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const mergedArray = [...arr1, ...arr2];
console.log(mergedArray);

const newObj = { ...obj, country: "Bangladesh" };
console.log(newObj);

/* =========================
   REST PARAMETER
========================= */

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(10, 20, 30, 40));

/* =========================
   HOISTING
========================= */

// Function hoisting
sayHello();

function sayHello() {
  console.log("Hello from hoisting!");
}

// Variable hoisting
console.log(a); // undefined
var a = 10;

// let / const are NOT hoisted the same way
// console.log(b); ❌ ReferenceError
let b = 20;

/* =========================
   END
========================= */
