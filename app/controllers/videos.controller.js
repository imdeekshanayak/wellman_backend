const express = require("express");
const apiRouter = express.Router()
const Videos = require("../models/videos.model");
// const upload= require("../middleware/upload.middleware")



module.exports = function (app) {

    apiRouter.post("/add-video", async (req, res) => {
        try {


            const { title, youtubeUrl } = req.body;

            const data = new Videos({ title, youtubeUrl })
            await data.save();



            res.status(200).json({ message: "Video added successfully!", data });

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error.message);
        }

    });

    apiRouter.get("/get-video", async (req, res) => {
        try {
            const alldata = await Videos.find();
            res.status(200).json({ message: "Videos fetched successfully", alldata });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


    apiRouter.post("/update-video", async(req,res) =>{
     try {
    const { _id,title,youtubeUrl } = req.body;

    
    const video = await Videos.findOne({ _id });
    if (!video) {
      return res.status(404).json("This video not found");
    }


    
    if (title) video.title = title;
    if (youtubeUrl) video.youtubeUrl = youtubeUrl;
    
    

    await video.save();

    res.status(200).json({
      message: "data updated successfully!",
      data: video,
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
});


apiRouter.post("/delete-video",async(req,res) =>
{
    try {
        const { _id } = req.body;
        const video = await Videos.findOneAndDelete({_id});


        if(!video){
            return res.status(200).json({message:"this title does't exist"});
        }

        return res.status(200).json({message:"video deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})



app.use("/",apiRouter);

}