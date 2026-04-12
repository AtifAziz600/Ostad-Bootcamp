const http = require("http");

const server = http.createServer((req, res) => {
    let url = req.url;

    console.log(url)

    if(url === "/"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write("<h2>Home Page</h2>");
        res.end();
    } else if(url === "/about"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write("<h2>About Page</h2>");
        res.end();
    }else if(url === "/contact"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write("<h2>Contact Page</h2>");
        res.end();
    }else {
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("<h2>404 Not Found</h2>");
        res.end("404 Not Found");
    }
})

server.listen(4000, () => {
    console.log("Server is running");
})