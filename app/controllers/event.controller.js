const express = require("express");

const apiRouter = express.Router()
const NewEvent = require("../models/event.model");
const upload = require("../middleware/cloudinaryUpload")
// const upload= require("../middleware/upload.middleware")
const multer = require("multer");
const path = require("path");


module.exports = function(app) {
    
  apiRouter.post("/createEvent", upload.single("image"), async (req, res) => {
  try {
    const { eventDate, startTime, endTime, address, title } = req.body;

    // Generate EVENT ID first
    const eventId = "ENQ-" + Math.floor(1000 + Math.random() * 9000);

    // Check if this eventId already exists
    const existing = await NewEvent.findOne({ title, eventDate });
    if (existing) {
      return res.status(400).json({
        message: "An event with this ID already exists!",
      });
    }

    // Image handling
    const image = req.file ? req.file.path : "";

    // Save new event
    const data = new NewEvent({
      eventId,
      eventDate,
      startTime,
      endTime,
      address,
      title,
      image,
    });

    await data.save();

    res.status(200).json({
      message: "Event created successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


  apiRouter.get("/getEvent", async(req,res) =>{
    try {
        const alldata = await NewEvent.find();
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

  apiRouter.post("/updateEvent",upload.single("image"), async(req,res) =>{
     try {
    const {eventdate,startTime,endTime,address,title} = req.body;

    
    const event = await NewEvent.findOne({ eventId });
    if (!event) {
      return res.status(404).json("event not found");
    }


    // Update fields
    if (title) NewEvent.title = title;
        if (eventdate) NewEvent.eventdate = eventdate;

    if (startTime) NewEvent.startTime = startTime;
    if (endTime) NewEvent.endTime = endTime;
    if (address) NewEvent.address = address;
    if (startTime) NewEvent.startTime = startTime;

    // If new image uploaded
    if (req.file) {
      NewEvent.image = req.file.filename;
    }

    await NewEvent.save();

    res.status(200).json({
      message: "Event updated successfully!",
      data: NewEvent,
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
});


apiRouter.post("/deleteEvent",async(req,res) =>
{
    try {
        const {eventId} =req.body;
        const event = await NewEvent.findOneAndDelete({eventId});


        if(!event){
            return res.status(200).json({message:"this event does't exist"});
        }

        return res.status(200).json({message:"event deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  


    app.use("/",apiRouter);
}