// Array at() method
const arr = [10, 20, 30, 40, 50];
console.log(arr.at(2));
console.log(arr.at(-2));

// Array concat() Method
const fruits = ["apple", "banana"];
const vegetables = ["carrot", "tomato"];

const result = fruits.concat(vegetables);
console.log(result);

// Array copyWithin() Method
const numbers = [1, 2, 3, 4, 5];
numbers.copyWithin(0, 3);
console.log(numbers);

// Array every() Method
const ages = [18, 22, 25, 30];
const allAdults = ages.every(age => age > 0);
console.log(allAdults);

//Array filter() Method
const numbers2 = [1, 2, 3, 4, 5];
const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log(evenNumbers);


//Array find() Method
const numbers3 = [1, 2, 3, 4, 5];
const foundNumber = numbers3.find(num => num > 3);
console.log(foundNumber);

// Array findIndex() Method
const numbers4 = [1, 2, 3, 4, 5];
const foundIndex = numbers4.findIndex(num => num > 3);
console.log(foundIndex);

//Array from() Method
const str = "Hello";
const charArray = Array.from(str);
console.log(charArray);

//Array includes() Method
const numbers5 = [1, 2, 3, 4, 5];
const hasThree = numbers5.includes(3);
console.log(hasThree);

//Array join() Method
const words = ["Hello", "World"];
const sentence = words.join(" ");
console.log(sentence);

//Array lastIndexOf() Method
const numbers6 = [1, 2, 3, 4, 5, 3];
const lastIndex = numbers6.lastIndexOf(3);
console.log(lastIndex);

//Array length Method
const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.length);

//Array pop() Method
const numbers7 = [1, 2, 3, 4, 5];
const lastElement = numbers7.pop();
console.log(lastElement);
console.log(numbers7);

//Array push() Method
const names = ["Alice", "Bob"];
names.push("Charlie");
console.log(names);

//Array reverse() Method
const numbers8 = [1, 2, 3, 4, 5];
numbers8.reverse();
console.log(numbers8);

//Array shift() Method
const numbers9 = [1, 2, 3, 4, 5];
const firstElement = numbers9.shift();
console.log(firstElement);
console.log(numbers9);

//Array slice() Method
const numbers10 = [1, 2, 3, 4, 5];
const slicedArray = numbers10.slice(1, 4);
console.log(slicedArray);

//Array some() Method
const numbers11 = [1, 2, 3, 4, 5];
const hasEven = numbers11.some(num => num % 2 === 0);
console.log(hasEven);

//Array sort() Method
const numbers12 = [5, 2, 9, 1, 5];
numbers12.sort((a, b) => a - b);
console.log(numbers12);

//Array splice() Method
const numbers13 = [1, 2, 3, 4, 5];
numbers13.splice(2, 1, 10);
console.log(numbers13);

//Array toLocaleString() Method
const numbers14 = [1, 2, 3, 4, 5];
const localeString = numbers14.toLocaleString();
console.log(localeString);

//Array toString() Method
const numbers15 = [1, 2, 3, 4, 5];
const stringRepresentation = numbers15.toString();
console.log(stringRepresentation);

//Array unshift() Method
const numbers16 = [1, 2, 3, 4, 5];
numbers16.unshift(0);
console.log(numbers16);

