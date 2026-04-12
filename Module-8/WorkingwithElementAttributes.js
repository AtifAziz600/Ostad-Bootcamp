//getAttribute() method is used to get the value of an attribute of an element. It takes the name of the attribute as a parameter and returns the value of that attribute.

let link = document.getElementById("myLink");

let hrefValue = link.getAttribute("href");

console.log(hrefValue);

//setAttribute() method is used to set the value of an attribute of an element. It takes the name of the attribute and the value to be set as parameters.

const image = document.getElementById("myImage");

const Src = image.getAttribute("src");

console.log(Src);

image.setAttribute("src", "../assets/7f1cd52c3abc0c088574114b6e075e47d3f56e2d.jpg");

const newSrc = image.getAttribute("src");
console.log(newSrc);