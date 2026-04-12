let textElements = document.getElementById("titile");

textElements.textContent = "Atif Aziz"

const paragraph = document.getElementsByClassName("para");

paragraph[0].textContent = "I am a web developer and I am learning JavaScript to enhance my skills in web development. I enjoy creating interactive and dynamic websites that provide a great user experience. JavaScript allows me to bring my ideas to life and make my websites more engaging and functional."

console.log(paragraph[1]);

let h2_tag = document.getElementsByTagName("h2");
h2_tag[0].textContent = "This is a heading 2 tag";
h2_tag[1].textContent = "This is a heading 3 tag";

let buttonId = document.querySelector("#btn_id");
buttonId.textContent = "Click Me";

let button = document.querySelector("button");
button.textContent = "Click";

let buttonClass = document.querySelector(".btn_class");
buttonClass.textContent = "Submit";

const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.textContent = "Updated Button";
});