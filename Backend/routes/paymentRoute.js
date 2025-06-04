import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto"; // ✅ required for signature verification
import paymentModels from "../models/paymentModel.js";
import mongoose from "mongoose"; // ✅ required for MongoDB connection
import { Course} from "../models/course.model.js"; // ✅ required for course model
import { User } from "../models/user.model.js";


dotenv.config(); // ✅ ensure environment variables are loaded

const paymentRoute = express.Router();

//  Initialize Razorpay with env variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  Route to create a Razorpay order
paymentRoute.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
// console.log("amount", amount);
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

//  Route to verify payment and store in DB
paymentRoute.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      contact,
      amount,
      courseId,
      userId,
    } = req.body;
    //  console.log("razorpay_order_id", contact);
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      //  Save payment details in MongoDB
      await paymentModels.create({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        amount,
        email,
        contact:contact,
        name,
        status: "success",  
      });
        
              const payments = await paymentModels.findOne({});
              const isPayment = payments._id;
             
               const course = await Course.findByIdAndUpdate(courseId, { isPayment: isPayment ,status:true}, { new: true });
               const user  = await User.findById(userId);
              //  console.log("userssss", user);
               if(user){
                user.enrolledCourses.push({
                  courseId: courseId,  // this must be a valid course _id
                  status: true
                });
                await user.save();
               }
               if(course){
                   course.enrolledStudents.push(userId);
                   await course.save();
                                   
                  
                   
                // course.lectures.push(lecture._id);
                //    await course.save();
               }
               // const course = await Course.findById(courseId);
               // if(course){
               //     console.log("coursesss", course);
               //  // course.lectures.push(lecture._id);
               //  //    await course.save();
               // }
             
      return res.status(200).json({ success: true, message: "Payment verified and saved." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment signature." });
    }
  } catch (err) {
    console.error("Verification Error:", err);
    return res.status(500).json({ success: false, message: "Payment verification failed." });
  }
});

export default paymentRoute;
