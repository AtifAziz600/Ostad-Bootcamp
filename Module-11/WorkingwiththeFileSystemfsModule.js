const fs = require("fs");

//sync akta kaj jotokhon porjonto complte na hoe tahole poroboti kaj a jabe na
// file create kora
// fs.writeFileSync("write.txt", "Hello Node By Working with the File System (fs Module)");

// file read kora 
// const result = fs.readFileSync("write.txt", "utf-8");
// console.log(result);

//file modhe kisu add kora
// fs.appendFileSync("write.txt", "\n This is New");

//file delete kora
// fs.unlinkSync("text.txt");

//file folder create
// fs.mkdirSync("Newfile");

//file folder delete
// fs.rmdirSync("Newfile");


//async sob kaj ak shate korbe

// fs.writeFile("hello.txt", "Hello Node By Working with the File System (fs Module)", (err) => {
//     console.log(err);
// })

// fs.readFile("hello.txt", "utf-8", (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// fs.appendFile("hello.txt", "\n Hello back", (err) => {
//     console.log(err);
// })

// fs.unlink("hello.txt", (err) => {
//     console.log(err);
// })

// fs.mkdir("Newfile", (err) => {
//     console.log(err);
// })

// fs.rmdir("Newfile", (err) => {
//     console.log(err);
// })