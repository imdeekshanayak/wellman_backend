const mongoose = require("mongoose");

const Serviceschema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model("services", Serviceschema);
module.exports = Service;
