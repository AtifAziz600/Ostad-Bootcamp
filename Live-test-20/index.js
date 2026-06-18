const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./src/router");

const app = express();
app.use(express.json());
app.use("/api", router);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("MongoDB Connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});