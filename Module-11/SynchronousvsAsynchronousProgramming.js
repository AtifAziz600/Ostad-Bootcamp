// const fs = require("fs");

// const data = fs.readFileSync('text.txt', 'utf-8');

// console.log(data);
// console.log("File is being saved")

const fs = require("fs");

fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error", err);
    return;
  } else {
    console.log(data);
  }
});

console.log("File is being read...");