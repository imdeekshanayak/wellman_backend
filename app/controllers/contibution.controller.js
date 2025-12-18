const express = require("express");
const apiRouter = express.Router()
const contribution = require("../models/contribution.model");
const upload = require("../middleware/cloudinaryUpload");
const cloudinary = require("../middleware/cloudinary");
const multer = require("multer");
const path = require("path");

module.exports = function (app) {

   apiRouter.post("/add-contribution", upload.single("profileUrl"), async (req, res) => {
  try {
    const {name} = req.body;
  
    const existing = await contribution.findOne({ name });
    if (existing) {
      return res.status(200).json({
        message: " profile already exists!",
      });
    }

   
    const profileUrl = req.file ? req.file.path : "";

   
    const data = new contribution({
     name,
     profileUrl
    });

    await data.save();

    res.status(200).json({
      message: "Contribution created successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


  apiRouter.get("/get-contribution", async(req,res) =>{
    try {
        const data = await contribution.find();
        res.status(200).json({message:"support fetched successfully",data});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

 apiRouter.post("/update-contribution",upload.single("profileUrl"),async (req, res) => {
    try {
      const {
        _id,
        name
     
      } = req.body;

      
      const support = await contribution.findOne({ _id });
      if (!support) {
        return res.status(404).json({ message: "support with this id not found" });
      }

      
      if (name) support.name = name;
     

     
      if (req.file) {
        // delete old image
        if (support.publicId) {
          await cloudinary.uploader.destroy(support.publicId);
        }

        // save new image
        support.profileUrl= req.file.path;        // Cloudinary URL
        support.publicId = req.file.filename; // Cloudinary public_id
      }

     
      await support.save();

      res.status(200).json({
        message: "support updated successfully!",
        data: support,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


apiRouter.post("/delete-contribution",async(req,res) =>
{
    try {
        const {_id} =req.body;
        const data = await contribution.findOneAndDelete({_id});
      

        if(!data){
            return res.status(200).json({message:"this id does't exist"});
        }

        return res.status(200).json({message:"contribution deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  

    app.use("/", apiRouter);

}