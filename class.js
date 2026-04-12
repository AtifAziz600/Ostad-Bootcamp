console.log('JS File is linked');
//Every Function have to return something
//Function Definition
function login (username, password) {
    console.log('Login Function is called', username);
    console.log('Password:', password);
    return username + "::" + password;
}

//Function Call
const userToken = login('user1', 'pass123');
console.log('User Token:', userToken);

//Function input and output
// Function without input and output
// Function with input but no output
// Function without input but with output
// Function with input and output

// Function with input and output
function showName(name) {
  console.log("Name:", name);
}
showName("John");


// Function without input but with output
function getName() {
  return "John";
}
console.log(getName());


// Function with input and without output
function showDynamicName(name) {
  console.log("Dynamic Name:", name);
}
showDynamicName("Alex");


// Function with input and output
function getUserToken(username, password) {
  return username + "::" + password;
}
console.log(getUserToken("admin", "12345"));

// Function without input and output
function greet() {
    console.log("Hello, World!");
}
greet();


//Named Function

function NamedFunctionExample() {
    console.log("This is a named function");
}
NamedFunctionExample();

// Anonymous Function
const AnonymousFunctionExample = function(name, pass) {
    console.log("Name::Pass" + name + "::" + pass);
}
AnonymousFunctionExample("anonUser", "anonPass");

function calculate(sumFn, sumNum1, sumNum2 ,multiply) {
    const sumFnOp = sumFn(sumNum1, sumNum2);

    return sumFnOp * multiply;
}

console.log(calculate(function(x, y) { return x + y; }, 5, 10, 2));

// Arrow Function

const ArrowFunctionExample = (userName, password) => {
    console.log("Arrow Function Called");
    return userName + "::" + password;
}

const ArrowFunctionExample2 = (userName, password) => userName + "::" + password
console.log(ArrowFunctionExample("arrowUser", "arrowPass"));
console.log(ArrowFunctionExample2("arrowUser2", "arrowPass2"));

const testThisObject = {
    name: "Test Object",
    arrow: () => {
        console.log("Inside Arrow...")
        console.log(this);
    },
    normal: function() {
        console.log("Inside Normal...")
        console.log(this);
    }
}

testThisObject.arrow();
testThisObject.normal();

//Imediately Invoked Function Expression (IIFE)

(function(name, pass) {
    console.log("IIFE Function Called");
    console.log("IIFE Called with", name, pass);
})("iifeUser", "iifePass");

(function(name, pass) {
    console.log("IIFE Function Called 2");
    console.log("IIFE Called with", name, pass);
})("iifeUser2", "iifePass2");

//Generator Function

function* sumFunction() {
    let sum = 0;
    sum += 1;
    yield sum + 1;
    sum += 1;
    yield sum + 1;
    sum += 1;
    yield sum + 1;

    return sum;
}

sumFunction();


// Recursion Function

function countdown(number) {
    if(number < 0) {
        console.log("This is the Time");
    } else {
        console.log(number);
        countdown(number - 1);
    }
}

countdown(5);