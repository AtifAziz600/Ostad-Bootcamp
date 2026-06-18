const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createReview = async(req, res) => {
    try {
        let user_id = req.header._id;
        const { product_id, invoice_id, des, rating } = req.body;

        let review = await reviewModel.updateOne(
            { user_id, product_id, invoice_id },
            { user_id, product_id, invoice_id, des, rating },
            { new: true, upsert: true}
        )
        res.status(200).json({
            success: true,
            message: "Review created successfully",
            review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString()
        })
    }
}

exports.allReview = async(req, res) => {
    try {
    let page_no = Number(req.params.page_no);
    let per_page = Number(req.params.per_page);

    let skipRow = (page_no - 1) * per_page;
    let sortStage = { createdAt: -1 };
    let joinWithUser = {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    };
    let joinWithProduct = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindStageUser = { $unwind: "$user"}
    let unwindStageProduct = { $unwind: "$product"}
    let projectStage = {
        $project:{
            _id: 1,
            product_id: 1,
            invoice_id: 1,
            des: 1,
            rating: 1,
            "user.cus_name": 1,
            "user.email": 1,
            "product.title": 1,
            "product.images": 1,
        }
    }

    let facetStage = {
        $facet: {
            totalCount: [{ $count: "count"}],
            data: [
            { $sort: sortStage },
            { $skip: skipRow },
            { $limit: per_page },
            joinWithUser,
            unwindStageUser,
            joinWithProduct,
            unwindStageProduct,
            projectStage
        ]
        },
    }
    let data = await reviewModel.aggregate([facetStage]);

    res.status(200).json({
        success: true,
        message: "Review fetched successfully",
        data: data[0],
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString()
        })
    }
}

exports.allReviewByProduct = async(req, res) => {
    try {
        let product_id = new ObjectId(req.params.product_id);

        let matchStage = {
            $match: {
              product_id
            }
        }

        let jointWithUser = {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        }

        let unwindStageUser = { $unwind: "$user" }
        let projectStage = {
            $project: {
                createdAt: 1,
                updatedAt: 1,
                des: 1,
                rating: 1,
                "user.cus_name": 1,
                "user.email": 1,
            }
        }

        let data = await reviewModel.aggregate([matchStage, jointWithUser, unwindStageUser, projectStage])

        res.status(200).json({
            success: true,
            message: "Review fetched successfully",
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