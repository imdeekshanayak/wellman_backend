const express = require("express");
const apiRouter = express.Router()

const Razorpay = require("razorpay");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const payments = require("../models/payment.model");




module.exports = function(app) {

    
        const razorpay = new Razorpay({
               key_id: process.env.RAZORPAY_KEY_ID,
               key_secret: process.env.RAZORPAY_KEY_SECRET,
         });
    

    console.log("Key_id",process.env.RAZORPAY_KEY_ID );
    
 apiRouter.post("/createPayment", async (req, res) => {
  try {
    const { amountInINR,amount,donorEmail,donorName,purpose } = req.body; // ₹

    const options = {
      amount: amountInINR * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


 apiRouter.post("/verifyPayment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const payment = await payments.create({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentMethod: "razorpay",
      paymentStatus: "success",
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });

  } catch (err) {
    console.error("Payment verification failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
    app.use("/",apiRouter);
}
