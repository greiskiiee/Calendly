import mongoose from 'mongoose';
import { ref } from 'process';
import { scheduler } from 'timers/promises';

const timeTable = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'],
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

const socialmediaUrl = new mongoose.Schema({
  url: {
    type: String,
    default: '',
  },
  urlName: {
    type: String,
    default: '',
  },
});

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    default: '',
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 8,
    default: '',
  },
  address: {
    type: String,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    default: '',
  },
  about: {
    type: String,
    default: '',
  },
  category: {
    type: String,
  },
  schedule: {
    type: [timeTable],
    required: true,
  },
  socialUrls: [socialmediaUrl],
});

export const companyModel = mongoose.model('Company', companySchema);
