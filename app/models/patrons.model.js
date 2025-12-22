const mongoose = require("mongoose");

const PatronSchema = mongoose.Schema(
  {
    patronId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    contactNo: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,   
      required: false
    }
  },
  { timestamps: true }
);

const Patrons = mongoose.model("Patrons", PatronSchema);
module.exports = Patrons;
