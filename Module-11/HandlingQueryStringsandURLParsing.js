const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const parseURL = url.parse(req.url);
  const query = querystring.parse(parseURL.query);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(`Name : ${query.name} \n`);
  res.write(`Age : ${query.age}`);
  res.end();
});

server.listen(5000, () => {
  console.log("Server is run");
});