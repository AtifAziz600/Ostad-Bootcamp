const fs = require("fs");
const path = require("path");
const fileModel = require("../models/fileModel");

exports.fileUpload = async (req, res) => {
  try {
    const { filename } = req.file;

    let data = await fileModel.create({ fileName: filename });
    res.status(200).json({
      success: true,
      message: "File upload successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.allFile = async (req, res) => {
  try {
    let page_no = Number(req.params.page_no);
    let per_page = Number(req.params.per_page);

    let skipRow = (page_no - 1) * per_page;

    let sortStage = { createdAt: -1 };
    let facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        files: [
          { $sort: sortStage },
          { $skip: skipRow },
          { $limit: per_page },
          {
            $project: {
              updateAt: 0,
            },
          },
        ],
      },
    };

    let files = await fileModel.aggregate([facetStage]);

    res.status(200).json({
      success: true,
      message: "Files fetched successfully",
      data: files[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.fileRemove = async (req, res) => {
  try {
    let _id = req.body?._id;
    let filename = req.body?.filename;

    const filePath = path.join(__dirname, `../../uploads/${filename}`);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const data = await fileModel.deleteOne({ _id, filename });
    res.status(200).json({
      success: true,
      messgae: "File remove successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};
