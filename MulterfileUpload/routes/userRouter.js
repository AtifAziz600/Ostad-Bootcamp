const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

// localhost:5050/api/users/create - POST
router.post("/create", userController.createUser);

router.get("/list", (req, res) => {
    res.status(200).json({ data: "List of users" });
});

module.exports = router;