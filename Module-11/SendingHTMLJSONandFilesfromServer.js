// sending html file data
// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     if(req.url === "/"){
//         fs.readFile("SendingHTMLJSONandFilesfromServer.html", (err, data) => {
//             if(err){
//                 res.writeHead(500, {"Content-type": "text/plain"})
//                 res.end("Error loading html file")
//             }else{
//                 res.writeHead(500, {"Content-type": "text/html"})
//                 res.end(data)
//             }
//         })
//     }
// });

// server.listen(5000, () => {
//     console.log("Server is running")
// });

// sending JSON data
// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     if(req.url === "/"){
//         fs.readFile("data.json", (err, data) => {
//             if(err) {
//                 res.writeHead(500, {"Content-type": "text/plain"})
//                 res.end("Error loading html file")
//             } else {
//                 res.writeHead(200, {"Content-type": "application/json"})
//                 res.end(data)
//             }
//         })
//     }
// });

// server.listen(5000, () => {
//     console.log("Server is running")
// });

//2nd part
// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/api") {
//     let user = {
//       name: "hasib",
//       age: 25,
//       profession: "Developer",
//     };

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(user));
//   }
// });

// server.listen(5000, () => {
//   console.log("Server running");
// });

// File part
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if(req.url === "/image"){
        let filePath = path.join(__dirname, "image.png")

        fs.readFile(filePath, (err, data) => {
            if(err) {
                res.writeHead(500, {"Content-type": "text/plain"})
                res.end("Error loading html file")
            } else {
                res.writeHead(200, {"Content-type": "image/png"})
                res.end(data)
            }
        })
    }
})

server.listen(5000, () => {
  console.log("Server running");
});