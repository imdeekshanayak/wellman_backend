const express = require("express");

const apiRouter = express.Router()
const NewMember = require("../models/members.model");
// const upload= require("../middleware/upload.middleware")



module.exports = function(app) {
    
 apiRouter.post("/createMember", async(req,res) =>{
            try {
                
             
    const {name,email,designation,contactNo} = req.body;


    const existing = await NewMember.findOne({ email });
        if (existing) {
          return res.status(400).json({
            message: "An member with this email already exists!",
          });
        }
    
        // Generate unique enquiry ID (E.G. ENQ-4829)
        const memberId = "ENQ-" + Math.floor(1000 + Math.random() * 9000);

     

   
    const data = new NewMember({memberId,name,email,designation,contactNo})
    await data.save();
    

    
    res.status(200).json({message: "Member added successfully!",data});
  
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log(error.message);
    }

  });

  apiRouter.get("/getMember", async(req,res) =>{
    try {
        const alldata = await NewMember.find();
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });

  apiRouter.post("/updateMember", async(req,res) =>{
     try {
    const {name,email,designation,contactNo,memberId} = req.body;

    
    const member = await NewMember.findOne({ memberId });
    if (!member) {
      return res.status(404).json("member not found");
    }


    // Update fields
    if (name) NewMember.name = name;
    if (email) NewMember.email = email;
    if (designation) NewMember.designation = designation;
    if (contactNo) NewMember.contactNo = contactNo;
    

    await NewMember.save();

    res.status(200).json({
      message: "Member updated successfully!",
      data: NewMember,
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
});


apiRouter.post("/deleteMember",async(req,res) =>
{
    try {
        const {memberId} =req.body;
        const member = await NewMember.findOneAndDelete({memberId});


        if(!member){
            return res.status(200).json({message:"this member does't exist"});
        }

        return res.status(200).json({message:"Member deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  


    app.use("/",apiRouter);
}