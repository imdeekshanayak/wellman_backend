const express = require("express");

const apiRouter = express.Router()

const upload = require("../middleware/cloudinaryUpload")

const cloudinary = require("../middleware/cloudinary");
const newgalleryImages = require("../models/galleryImages.model");
const multer = require("multer");
const path = require("path");

module.exports = function(app){

apiRouter.post("/create-galleryImage", upload.single("imageUrl"), async (req, res) => {
  try {
    const { galleryEventId} = req.body;

    const imageUrl = req.file ? req.file.path : "";

    const data = new newgalleryImages(
      { galleryEventId,imageUrl });

    await data.save();

    res.status(200).json({
      message: "imageurl added successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


  apiRouter.post("/get-galleryImage", async(req,res) =>{
    try {
            const {galleryEventId} =req.body;

        const alldata = await newgalleryImages.find({galleryEventId});
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

 apiRouter.post("/update-galleryImage",upload.single("imageUrl"),async (req, res) => {
    try {
      const  { galleryEventId,imageUrl }= req.body;

     
      const photos = await newgalleryImages.findOne({ galleryEventId });
      if (!photos) {
        return res.status(404).json({ message: "Folder with this id not found" });
      }
     
      

      
      await photos.save();

      res.status(200).json({
        message: "images updated successfully!",
        data: photos,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


apiRouter.post("/delete-galleryImage",async(req,res) =>
{
    try {
        const {galleryEventId} =req.body;
        const image = await newgalleryImages.findOneAndDelete({galleryEventId});


        return res.status(200).json({message:"image deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
});




    app.use("/",apiRouter);
}


