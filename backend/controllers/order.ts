import { orderModel } from '../model/order';
import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  const { clientName, clientPhone, selectedDate, selectedTime, serviceId } =
    req.body;
  try {
    const order = await orderModel.create({
      clientName,
      clientPhone,
      selectedDate,
      selectedTime,
      serviceId,
      status: 'Pending',
    });
    return res.status(201).send({ success: true, order }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const getOrdersByServiceId = async (req: Request, res: Response) => {
  const { serviceIdd } = req.params;
  try {
    const ordersByServiceId = await orderModel.find({ serviceId: serviceIdd });
    return res.status(200).send({ success: true, ordersByServiceId }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id).populate('serviceId');
    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: 'Order not found' })
        .end();
    }
    return res.status(200).send({ success: true, order }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Canceled', 'Approved'].includes(status)) {
    return res
      .status(400)
      .send({
        success: false,
        message: 'Invalid status. Must be one of: Pending, Canceled, Approved',
      })
      .end();
  }

  try {
    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    // .populate('serviceId');

    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: 'Order not found' })
        .end();
    }

    return res.status(200).send({ success: true, order }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: 'Order not found' })
        .end();
    }
    return res
      .status(200)
      .send({
        success: true,
        message: 'Order deleted successfully',
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};
