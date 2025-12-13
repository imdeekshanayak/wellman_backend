const express = require("express");

const apiRouter = express.Router()
const NewEvent = require("../models/event.model");
const upload = require("../middleware/cloudinaryUpload")
// const upload= require("../middleware/upload.middleware")
const cloudinary = require("../middleware/cloudinary");
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
        message: "An event title with this date already exists!",
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

 apiRouter.post("/updateEvent",upload.single("image"),async (req, res) => {
    try {
      const {
        eventId,
        eventDate,
        startTime,
        endTime,
        address,
        title,
      } = req.body;

      // 1️⃣ Find event using eventID
      const event = await NewEvent.findOne({ eventId });
      if (!event) {
        return res.status(404).json({ message: "Event with this id not found" });
      }

      // 2️⃣ Update fields (only if provided)
      if (title) event.title = title;
      if (eventDate) event.eventDate = eventDate;
      if (startTime) event.startTime = startTime;
      if (endTime) event.endTime = endTime;
      if (address) event.address = address;

      // 3️⃣ Image update (Cloudinary)
      if (req.file) {
        // delete old image
        if (event.publicId) {
          await cloudinary.uploader.destroy(event.publicId);
        }

        // save new image
        event.image = req.file.path;        // Cloudinary URL
        event.publicId = req.file.filename; // Cloudinary public_id
      }

      // 4️⃣ Save updated event
      await event.save();

      res.status(200).json({
        message: "Event updated successfully!",
        data: event,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


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