// element.classList.add("class-name");

// element.classList.remove("class-name");

// element.classList.toggle("class-name");

// element.classList.contains("class-name");

function toggleHighlight() {
    let element = document.getElementById("box");
    element.classList.toggle("highlight");
}
toggleHighlight();
function toggleRemove() {
    let element = document.getElementById("box");
    element.classList.remove("highlight");
}
toggleRemove();

function toggleAdd() {
    let element = document.getElementById("box");
    element.classList.add("highlight");
}
toggleAdd();

function toggleContain() {
    let element = document.getElementById("box");
    console.log(element.classList.contains("highlight"));
}
toggleContain();