//Mouse Events all types
//click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout

//Keyboard Events all types
//keydown, keyup, keypress

//Form Events all types
//submit, change, input, focus, blur

//Window Events all types
//load, resize, scroll, beforeunload, unload

let box = document.getElementById("box");

box.addEventListener("mouseover", () => {
    box.style.backgroundColor = "red";
});

box.addEventListener("mouseout", () => {
    box.style.backgroundColor = "blue";

})

box.addEventListener("mouseup", () => {
    box.style.animation = "move 2s infinite";
})

box.addEventListener("mousedown", () => {
    box.style.animation = "move 2s infinite reverse";
})

box.addEventListener("mousemove", () => {
    box.style.backgroundColor = "green";
})

box.addEventListener("click", () => {
    box.style.backgroundColor = "yellow";
})

box.addEventListener("dblclick", () => {
    box.style.backgroundColor = "pink";
})  

let input = document.getElementById("name");
let output = document.getElementById("output");

input.addEventListener("keydown", () => {
    output.textContent = input.value;
})

input.addEventListener("keyup", () => {
    output.textContent = input.value;
})

input.addEventListener("keypress", () => {
    output.textContent = input.value;
})

const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted!");
})

const form2 = document.getElementById("username2");
const message = document.getElementById("message");
form2.addEventListener("focus", function() {
    message.textContent = "Input field is focused.";
    message.style.color = "red";
})

let emailInput = document.getElementById('email');
let warning = document.getElementById('warning');

emailInput.addEventListener('blur', function () {
    if (emailInput.value.trim() === "") {
        warning.textContent = "Email is required.";
    } else {
        warning.textContent = "";
    }
});

let select = document.getElementById('color');
let result = document.getElementById('result');

select.addEventListener('change', function () {
    result.textContent = select.value;
})

window.addEventListener('load', function () {
    console.log("Page is fully loaded.");
});

window.addEventListener('resize', function () {
    console.log("Window has been resized.");
});

window.addEventListener('scroll', function () {
    console.log("Window has been scrolled.");
});

window.addEventListener('beforeunload', function () {
    return "Are you sure you want to leave this page?";
});

window.addEventListener('unload', function () {
    console.log("Page has been unloaded.");
});