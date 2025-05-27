import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order";

export const orderRouter = express.Router();

orderRouter
  .post("/", createOrder as any)
  .get("/", getOrders as any)
  .get("/:id", getOrderById as any)
  .put("/:id/status", updateOrderStatus as any)
  .delete("/:id", deleteOrder as any);
