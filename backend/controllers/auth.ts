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
        // 1sec * 60 * 60 = 1 tsag
        expiresIn: 1000 * 60 * 60 * 24,
      });
      // console.log('1 working token...', token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
      // console.log('2 working token...', token);
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

export const signupCompany = async (req: Request, res: Response) => {
  const {
    companyName,
    logo,
    email,
    phoneNumber,
    address,
    password,
    about,
    category,
    schedule,
    socialUrls,
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
      schedule,
      socialUrls,
    });
    return res.status(200).send({ success: true, company: company }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error }).end();
  }
};
