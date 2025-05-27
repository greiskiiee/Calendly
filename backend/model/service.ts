import mongoose, { Schema } from "mongoose";

const serviceSchema = new mongoose.Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  serviceName: {
    type: String,
    default: "",
  },
  servicePrice: {
    type: Number,
  },
  serviceInfo: {
    type: String,
    default: "",
  },
  serviceTime: {
    type: Number,
  },
});

export const serviceModel = mongoose.model("Service", serviceSchema);
