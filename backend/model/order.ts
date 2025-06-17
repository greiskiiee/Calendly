import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    default: '',
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
    enum: ['Pending', 'Canceled', 'Approved'],
    default: 'Pending',
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
  },
  orderCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const orderModel = mongoose.model('Order', orderSchema);
