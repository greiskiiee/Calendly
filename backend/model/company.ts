import mongoose from "mongoose";
import { ref } from "process";
import { scheduler } from "timers/promises";

const TimeTableSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"],
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, "Must be in HH:mm format"],
  },
  closingTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, "Must be in HH:mm format"],
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

const socialmediaUrl = new mongoose.Schema({
  url: {
    type: String,
    default: "",
  },
  urlName: {
    type: String,
    default: "",
  },
});

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{8}$/, "Phone number must be 8 digits"],
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  about: {
    type: String,
    default: "",
  },
  category: {
    type: String,
  },
  schedule: {
    type: [TimeTableSchema],
    required: true,
  },
  socialUrls: [socialmediaUrl],
});

export const companyModel = mongoose.model("Company", companySchema);
