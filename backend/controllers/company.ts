import bcrypt from "bcrypt";
import { companyModel } from "../model/company";
import { Request, Response } from "express";

export const createCompany = async (req: Request, res: Response) => {
  const {
    companyName,
    logo,
    email,
    phoneNumber,
    address,
    password,
    about,
    category,
    socialUrls,
    services,
  } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);
  try {
    const company = await companyModel.create({
      companyName,
      logo,
      email,
      phoneNumber,
      address,
      password: hashedPass,
      about,
      category,
      socialUrls,
      services,
    });
    return res.status(200).send({ success: true, company: company }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};

export const updateCompanyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    companyName,
    logo,
    email,
    phoneNumber,
    address,
    password,
    about,
    category,
    socialUrls,
    services,
  } = req.body;
  try {
    const response = await companyModel.updateOne({
      where: { id: Number(id) },
      data: {
        companyName,
        logo,
        email,
        phoneNumber,
        address,
        password,
        about,
        category,
        socialUrls,
        services,
      },
    });
    return res.send({ success: true, message: response });
  } catch (error) {
    return res.send(error);
  }
};

export const deleteComponayById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await companyModel.deleteOne({
      where: { id: Number(id) },
    });
    return res.send({
      success: true,
      message: "Company deleted",
      data: response,
    });
  } catch (error) {
    return res.send(error);
  }
};
