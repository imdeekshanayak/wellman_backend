const mongoose = require("mongoose");
const Volunteerschema =  mongoose.Schema( {
    volunteerId: {
       type: String,
        required: true,
        primary: true,
        unique: true,
       
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
        default: "valunteer"
      },
    contactNo: {
        type: String,
        required: true
    }
})
const NewVolunteer = mongoose.model("volunteer",Volunteerschema)
module.exports = NewVolunteer;