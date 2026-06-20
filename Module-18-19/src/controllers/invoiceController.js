const mongoose = require("mongoose");
const axios = require('axios');
const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");
const invoiceModel = require("../models/invoiceModel");
const invoiceProductModel = require("../models/invoiceProductModel");
const productModel = require("../models/productModel");
const ObjectId = mongoose.Types.ObjectId;

let redirect_url = "/cart-thank-you"

exports.createInvoice = async (req, res) => {
  try {
    let user_id = new ObjectId(req.header._id);
    let cus_email = req.header.email;

    let matchStage = { $match: { user_id } };

    let joinWithProduct = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    };

    let unwindStage = { $unwind: "$product" };

    let cartProduct = await cartModel.aggregate([
      matchStage,
      joinWithProduct,
      unwindStage,
    ]);

    if (cartProduct.length > 0) {
      let totalAmount = 0;
      cartProduct.forEach((item) => {
        let price;
        if (item?.product.is_discount === true) {
          price = parseFloat(item?.product?.discount_price); // jodi discount price jodi true hoe
        } else {
          price = parseFloat(item?.product?.price); // jodi discount price jodi false hoe
        }
        totalAmount = totalAmount + parseInt(item.qty) * price;
      });

      let vat = totalAmount * 0.15;
      let shipping = 75;

      let totalPayable = totalAmount + vat + shipping;

      let user = await userModel.findById(user_id);

      if (
        [
          user.cus_add,
          user.cus_city,
          user.cus_country,
          user.cus_fax,
          user.cus_name,
          user.cus_phone,
          user.cus_postcode,
          user.cus_state,
          user.ship_add,
          user.ship_city,
          user.ship_country,
          user.ship_name,
          user.ship_phone,
          user.ship_postcode,
          user.ship_state,
        ].every((v) => v === undefined)
      ) {
        res.status(200).json({
            success: false,
            message: "Please go to the dashboard and complete your profile"
        })
      }

      let cus_details = {
        Name: user?.cus_name,
        Email: user?.cus_email,
        Address: user?.cus_add,
        Phone: user?.cus_phone,
      }

      let ship_details = {
        Name: user?.ship_name,
        City: user?.ship_city,
        Address: user?.ship_add,
        Phone: user?.ship_phone,
      }

      let tran_id = "tra-" + Date.now() + Math.floor(Math.random() * 90000000);
      let val_id = "val-" + Date.now() + Math.floor(Math.random() * 90000000);


      let createInvoice = await invoiceModel.create({
        user_id: user_id,
        payable: parseFloat(totalPayable).toFixed(2),
        cus_details: cus_details,
        ship_details: ship_details,
        tran_id: tran_id,
        val_id: val_id,
        vat: vat,
        total: totalAmount,
      });
      let invoice_id = createInvoice._id;
for (const item of cartProduct) {
  await invoiceProductModel.create({
    user_id: user_id,
    product_name: item?.product_name,
    product_id: item?.product_id,
    invoice_id: invoice_id,
    qty: item?.qty,
    price:
      item.product.is_discount === true
        ? item?.product?.discount_price
        : item?.product?.price,
    color: item?.color,
    size: item?.size,
  });
}

   for(const item of cartProduct){
    await productModel.updateOne(
        { _id: item.product_id },
        { $inc: {stock: -item.qty} }
    )
   }

   await cartModel.deleteMany({ user_id: user_id });

   let paymentSetting = {
  store_id: process.env.SSLCZ_STORE_ID,
  store_passwd: process.env.SSLCZ_STORE_PASSWD,
  currency: process.env.SSLCZ_CURRENCY,
  success_url: process.env.SSLCZ_SUCCESS_URL,
  fail_url: process.env.SSLCZ_FAIL_URL,
  cancel_url: process.env.SSLCZ_CANCEL_URL,
  ipn_url: process.env.SSLCZ_IPN_URL,
  init_url: process.env.SSLCZ_INIT_URL,
};
let form = new FormData();
// Request Parameters
form.append("store_id", paymentSetting.store_id);
form.append("store_passwd", paymentSetting.store_passwd);
form.append("total_amount", totalPayable.toString());
form.append("currency", paymentSetting.currency);
form.append("tran_id", tran_id);
form.append("success_url", `${paymentSetting.success_url}/${tran_id}`);
form.append("fail_url", `${paymentSetting.fail_url}/${tran_id}`);
form.append("cancel_url", `${paymentSetting.cancel_url}/${tran_id}`);
form.append("ipn_url", `${paymentSetting.ipn_url}/${tran_id}`);

// Customer Information
form.append("cus_name", user?.cus_name);
form.append("cus_email", cus_email);
form.append("cus_add1", user?.cus_add);
form.append("cus_add2", user?.cus_add);
form.append("cus_city", user?.cus_city);
form.append("cus_state", user?.cus_state);
form.append("cus_postcode", user?.cus_postcode);
form.append("cus_country", user?.cus_country);
form.append("cus_phone", user?.cus_phone);

// Shipment Information
form.append("shipping_method", "YES");
form.append("ship_name", user?.ship_name);
form.append("ship_add1", user?.ship_add);
form.append("ship_add2", user?.ship_add);
form.append("ship_city", user?.ship_city);
form.append("ship_state", user?.ship_state);
form.append("ship_country", user?.ship_country);
form.append("ship_postcode", user?.ship_postcode);
form.append("ship_phone", user?.ship_phone);

// Product Information
form.append("product_name", "According Invoice");
form.append("product_category", "According Invoice");
form.append("product_profile", "According Invoice");
form.append("product_amount", "According Invoice");

let SSLRes = await axios.post(paymentSetting.init_url, form);
res.status(200).json({
    success: true,
    message: "Payment is successfull",
    data: SSLRes.data
})
    } else {
        return res.status(200).json({
            success: false,
            message: "Cart is empty"
        })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    });
  }
};

