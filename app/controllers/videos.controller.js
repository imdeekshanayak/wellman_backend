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

      app.use("/", apiRouter);


}