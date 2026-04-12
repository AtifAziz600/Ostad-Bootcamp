
// class MyClass{

//     constructor() {
//         console.log("Contructor Call")
//     }
//     x = 50;
//     myFun(){
//         console.log("Hello OOP")
//     }
// }

// let myObj = new MyClass();
// myObj.myFun();

// class myStudent{
//     constructor(name, roll, age, city) {
//         this.name = name;
//         this.age = age;
//         this.city = city;
//         this.roll = roll;
//         console.log(name, roll, city, age);
//     }
//     // myFun() {
//     //     console.log(this.name)
//     // }
// }

// const student1 = new myStudent("Atif", 25, "Dhaka" , 1212);
// const student2 = new myStudent("Fahim", 25, "Dhaka", 1212);

// // student1.myFun();
// // student2.myFun();

// console.log(student1.name);
// console.log(student2.roll);

// class Student {
//   constructor(name, roll) {
//     this.name = name;
//     this.roll = roll;

//     console.log(name, roll);
//   }
// }

// const stu_1 = new Student("Alex", 20);
// const stu_2 = new Student("Raj", 50);

// console.log(stu_1.name);
// console.log(stu_1.roll);
// console.log(stu_2.name);
// console.log(stu_2.roll);

// class Student {
//   constructor(name = "Alex", roll = 20) {
//     this.name = name;
//     this.roll = roll;

//     console.log(name, roll);
//   }
// }

// const stu_1 = new Student();

// console.log(stu_1.name);

// class myClass{
//   static hello(){
//     console.log("Hello OOP static")
//   }
// }

// myClass.hello();

class Parent{
  x = 50;
  y = 100;
  hello(){
    console.log("This is Parent Proerty")
  }
}

class Child extends Parent{
  test() {
    super.hello();
  }
  // hello(){ this helps to rewrite
  //   console.log("This is Child Proerty")
  // }
}

let childObj = new Child();

console.log(childObj.x)