const mongoose = require("mongoose");

const  galleryimageSchema =  new mongoose.Schema({
    galleryEventId:{
        type:String,
        primary:true,
        required:true,
        unique:false

    },
    imageUrl:{
         type:String
         
    }
},
    {
        timestamps:true
    }

);

const newgalleryImages =mongoose.model("galleryImage",galleryimageSchema);
module.exports = newgalleryImages;