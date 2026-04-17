const express = require('express');
const app = express();
app.use(express.json());
// Handling HTTP Methods in Express.js

// Express.js provides methods to handle different HTTP methods such as GET, POST, PUT, DELETE, etc.
// Each method corresponds to a specific type of request that the client can make to the server.
// Handling GET request
app.get('/products', (req, res) => {
    res.send('All Product!')
});

// Handling POST request
app.post('/products', (req, res) => {
    const newProduct = req.body;
    console.log(newProduct)
    // Here you would typically add the new product to your database
    res.send(`New Product Created! ${JSON.stringify(newProduct)}`);
});

// Handling PUT request
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const updateProduct = req.body;
    res.send(`Product updated! ID: ${id}, Updated Data: ${JSON.stringify(updateProduct)}`);
});

// Handling DELETE request
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Product deleted! ID: ${id}`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})