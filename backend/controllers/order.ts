import { orderModel } from "../model/order";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const {
    clientName,
    clientPhone,
    selectedDate,
    selectedTime,
    serviceOrderItem,
    serviceInfo,
  } = req.body;
  try {
    const order = await orderModel.create({});
    return res.status(200).send({ success: true, Order: order }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};
