const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(

  {

    title: { type: String },

    short_des: { type: String },

    des: { type: String },

    img: { type: String },

  },

  {

    versionKey: false,

    timestamps: true,

  }

);



const projectModel = mongoose.model("projects", DataSchema);



module.exports = projectModel;