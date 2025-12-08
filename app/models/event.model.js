const mongoose = require("mongoose");
const Eventschema =  mongoose.Schema( {
    eventId: {
       type: String,
        required: true,
        primary: true,
        unique: true,
        
    },
    title: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        
      },
    endTime: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
})
const NewEvent = mongoose.model("eventadd",Eventschema)
module.exports = NewEvent;