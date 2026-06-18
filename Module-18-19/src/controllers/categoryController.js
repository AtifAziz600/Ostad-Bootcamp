const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

exports.createCategory = async (req, res) => {
  try {
    const { category_name, category_image } = req.body;

    let data = await categoryModel.create({ category_name, category_image });
    res.status(200).json({
      success: true,
      message: "Category created successfully",
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

exports.allCategory = async (req, res) => {
  try {
    let page_no = Number(req.params.page_no);
    let per_page = Number(req.params.per_page);

    let skipRow = (page_no - 1) * per_page;
    let sortStage = { createdAt: -1 };

    let joinWithProduct = {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category_id",
        as: "products",
      },
    };
    const addProductCount = {
      $addFields: {
        totalProduct: { $size: "$products" },
      },
    };
    let facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        categories: [
          { $sort: sortStage },
          { $skip: skipRow },
          { $limit: per_page },
          joinWithProduct,
          addProductCount,
          {
            $project: {
                updateAt: 0,
                products: 0,
            }
          }
        ],
      },
    };

    let categories = await categoryModel.aggregate([facetStage]);
    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: categories[0],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.singleCategory = async (req, res) => {
  try {
    let {id} = req.params;
    let data = await categoryModel.findById(id);
    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let {id} = req.params;
    const { category_name, category_image } = req.body;

    let data = await categoryModel.findByIdAndUpdate(id, { category_name, category_image }, {new: true});
    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel.find({ category_id: id });
    if(products.length > 0) {
        return res.status(200).json({
            success: false,
            message: "Please delete all products with this category first"
        })
    }
    const data = await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
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
