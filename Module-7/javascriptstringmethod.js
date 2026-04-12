// String Methods 

// charAt() method
const str = "Hello, World!";
console.log(str.charAt(0));

// concat() method

const str1 = "Atif"
const str2 = "Aziz"
const result = str1.concat(" ", str2);
console.log(result);

// includes()
const text = "Hello, World!";
console.log(text.includes("World"));

// indexOf() method
const str3 = "I am learning JavaScript.";
console.log(str3.indexOf("learning"));

// lastIndexOf() method
const str4 = "I am learning JavaScript. JavaScript is fun.";
console.log(str4.lastIndexOf("JavaScript"));

// startsWith() method
const str7 = "Hello, World!";
console.log(str7.startsWith("Hello"));

// endsWith() method
const str8 = "Hello, World!";
console.log(str8.endsWith("World!"));

// match() method
const str9 = "The rain in Spain stays mainly in the plain.";
const matches = str9.match(/ain/g);
console.log(matches);

// replace() method

const str10 = "I like cats.";
const newStr = str10.replace("cats", "dogs");
console.log(newStr);

// toUpperCase() method
const str11 = "Hello, World!";
console.log(str11.toUpperCase());

// toLowerCase() method
const str12 = "Hello, World!";
console.log(str12.toLowerCase());

// trim() method
const str13 = "   Hello, World!   ";
console.log(str13.trim());

// substr() method

const str14 = "Hello, World!";
console.log(str14.substr(0, 5));


// length property
const str5 = "Hello, World!";
console.log(str5.length);

// slice() method
const str6 = "Hello, World!";
console.log(str6.slice(0, 5));

// split() method
const str15 = "Hello, World!";
console.log(str15.split(","));

// toFixed() method
const num = 3.14159;
console.log(num.toFixed(2));

// toPrecision() method
const num2 = 3.14159;
console.log(num2.toPrecision(2));

// replaceAll() method
const str16 = "I like cats. Cats are great!";
const newStr2 = str16.replaceAll("cats", "dogs");
console.log(newStr2);

// repeat() method
const str17 = "Hello, ";
console.log(str17.repeat(3));

//trimStart() method
const str18 = "   Hello, World!";
console.log(str18.trimStart());

//trimEnd() method
const str19 = "Hello, World!   ";
console.log(str19.trimEnd());

// valueOf() method
const str20 = new String("Hello, World!");
console.log(str20.valueOf());

