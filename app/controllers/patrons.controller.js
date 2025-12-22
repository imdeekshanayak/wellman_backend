const express = require("express");

const apiRouter = express.Router()
const Patrons = require("../models/patrons.model")
const upload = require("../middleware/cloudinaryUpload")
const cloudinary = require("../middleware/cloudinary");



module.exports = function(app) {
    
apiRouter.post("/createPatrons",upload.single("profileImage"), async (req, res) => {
    try {
      const { name, email, designation, contactNo } = req.body;

      if (!name || !email || !designation || !contactNo) {
        return res.status(400).json({
          message: "All required fields must be provided"
        });
      }

      // Check duplicate email
      const existing = await Patrons.findOne({ email });
      if (existing) {
        return res.status(400).json({
          message: "A member with this email already exists!"
        });
      }

      // Generate unique patronId
      const patronId = "PTRN-" + Math.floor(1000 + Math.random() * 9000);

      // Get uploaded image path
      const profileImage = req.file ? req.file.path : "";

      // Save member
      const data = new Patrons({
        patronId,
        name,
        email,
        designation,
        contactNo,
        profileImage
      });

      await data.save();

      res.status(200).json({
        message: "Member added successfully!",
        data
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error.message);
    }
  }
);

apiRouter.get("/getPatrons", async(req,res) =>{
    try {
        const alldata = await Patrons.find();
        res.status(200).json({message:"data fetched successfully",alldata});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

apiRouter.post("/updatePatrons",upload.single("profileImage"),async (req, res) => {
    try {
      const { name, email, designation, contactNo, patronId } = req.body;

      if (!patronId) {
        return res.status(400).json({ message: "memberId is required" });
      }

      const member = await Patrons.findOne({ patronId });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      // Update fields only if provided
      if (name) member.name = name;
      if (email) member.email = email;
      if (designation) member.designation = designation;
      if (contactNo) member.contactNo = contactNo;

      // Update image if uploaded
      if (req.file) {
        member.profileImage = req.file.path;
      }

      await member.save();

      res.status(200).json({
        message: "Member updated successfully!",
        data: member
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

apiRouter.post("/deletePatrons", async (req, res) => {
  try {
    const { patronId } = req.body;

    if (!memberId) {
      return res.status(400).json({ message: "memberId is required" });
    }

    const member = await Patrons.findOneAndDelete({ patronId });

    if (!member) {
      return res.status(404).json({
        message: "Member does not exist"
      });
    }

    return res.status(200).json({
      message: "Member deleted successfully",
      data: member
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

    app.use("/",apiRouter);
}