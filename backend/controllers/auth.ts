import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import { companyModel } from "../model/company";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

configDotenv();
const secret_key = process.env.SECRET_KEY as string;

export const loginCompany = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const company = await companyModel.findOne({ email: email });
    console.log(company);
    if (company) {
      const isMatch = await bcrypt.compare(password, company.password);
      console.log(isMatch, "isMatch");
      if (!isMatch) {
        return res
          .status(404)
          .send({ success: false, message: "company pass or email incorrect" });
      }

      console.log(company, "company");
      const token = jwt.sign({ ...company }, secret_key, {
        expiresIn: 3600 * 24,
      });

      return res.status(200).send({ success: true, token });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "company not found" });
    }
  } catch (error) {
    // console.error(error, 'error');
    // return res
    //   .status(400)
    //   .send({
    //     success: false,
    //     message: error,
    //   })
    //   .end();
  }
};
