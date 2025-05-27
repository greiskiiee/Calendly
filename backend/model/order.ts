import mongoose, { Schema } from "mongoose";

const serviceOrderItem = new mongoose.Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    default: "",
  },
  clientPhone: {
    type: Number,
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Canceled", "Approved"],
    default: "Pending",
  },
  serviceOrderItem: [serviceOrderItem],
  serviceInfo: {
    type: String,
  },
  orderCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const orderModel = mongoose.model("Order", orderSchema);
