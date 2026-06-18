const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
            des: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            }
},
{
    timestamps: true,
    versionKey: false,
}
)

const reviewModel = mongoose.model("review", reviewSchema);

module.exports = reviewModel;