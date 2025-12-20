const express = require("express");

const apiRouter = express.Router()
const Service = require("../models/services.model");
const upload = require("../middleware/cloudinaryUpload")
// const upload= require("../middleware/upload.middleware")
const cloudinary = require("../middleware/cloudinary");
const multer = require("multer");
const path = require("path");


module.exports = function(app) {
    
 apiRouter.post(
  "/create-service",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { heading, description, link } = req.body;

      const existing = await Service.findOne({ heading });
      if (existing) {
        return res.status(400).json({
          message: "A service with this heading already exists!",
        });
      }

      const icon = req.files?.icon ? req.files.icon[0].path : "";
      const image = req.files?.image ? req.files.image[0].path : "";

      const data = new Service({ icon, image, heading, description, link });
      await data.save();

      res.status(200).json({
        message: "Services created successfully!",
        data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);



  apiRouter.get("/get-service", async(req,res) =>{
    try {
        const alldata = await Service.find();
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

apiRouter.post(
  "/update-service",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { _id, heading, description, link } = req.body;

      const data = await Service.findById(_id);
      if (!data) {
        return res.status(404).json({ message: "Service not found" });
      }

      if (heading) data.heading = heading;
      if (description) data.description = description;
      if (link) data.link = link;

      if (req.files?.icon) {
        data.icon = req.files.icon[0].path;
      }

      if (req.files?.image) {
        data.image = req.files.image[0].path;
      }

      await data.save();

      res.status(200).json({
        message: "Service updated successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

apiRouter.post("/delete-service",async(req,res) =>
{
    try {
        const {_id} =req.body;
        const data = await Service.findOneAndDelete({_id});
     

        if(!data){
            return res.status(200).json({message:"this service does't exist"});
        }

        return res.status(200).json({message:"service deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  


    app.use("/",apiRouter);
}