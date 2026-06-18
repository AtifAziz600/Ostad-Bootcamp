const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        unique: true,
        required: true,
    },
    category_image: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;