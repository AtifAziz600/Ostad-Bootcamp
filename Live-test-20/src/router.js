const express = require("express");
const router = express.Router();
const { createProject, getAllProjects, deleteProject, updateProject } = require("./controller");

router.post("/projects", createProject);
router.get("/projects", getAllProjects);
router.delete("/projects/:id", deleteProject);
router.put("/projects/:id", updateProject);

module.exports = router;