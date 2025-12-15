const mongoose = require("mongoose");

const  certificationSchema =  new mongoose.Schema({
    certificateId:{
        type:String,
        primary:true,
        required:true,
        unique:true

    },
    courseName:{
       type:String,
       required:true
    },
    issueDate:{
         type:String,
         required:true
    },
    validUpTo:{
         type:String
         
    },
    candidateName:{
         type:String,
         required:true
    },
    mentor:{
         type:String,
         required:true
    }
},
    {
        timestamps:true
    }

);

const newcertificates =mongoose.model("certificates",certificationSchema);
module.exports = newcertificates;