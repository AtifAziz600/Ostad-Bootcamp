const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createCart = async (req, res) => {
  try {
    let user_id = req.header._id;
    const { product_id, product_name, color, qty, size, price } = req.body; // ✅ added price

    const parsedQty = parseInt(qty); // ✅ parse once, use everywhere

    let product = await productModel.findById(product_id);

    let existingCart = await cartModel.findOne({
      user_id,
      product_id,
      product_name,
      color,
      size,
    });

    const carts = await cartModel.find({ product_id }).select("qty");
    const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);

    // ✅ moved stock check out of both branches — same logic either way
    if (product?.stock < totalQty + parsedQty) {
      return res.status(200).json({
        success: false,
        message: "You have added all the products in stock.",
      });
    }

    if (existingCart) {
      const updateData = await cartModel.updateOne(
        { _id: existingCart._id, user_id: existingCart.user_id },
        {
          $set: {
            user_id,
            product_id,
            product_name,
            color,
            size,
            price,
            qty: existingCart.qty + parsedQty, // ✅ existingCart.qty is already a Number
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Cart updated.",
        updateData,
      });
    } else {
      const data = await cartModel.create({
        user_id,
        product_id,
        product_name,
        color,
        qty: parsedQty,
        size,
        price, // ✅ included
      });

      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully.",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.readCart = async (req, res) => {
  try {
    let user_id = new ObjectId(req.header._id);
    let matchStage = { $match: { user_id} };

    let lookWithProducts = {
        $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
        }
    }

    let unWindStage = { $unwind: "$product" };
    let joinWithBrand = {
        $lookup: {
            from: "brands",
            localField: "product.brand_id",
            foreignField: "_id",
            as: "brand"
        }
    }
    let unwindStageBrand = { $unwind: "$brand" };
    let joinWithCategory = {
        $lookup: {
            from: "categories",
            localField: "product.category_id",
            foreignField: "_id",
            as: "category"
        }
    }
    let unwindStageCategory = { $unwind: "$category"};
    let projectStage = {
        $project: {
    _id: 1,
    user_id: 0,
    "product._id": 0,
    "product.category_id": 0,
    "product.brand_id": 0,
    "product.createdAt": 0,
    "product.updatedAt": 0,
    "product.description": 0,
    "brand._id": 0,
    "brand.createdAt": 0,
    "brand.updatedAt": 0,
    "category._id": 0,
    "category.createdAt": 0,
    "category.updatedAt": 0,

    category_id: 0,
    brand_id: 0,
    createdAt: 0,
    updatedAt: 0,
}
    }

    let data = await cartModel.aggregate([matchStage, lookWithProducts, unWindStage, joinWithBrand, unwindStageBrand, joinWithCategory, unwindStageCategory, projectStage])
    res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
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

exports.updateCart = async (req, res) => {
  try {
    const { product_id, qty, inc } = req.body;
    let user_id = new ObjectId(req.header._id);
    let cart_id = new ObjectId(req.params.cart_id);
    let incQty = 1;

    let cart = await cartModel.findOne({ _id: cart_id, user_id });
    if (!cart) {
      return res.status(200).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    if (inc) {
      let productId = product_id || cart.product_id;
      let product = await productModel.findById(productId);

      if (!product) {
        return res.status(200).json({
          success: false,
          message: "Product not found.",
        });
      }

      let carts = await cartModel.find({ product_id: productId }).select("qty");
      const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);

      if (product.stock < totalQty + incQty) {
        return res.status(200).json({
          success: false,
          message: "You have added all the products in stock.",
        });
      }

      const data = await cartModel.updateOne(
        { _id: cart_id, user_id },
        { $set: { product_id: productId, qty: cart.qty + incQty } }
      );

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully. inc +",
        data,
      });
    } else {
      let parsedQty = parseInt(qty);
      let newQty = Number.isNaN(parsedQty) ? cart.qty - incQty : parsedQty - incQty;

      if (newQty < 1) {
        newQty = 1;
      }

      const data = await cartModel.updateOne(
        { _id: cart_id, user_id },
        { $set: { qty: newQty } }
      );

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully. inc -",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    let cart_id = req.params.cart_id;

    let data = await cartModel.findByIdAndDelete(cart_id);

    res.status(200).json({
        success: true,
      message: "Cart deleted successfully",
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

