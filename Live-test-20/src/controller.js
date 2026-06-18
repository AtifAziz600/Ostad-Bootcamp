const projectModel = require('./projectModel');

// create new project
const createProject = async (req, res) => {
    try {
        const { title, short_des, des, img } = req.body;

        const newProject = new projectModel({
            title, short_des, des, img
        });
        const savedProject = await newProject.save();

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: savedProject,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
        
    }
}


// READ all projects
const getAllproject = async (req, res) => {
    try {
        const projects = await projectModel.find();

        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: projects,
        })
    } catch (error) {
        res.status({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

// delete project

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

// update project

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_des, des, img } = req.body;

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      { title, short_des, des, img },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

module.exports = {
    createProject, getAllproject, deleteProject, updateProject
}