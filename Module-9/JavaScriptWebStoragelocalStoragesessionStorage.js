// Data Set method of local storage

localStorage.setItem("Name", "Atif");
localStorage.setItem("Age", 25);
localStorage.setItem("ID", 1212);

// Data recived 

let Name = localStorage.getItem("Name");

console.log(Name);

let age = localStorage.getItem("Age");

console.log(age);

//Remove data in local storage
localStorage.removeItem("Name");
localStorage.removeItem("Age");

//Clear all data in local storage
localStorage.clear();

// Data Set method of Session storage

// sessionStorage.setItem("Name", "Atif");
// sessionStorage.setItem("Age", 25);
// sessionStorage.setItem("ID", 1212);

// let Name2 = sessionStorage.getItem("Name");

// console.log(Name2);

// let age2 = sessionStorage.getItem("Age");

// console.log(age2);

