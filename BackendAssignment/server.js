const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const user = require('./user.json');

//Middleware 
app.use(express.json());

//Middlware to log the request method time and url
app.use((req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} ${req.url}`);
    next();
})

//routes 
app.get("/", (req, res) => {
    res.send("Welcome to my first Express server");
});

app.get("/about", (req, res) => {
    res.send("This is about page");
})

app.get("/users", (req, res) => {
    res.json(user);
});

app.use((req, res) => {
  res.status(404).json({
    error: "404 - Page Not Found",
    message: `The route '${req.url}' does not exist.`,
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})