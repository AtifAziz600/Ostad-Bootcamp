const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const brandController = require("../controllers/brandController");
const reviewController = require("../controllers/reviewController");
const cartController = require("../controllers/cartController");
const invoiceController = require("../controllers/invoiceController");
const authVerificationAdmin = require('../middlewares/authVerificationAdmin');
const authVerificationUser = require('../middlewares/authVerificationUser');

// Admin API
router.post("/admin-register", adminController.register)
router.post("/admin-login", adminController.login)
router.get("/admin", authVerificationAdmin , adminController.admin)
router.get("/admin-verify", authVerificationAdmin , adminController.adminVerify)
router.get("/admin-logout", authVerificationAdmin , adminController.adminLogout)
router.put("/admin-update", authVerificationAdmin, adminController.adminUpdate)

// User API
router.post("/user-register", userController.register)
router.post("/user-login", userController.login)
router.get("/user", authVerificationUser, userController.user)
router.get("/user-verify", authVerificationUser, userController.userVerify)
router.get("/user-logout", authVerificationUser, userController.logout)
router.put("/user-update", authVerificationUser, userController.userUpdate)

//Product API
router.post("/create-product", authVerificationAdmin, productController.createProduct);
router.get("/all-products/:category_id/:brand_id/:remark/:keyword/:per_page/:page_no", productController.allProduct)
router.get("/single-product/:id", productController.singleProduct)
router.put("/update-product/:id", authVerificationAdmin ,productController.updateProduct)
router.delete("/delete-product/:id", authVerificationAdmin ,productController.deleteProduct)

//Category API
router.post("/create-category", authVerificationAdmin, categoryController.createCategory)
router.get("/all-category/:per_page/:page_no", categoryController.allCategory)
router.get("/single-category/:id", categoryController.singleCategory)
router.put("/update-category/:id", authVerificationAdmin ,categoryController.updateCategory)
router.delete("/delete-category/:id", authVerificationAdmin ,categoryController.deleteCategory)

//Brand API
router.post("/create-brand", authVerificationAdmin, brandController.createBrand)
router.get("/all-brand/:per_page/:page_no", brandController.allBrand)
router.get("/single-brand/:id", brandController.singleBrand)
router.put("/update-brand/:id", authVerificationAdmin ,brandController.updateBrand)
router.delete("/delete-brand/:id", authVerificationAdmin ,brandController.deleteBrand)

//Review API
router.post("/create-review", authVerificationUser, reviewController.createReview)
router.get("/all-review/:per_page/:page_no", reviewController.allReview)
router.get("/all-review-by-product/:product_id", reviewController.allReviewByProduct)

// Cart API
router.post("/create-cart", authVerificationUser, cartController.createCart)
router.get("/read-cart", authVerificationUser, cartController.readCart)
router.put("/update-cart/:cart_id", authVerificationUser, cartController.updateCart)
router.delete("/delete-cart/:cart_id", authVerificationUser, cartController.deleteCart)

// Invoice API
router.post("/create-invoice", authVerificationUser, invoiceController.createInvoice)
router.get("/read-all-invoice-single-user/:page_no/:per_page", authVerificationUser, invoiceController.readAllInvoiceSingleUser)
router.get("/read-single-invoice-single-user/:invoice_id", authVerificationUser, invoiceController.readSingleInvoiceSingleUser)
router.get("/read-invoice-product-list-single-user/:page_no/:per_page", authVerificationUser, invoiceController.readInvoiceProductListSingleUser)

router.post("/payment-success/:trx_id", invoiceController.paymentSuccess);
router.post("/payment-cancel/:trx_id", invoiceController.paymentCancel);
router.post("/payment-ipn/:trx_id", invoiceController.paymentIpn);
module.exports = router;