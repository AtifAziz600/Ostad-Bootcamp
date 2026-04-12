let btn = document.getElementById("myButton");

btn.addEventListener("click", function(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.type);
    console.log(event.currentTarget);
    console.log(event.target.tagName)
})