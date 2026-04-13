const express = require("express");
const app = express();

const userData = require('./user.json');
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Express.js</h1><p>This is a simple HTML response.</p>"); // Sending HTML response to the client
});

app.get("/json", (req, res) => {
  const data = {
    name: "John Doe",
    age: 30,
    city: "New York",
  };
  res.json(data); // Sending JSON response to the client
});

app.get("/user", (req, res) => {
  res.json(userData);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});