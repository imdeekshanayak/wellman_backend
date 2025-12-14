
const mongoose = require("mongoose");

const  gallerySchema =  new mongoose.Schema({
    galleryEventId:{
        type:String,
        primary:true,
        required:true,
        unique:true

    },
    location:{
       type:String,
       required:true
    },
    year:{
         type:String,
         required:true
    },
    coverImage:{
         type:String
         
    },
    eventName:{
         type:String,
         required:true
    }
},
    {
        timestamps:true
    }

);

const newgallery =mongoose.model("gallery",gallerySchema);
module.exports = newgallery;