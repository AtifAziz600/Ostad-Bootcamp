const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false,
}
)

const fileModel = mongoose.model("file", fileSchema);

module.exports = fileModel;