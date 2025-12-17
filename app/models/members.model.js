const mongoose = require("mongoose");

const Memberschema = mongoose.Schema(
  {
    memberId: {
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

const NewMember = mongoose.model("member", Memberschema);
module.exports = NewMember;
