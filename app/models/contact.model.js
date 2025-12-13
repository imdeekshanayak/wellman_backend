const mongoose = require("mongoose");

const Contactschema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    donationTo: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

const Contact = mongoose.model("addContact", Contactschema);
module.exports = Contact;
