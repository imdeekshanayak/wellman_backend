const express = require("express");

const apiRouter = express.Router()
const Contact = require("../models/contact.model");
// const upload= require("../middleware/upload.middleware")



module.exports = function(app) {
    
 apiRouter.post("/contact-us", async(req,res) =>{
            try {
                
             
    const {firstName,lastName,email,donationTo,message} = req.body;


    const existing = await Contact.findOne({ email });
        if (existing) {
          return res.status(200).json({
            message: "An contact with this email already exists!",
          });
        }
    
      
   
    const data = new Contact({firstName,lastName,email,donationTo,message})
    await data.save();
    

    
    res.status(200).json({message: "Contact added successfully!",data});
  
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log(error.message);
    }

  });

  apiRouter.get("/get-contacts", async(req,res) =>{
    try {
        const alldata = await Contact.find();
        res.status(200).json({message:"Contacts fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
  });




apiRouter.post("/delete-contact",async(req,res) =>
{
    try {
        const {email} =req.body;
        const contacts = await Contact.findOneAndDelete({email});


        if(!contacts){
            return res.status(200).json({message:"this contact email does't exist"});
        }

        return res.status(200).json({message:"Contact deleted successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
})


  


    app.use("/",apiRouter);
}