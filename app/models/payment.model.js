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
    }
},{
        timestamps:true
    }
    
);
const Payments = mongoose.model("newpayment",NewPayment);
module.export = Payments;