exports.readAllInvoiceSingleUser = async (req, res) => {
  try {
    let user_id = new ObjectId(req.headers._id);
    let page_no = Number(req.params.page_no);
    let per_page = Number(req.params.per_page);

    let skipRow = (page_no - 1) * per_page;
    let matchStage = {
      $match: {
        user_id: user_id
      },
    };
    let sortStage = {createdAt: -1};
    let facetStage = {
    $facet: {
        totalCount: [
            { $count: "count" } 
        ],
        data: [{$sort: sortStage}, {$skip: skipRow}, {$limit: per_page}]
    }
}

let product = await invoiceModel.aggregate([matchStage, facetStage])
res.status(200).json({
  success: true,
  message: "Invoice was fetched successfully",
  data: product[0],
})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    })
  }
}

exports.readSingleInvoiceSingleUser = async (req, res) => {
  try {
    let invoice_id = new ObjectId(req.params._invoice_id);
    
    let matchStage = {
      $match: {
        _id: invoice_id
      }
    };

    let joinStageWithProduct = {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "invoice_id",
        as: "orders"
      }
    };

    let data = await invoiceModel.aggregate([
      matchStage, joinStageWithProduct
    ]);
    res.status(200).json({
      success: true,
      message: "Invoice fetch Successfully",
      data: data?.[0]
    })
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    })
  }
}

exports.readInvoiceProductListSingleUser = async (req, res) => {
  try {
    let user_id = new ObjectId(req.headers._id);
    let page_no = Number(req.params.page_no);
    let per_page = Number(req.params.per_page);

    let skipRow = (page_no - 1) * per_page;
    let matchStage = {
      $match: {
        user_id: user_id
      },
    };

    let sortStage = {createdAt: -1};
    let joinStageWithProduct = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      }
    };

    let unwindStage = {$unwind: "$product"};

    let projectStage ={}
        let facetStage = {
    $facet: {
        totalCount: [
            { $count: "count" } 
        ],
        products: [{$sort: sortStage}, {$skip: skipRow}, {$limit: per_page}, unwindStage]
    }
}

let products = await invoiceProductModel.aggregate([matchStage, joinStageWithProduct, facetStage]);

res.status(200).json({
  success: true,
  message: "Invoice fetched Successfully",
  data: products[0]
})
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
    })
  }
}

// payment part

exports.paymentSuccess = async (req, res) => {
  try {
    let trx_id = req.params.trx_id;

    await invoiceModel.updateOne({tran_id: trx_id}, {payment_status: "success"});
    res.redirect(redirect_url);
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
      })
  }
}

exports.paymentCancel = async (req, res) => {
  try {
    let trx_id = req.params.trx_id;

    await invoiceModel.updateOne({tran_id: trx_id}, {payment_status: "cancel"});
    res.redirect(redirect_url);
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
      })
  }
} 

exports.paymentFail = async (req, res) => {
  try {
    let trx_id = req.params.trx_id;

    await invoiceModel.updateOne({tran_id: trx_id}, {payment_status: "fail"});
    res.redirect(redirect_url);
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
      })
  }
}

exports.paymentIpn = async (req, res) => {
  try {
    let trx_id = req.params.trx_id;
    // here is something you can send as a message
    res.status(200).json({
      success: true,
      message: "Here is something you need to have....."
    })
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.toString(),
      })
  }
}

