import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrdersByServiceId,
} from '../controllers/order';

export const orderRouter = express.Router();

orderRouter
  .post('/', createOrder as any)
  .get('/byservice/:serviceIdd', getOrdersByServiceId as any)
  .get('/:id', getOrderById as any)
  .put('/update/:id', updateOrderStatus as any)
  .delete('/:id', deleteOrder as any);
