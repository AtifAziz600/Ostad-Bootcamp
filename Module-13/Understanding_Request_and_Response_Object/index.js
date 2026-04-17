const express = require('express');
const app = express();

// Understanding Request and Response Object in Express.js

// The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, etc.
// The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

app.get('/', (req, res) => {
    // Accessing query parameters from the request object
    const name = req.query.name || "Aziz";
    const age = req.query.age || "25";
    console.log(req.url); // Logs the URL of the request
    console.log(req.method); // Logs the HTTP method of the request (e.g., GET, POST)
    console.log(req.headers); // Logs the HTTP headers of the request
    console.log(req.body); // Logs the body of the request (useful for POST requests)

    // Sending a response back to the client using the response object
    // res.send(`Hello ${name}, you are ${age} years old!`);
    // res.status(200).json({ message: "This is a JSON response" }); // Sending a JSON response with a status code 
    // res.redirect('/new-url'); // Redirecting the client to a new URL
    // res.sendFile('/path/to/file'); // Sending a file as a response
    res.json({ name: "Aziz", age: 25 }); // Sending a JSON response
    res.end(); // Ending the response process
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})