const express = require('express');
const app = express();
//URL Query Parameters are used to send data to the server through the URL
//URL Query Parameters are added to the end of the URL after a question mark (?)

app.get("/search", (req, res) => {
    const name = req.query.name; // Accessing the query parameter 'name';
    const age = req.query.age; // Accessing the query parameter 'age';
    res.send(`Search Results for Name: ${name}, Age: ${age}`);
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})