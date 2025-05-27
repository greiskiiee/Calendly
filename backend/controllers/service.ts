import { Request, Response } from "express";
import { serviceModel } from "../model/service";

export const createService = async (req: Request, res: Response) => {
  const { companyId, serviceName, servicePrice, serviceInfo, serviceTime } = req.body;
  try {
    const service = await serviceModel.create({
      companyId,
      serviceName,
      servicePrice,
      serviceInfo,
      serviceTime,
    });
    return res.status(200).send({ success: true, service }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const getServicesByCompanyId = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  try {
    const services = await serviceModel.find({ companyId });
    return res.status(200).send({ success: true, services }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const updateServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { serviceName, servicePrice, serviceInfo, serviceTime } = req.body;
  try {
    const service = await serviceModel.findByIdAndUpdate(
      id,
      {
        serviceName,
        servicePrice,
        serviceInfo,
        serviceTime,
      },
      { new: true }
    );
    return res.status(200).send({ success: true, service }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const deleteServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await serviceModel.findByIdAndDelete(id);
    return res.status(200).send({ success: true, message: "Service deleted successfully" }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
}; 