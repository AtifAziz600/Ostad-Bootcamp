//  Object Non-Primitive Data Types in JavaScript
//  Non-primitive data types in JavaScript include Objects, Arrays, and Functions.
//  These data types can store multiple values and complex data structures.

// Example of an Object
const student = {
    name: "Alice",
    age: 20,
    isEnrolled: true,
    courses: ["Math", "Science", "History"]
}

console.log("Student Object:", student);
console.log("Student Name:", student.name);
console.log("Student Courses:", student.courses);

// Example of an Array
const numbers = [1,2,3,4,5];

console.log("Numbers Array:", numbers);
console.log("First Number:", numbers[0]);

// Example of a Function
function greet(name) {
    return `Hello, ${name}!`;
}

console.log("Greeting:", greet("Bob"));