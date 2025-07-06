import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto"; // ✅ required for signature verification
import paymentModels from "../models/paymentModel.js";
import mongoose from "mongoose"; // ✅ required for MongoDB connection
import { Course } from "../models/course.model.js"; // ✅ required for course model
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/mailer.js";

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
        contact: contact,
        name,
        status: "success",
      });

      const payments = await paymentModels.findOne({});
      const isPayment = payments._id;

      const course = await Course.findByIdAndUpdate(
        courseId,
        { isPayment: isPayment, status: true },
        { new: true }
      );
      const user = await User.findById(userId);
      //  console.log("userssss", user);
      if (user) {
        user.enrolledCourses.push({
          courseId: courseId, // this must be a valid course _id
          status: true,
        });
        await user.save();
      }
      if (course) {
        course.enrolledStudents.push(userId);
        await course.save();
      }
      // console.log("course", course);

      const message = `
Hi ${name},

Thank you for purchasing the course: "${course?.courseTitle}".

We’re excited to have you onboard! Your payment was successfully received, and you now have full access to the course content.

Here are your payment details:

- Payment ID: ${razorpay_payment_id}
- Order ID: ${razorpay_order_id}
- Amount Paid: ₹${amount}
- Date: ${new Date().toLocaleDateString()}

You can start learning anytime by visiting your course dashboard:

➡️ https://e-learning-emxs.onrender.com/course-detail/${courseId}

If you have any questions or need support, feel free to reply to this email.

Happy learning!  
The E-learning pvt ltd Team
`;

      await sendEmail({
        to: email,
        subject:"✅ Course Purchase Successful – Welcome to E-learning pvt ltd!",
        text:message
      });

     

      return res
        .status(200)
        .json({ success: true, message: "Payment verified and saved." });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature." });
    }
  } catch (err) {
    console.error("Verification Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Payment verification failed." });
  }
});

export default paymentRoute;
