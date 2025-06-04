// //!this file not use any where in that time
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllpayment } from "../controllers/coursePurchase.controller.js";
// import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus,razorpayWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/payment").get(isAuthenticated,getAllpayment);
// router.route("/webhook").post(express.raw({type:"application/json"}), razorpayWebhook);
// router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

// router.route("/").get(isAuthenticated,getAllPurchasedCourse);

export default router;