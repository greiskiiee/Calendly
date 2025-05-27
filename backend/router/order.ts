import express from "express";
import { createOrder } from "../controllers/order";

export const orderRouter = express.Router();

orderRouter.post("/", createOrder as any);
