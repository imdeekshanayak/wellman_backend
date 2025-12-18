const mongoose = require("mongoose");

const  contributeSchema =  new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    profileUrl:{
         type:String,
         required:true
    },
},
    {
        timestamps:true
    }

);

const contribution =mongoose.model("contribute",contributeSchema);
module.exports = contribution;