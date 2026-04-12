// 1. HTTP module k import korte hobe

const http = require("http");

// 2. Server start

const server = http.createServer((req, res) => {
    // 3. content set
    res.writeHead(200, {"Content-type": "text/html"})
    
    // 4.response set
    res.write("<h2>Hello this is node server</h2>");

    //5. process end
    res.end();
})

// 6 server listen by port
server.listen(5000, () => {
    console.log("Server is running")
});