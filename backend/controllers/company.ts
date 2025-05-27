import bcrypt from "bcrypt";
import { companyModel } from "../model/company.js";

export const createCompany = async (req, res) => {
  try {
    return res.status(200).send({ success: true }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};
