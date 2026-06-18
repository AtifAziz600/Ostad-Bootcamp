const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
        qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
    versionKey: false,
}
)

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;