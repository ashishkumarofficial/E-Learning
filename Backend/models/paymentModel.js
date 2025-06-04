import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  email: String,
  contact: String,
  name: String,
  status: { type: String, default: "pending" },
}, { timestamps: true });

const paymentModels = mongoose.model("paymentModels", PaymentSchema);

export default paymentModels;
