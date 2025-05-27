import mongoose from 'mongoose';
import { serviceModel } from '../model/service';
import { Request, Response } from 'express';

export const createService = async (req: Request, res: Response) => {
  const { companyId, serviceName, serviceInfo, servicePrice, serviceTime } =
    req.body;
  try {
    const service = await serviceModel.create({
      companyId: companyId,
      serviceName: serviceName,
      serviceInfo: serviceInfo,
      servicePrice: servicePrice,
      serviceTime: serviceTime,
    });
    return res.status(200).send({ success: true, company: service }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const getServicesByCompanyId = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  try {
    const servicesByCompanyId = await serviceModel.find({
      companyId: companyId,
    });
    // .populate('companyId');

    return res
      .status(200)
      .send({ success: true, servicesByCompanyId: servicesByCompanyId })
      .end();
  } catch (error) {
    console.error(error, 'error');
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const updateService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { companyId, serviceName, serviceInfo, servicePrice, serviceTime } =
    req.body;
  try {
    // const serviceUpdate = await serviceModel.updateOne({
    //   where: { id: Number(id) },
    //   data: {
    //     companyId,
    //     serviceName,
    //     serviceInfo,
    //     servicePrice,
    //     serviceTime,
    //   },
    // });
    const serviceUpdate = await serviceModel.findByIdAndUpdate(serviceId, {
      companyId,
      serviceName,
      serviceInfo,
      servicePrice,
      serviceTime,
    });
    return res.send({ success: true, message: serviceUpdate });
  } catch (error) {
    return res.send(error);
  }
};

export const deleteServiceByServiceId = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  try {
    const response = await serviceModel.deleteOne({
      _id: new mongoose.Types.ObjectId(serviceId),
    });
    return res.send({
      success: true,
      message: 'Service deleted',
      data: response,
    });
  } catch (error) {
    return res.send(error);
  }
};
