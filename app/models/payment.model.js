const mongoose = require("mongoose");


const NewPayment = mongoose.Schema({
    razorpayOrderId:{
       type: String,
      allowNull: true 
    },
    razorpaySignature:{
       type: String,
      allowNull: true 
    },
    razorpayPaymentId:{
       type: String,
      allowNull: true 
    },
    paymentMethod:{
       type: String,
      allowNull: true ,
      defaultValue:'razorpay'
    },
    paymentStatus:{
       type: String,
      allowNull: true ,
      defaultValue:'success'
    },
    purpose:{
       type: String,
      allowNull: true 
      
    },
    donorName:{
       type: String,
      allowNull: true 
    },
    donorEmail:{
       type: String,
      allowNull: true 
    },
    amount:{
       type: String,
      allowNull: true 
    }

},{
        timestamps:true
    }
    
);
const Payments = mongoose.model("newpayment",NewPayment);
module.export = Payments;
