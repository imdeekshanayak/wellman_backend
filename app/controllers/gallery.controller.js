const express = require("express");

const apiRouter = express.Router()
const Newgallery = require("../models/gallery.model");
const upload = require("../middleware/cloudinaryUpload")

const cloudinary = require("../middleware/cloudinary");

const multer = require("multer");
const path = require("path");

module.exports = function(app){

apiRouter.post("/galleryEvent", upload.single("coverImage"), async (req, res) => {
  try {
    const { location, year, eventName } = req.body;


    
    const galleryEventId = "ENQ-" + Math.floor(1000 + Math.random() * 9000);

    
    const existing = await Newgallery.findOne({ eventName, location});
    if (existing) {
      return res.status(400).json({
        message: "An folder with this name and  location  already exists!",
      });
    }

    
    const coverImage = req.file ? req.file.path : "";


    const data = new Newgallery({
      galleryEventId,
      location,
     year, 
     eventName,
      coverImage,
    });

    await data.save();

    res.status(200).json({
      message: "Folder created successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


  apiRouter.get("/get-galleryEvent", async(req,res) =>{
    try {
        const alldata = await Newgallery.find();
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

 apiRouter.post("/update-galleryEvent",upload.single("coverImage"),async (req, res) => {
    try {
      const {
        eventId,
        location,
        year,
        eventName,
      } = req.body;

     const galleryEventId = eventId;
      const folder = await Newgallery.findOne({ galleryEventId });
      if (!folder) {
        return res.status(404).json({ message: "Folder with this id not found" });
      }

     
      if (location) folder.location = location;
      if (year) folder.year = year;
      if (eventName) folder.eventName = eventName;

     
      if (req.file) {
        
        if (folder.publicId) {
          await cloudinary.uploader.destroy(folder.publicId);
        }

        folder.coverImage = req.file.path;        
        folder.publicId = req.file.filename;     
      }

      
      await folder.save();

      res.status(200).json({
        message: "Folder updated successfully!",
        data: folder,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


apiRouter.post("/deleteEvent",async(req,res) =>
{
    try {
        const {galleryEventId} =req.body;
        const folder = await Newgallery.findOneAndDelete({galleryEventId});


        if(!folder){
            return res.status(200).json({message:"this folder does't exist"});
        }

        return res.status(200).json({message:"folder deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
});



  


    app.use("/",apiRouter);
}


