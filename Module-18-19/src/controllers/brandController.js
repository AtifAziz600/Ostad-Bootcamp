const brandModel = require("../models/brandModel");

exports.createBrand = async (req, res) => {
    try {
        const {brand_name, brand_img} = req.body;
        const data = await brandModel.create({brand_name, brand_img})
        res.status(200).json({
            success: true,
            message: "Brand created successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.toString()
        })
    }
}

exports.allBrand = async (req, res) => {
    try {
    let page_no = Number(req.params.page_no);
    let per_page = Number(req.params.per_page);

    let skipRow = (page_no - 1) * per_page;
    let sortStage = { createdAt: -1 };

    let joinWithProduct = {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "brand_id",
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
        brands: [
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

    let brands = await brandModel.aggregate([facetStage]);
    res.status(200).json({
        success: true,
        message: "Brand fetched successfully",
        data: brands[0],
    })
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.toString()
        })
    }
}

exports.singleBrand = async(req, res) => {
    try {
        const {id} = req.params;
        const data = await brandModel.findById(id);
        res.status(200).json({
            success: true,
            message: "Brand fetched successfully",
            data
        })
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.toString()
        })
    }
}

exports.updateBrand = async(req, res) => {
    try {
        const {id} = req.params;
        const {brand_name, brand_img} = req.body;
        let data = await brandModel.findByIdAndUpdate(id, {brand_name, brand_img})
        res.status(200).json({
            success: true,
            message: "Brand updated successfully",
            data
        })
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.toString()
        })
    }
}

exports.deleteBrand = async(req, res) => {
    try {
    const { id } = req.params;
    let products = await brandModel.find({ brand_id: id });
    if(products.length > 0) {
        return res.status(200).json({
            success: false,
            message: "Please delete all products with this brand first"
        })
    }
    await brandModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Brand deleted successfully"
    })
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.toString()
        }) 
    }
}