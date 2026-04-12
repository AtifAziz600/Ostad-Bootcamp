let student = {
    name: "John Doe",
    age: 20,
    grade: "A",
    class: "10th Grade",
    school: "ABC High School",
    greet: function() {
        console.log("Hello, my name is " + this.name);
    }
}

student.gender = "Male";
student.subjects = ["Math", "Science", "English"];

delete student.grade;

console.log(student);
// console.log(student.name); // Output: John Doe
// console.log(student.age); // Output: 20
// console.log(student.grade); // Output: A
// console.log(student.class); // Output: 10th Grade
// console.log(student.gender); // Output: Male
// console.log(student.subjects); // Output: ["Math", "Science", "English"]
// console.log(student.school); // Output: ABC High School
// console.log(student["school"]); // Output: ABC High School
// In this example, we have created a JavaScript object called student with properties such as name, age, grade, class, and school. We can access these properties using dot notation (e.g., student.name) to retrieve their values.