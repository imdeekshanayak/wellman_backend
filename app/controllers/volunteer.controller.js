const express = require("express");

const apiRouter = express.Router()
const NewVolunteer = require("../models/volunteer.model");
// const upload= require("../middleware/upload.middleware")



module.exports = function(app) {
    
 apiRouter.post("/createVolunteer", async(req,res) =>{
            try {
                
             
    const {name,email,designation,contactNo} = req.body;

   const existing = await NewVolunteer.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "An volunteer with this email already exists!",
      });
    }

    // Generate unique enquiry ID (E.G. ENQ-4829)
    const volunteerId = "ENQ-" + Math.floor(1000 + Math.random() * 9000);
   
    const data = new NewVolunteer({volunteerId,name,email,designation,contactNo})
    await data.save();

    res.status(200).json({message: "volunteer added successfully!",data});
  
    } catch (error) {
        res.status(500).json(error);
    }

  });

  apiRouter.get("/getVolunteer", async(req,res) =>{
    try {
        const alldata = await NewVolunteer.find();
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

  apiRouter.post("/updateVolunteer", async(req,res) =>{
     try {
    const {name,email,designation,contactNo} = req.body;

    
    const volunteer = await NewVolunteer.findOne({ volunteerId });
    if (!volunteer) {
      return res.status(404).json("volunteer not found");
    }


    // Update fields
    if (name) NewVolunteer.name = name;
    if (email) NewVolunteer.email = email;
    if (designation) NewVolunteer.designation = designation;
    if (contactNo) NewVolunteer.contactNo = contactNo;
    

    await NewVolunteer.save();

    res.status(200).json({
      message: "Member updated successfully!",
      data: NewVolunteer,
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
});


apiRouter.post("/deleteVolunteer",async(req,res) =>
{
    try {
        const {volunteerId} =req.body;
        const volunteer = await NewMember.findOneAndDelete({volunteerId});


        if(!volunteer){
            return res.status(200).json({message:"this volunteer does't exist"});
        }

        return res.status(200).json({message:"volunteer deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  


    app.use("/",apiRouter);
}