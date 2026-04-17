const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // console.log(req.url); // Logs the URL of the request
    // console.log(req.method); // Logs the HTTP method of the request (e.g., GET, POST)
    // console.log(req.headers); // Logs the HTTP headers of the request
    // console.log(req.body); // Logs the body of the request (useful for POST requests)

    // res.send('Hello Express!');
    res.json({
        name: "Aziz",
        age: 25,
        job: "Web Developer"
    })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})