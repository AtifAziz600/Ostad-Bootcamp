
const numbers = [1, 2, 3, 4, 5]

const copied = [...numbers];

console.log(copied);

const a = [1, 2, 3];
const b = [4, 5, 6];

const merge = [...a, ...b];

console.log(merge);

const person = {
    name: "Atif",
    age: 25,
    city: "Dhaka"
};

const copiedPerson = { ...person };

console.log(copiedPerson);

const info = { name: "Karim"};

const work = { job: "Software Engineer"};

const mergeInfo = { ...info, ...work};

console.log(mergeInfo);

//Rest Operator

function myArray(...array){
    console.log(array[0])
}

let array_1 = [1, 2, 3];
let array_2 = [4, 5, 6];
let array3 = [7, 8, 9];

myArray(array_1, array_2, array3);