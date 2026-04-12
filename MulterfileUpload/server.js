const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5050;

// Middlewares
app.use(express.json()); // parses json body
app.use(express.urlencoded({ extended: true })); // parses urlencoded body

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});