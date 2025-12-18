const express = require("express");

const apiRouter = express.Router()
const newcertificates = require("../models/certifications.model");




module.exports = function(app) {
    
 apiRouter.post("/create-certificate", async(req,res) =>{
            try {
                
             
    const {courseName,issueDate,validUpTo,candidateName,mentor} = req.body;



     const certificateId = "ENQ-" + Math.floor(1000 + Math.random() * 9000);

    const existing = await newcertificates.findOne({ candidateName });
        if (existing) {
          return res.status(200).json({
            message: "condidate's certificate  already exists!",
          });
        }
    
      
   
    const data = new newcertificates({certificateId,courseName,issueDate,validUpTo,candidateName,mentor})
    await data.save();
    

    
    res.status(200).json({message: "Certificate added successfully!",data});
  
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log(error.message);
    }

  });

  apiRouter.get("/get-certificates", async(req,res) =>{
    try {
        const alldata = await newcertificates.find();
        res.status(200).json({message:"All certificates fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

  apiRouter.post("/get-certificateById", async(req,res) =>{
    try {

       const {certificateId} =req.body;
        const data = await newcertificates.find({certificateId});
        res.status(200).json({message:" certificate  data fetched successfully",data});
    } catch (error) {
        res.status(500).json({message:"Invalid Certificate Number!"});
    }
  });



  apiRouter.post("/update-certificateData", async(req,res) =>{
       try {
      const {certificateId,courseName,issueDate,validUpTo,candidateName,mentor}= req.body;
  
      
      const certificateData = await newcertificates.findOne({ certificateId });
      if (!certificateData) {
        return res.status(404).json("this ID not found");
      }
  
  
      // Update fields
      if (courseName) certificateData.courseName = courseName;
      if (issueDate) certificateData.issueDate = issueDate;
      if (validUpTo) certificateData.validUpTo = validUpTo;
      if (candidateName) certificateData.candidateName = candidateName;
      if (mentor) certificateData.mentor = mentor;
      
  
      await certificateData.save();
  
      res.status(200).json({
        message: "Data updated successfully!",
        data: certificateData,
      });
  
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  




apiRouter.post("/delete-certificate",async(req,res) =>
{
    try {
        const {certificateId} =req.body;
        const certificatedata = await newcertificates.findOneAndDelete({certificateId});


        if(!certificatedata){
            return res.status(200).json({message:"this ID does't exist"});
        }

        return res.status(200).json({message:"Certificate data deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  


    app.use("/",apiRouter);
}