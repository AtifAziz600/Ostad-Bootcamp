//Array Destructuring

const student = ["Fahim", 25, "Dhaka", "Male", 1212];

// const myname = student[0];
// const age = student[1];
// const city = student[2];
// const gender = student[3];
// const id = student[4];

//Array Destructuring 
const [myname, age, city, gender, id] = student;

console.log(`Name: ${myname} Age: ${age} City: ${city} Gender: ${gender} ID: ${id}`)

//Object Destructuring

const person = {
    mname: "Atif",
    mage: 25,
    mcity: "Dhaka",
    mgender: "Male",
    mid: 1212,
    profession: "Software Engineer"
}

const { mname, mage, mcity, mgender, mid, profession } = person;

console.log(`Name: ${mname} Age: ${mage} City: ${mcity} Gender: ${mgender} ID: ${mid} Profession: ${profession}`)