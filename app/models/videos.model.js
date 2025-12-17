const mongoose = require("mongoose");

const  videoSchema =  new mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    youtubeUrl:{
         type:String,
         required:true
    },
},
    {
        timestamps:true
    }

);

const videos =mongoose.model("videos",videoSchema);
module.exports = videos;