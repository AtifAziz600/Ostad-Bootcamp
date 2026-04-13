const express = require("express");
const app = express();

//Dynamic Routing what ever we write in the url it will be treated as a parameter
//Reason for using dynamic routing is to make our application more flexible and reusable
app.get("/page/:slug", (req, res) => {
    const slugName = req.params.slug;
    res.send(`You are on the Page No: ${slugName} `);
});

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

app.get("product/:category/:id", (req, res) => {
    const category = req.params.category;
    const productId = req.params.id;
    res.send(`Product Category: ${category}, Product ID: ${productId}`);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})