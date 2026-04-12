function removeElement() {
    const list = document.getElementById("studentList");

const removeName = list.children[1];

// removeChild() method is used to remove a child element from a parent element. It takes the child element as a parameter and removes it from the parent element.

list.removeChild(removeName);

// remove() method is used to remove an element from the DOM. It does not require a parent element as a parameter.
const removeName2 = document.getElementById("kamal");

removeName2.remove();

}