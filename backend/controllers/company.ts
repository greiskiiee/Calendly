import bcrypt from 'bcrypt';
import { companyModel } from '../model/company';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// export const createCompany = async (req: Request, res: Response) => {
//   const {
//     companyName,
//     logo,
//     email,
//     phoneNumber,
//     address,
//     password,
//     about,
//     category,
//     socialUrls,
//   } = req.body;

//   const hashedPass = await bcrypt.hash(password, 10);
//   try {
//     const company = await companyModel.create({
//       companyName,
//       logo,
//       email,
//       phoneNumber,
//       address,
//       password: hashedPass,
//       about,
//       category,
//       socialUrls,
//     });
//     return res.status(200).send({ success: true, company: company }).end();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({ success: false, message: error }).end();
//   }
// };

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
    schedule,
  } = req.body;
  try {
    let updateData: any = {
      companyName,
      logo,
      email,
      phoneNumber,
      address,
      about,
      category,
      socialUrls,
      schedule,
    };
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      updateData.password = hashedPass;
    }
    const response = await companyModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('services'); // Populate services when fetching company
    return res.status(200).send({ success: true, message: response });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const deleteCompanyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await companyModel.deleteOne({ _id: id });
    return res.status(200).send({
      success: true,
      message: 'Company deleted',
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

// buh company medeele avch chadahgui error zaagaad bn
export const getCompanies = async (_: Request, res: Response) => {
  console.log('check2');
  try {
    const companies = await companyModel.find().select('-password');
    return res.status(200).send({ success: true, companies: companies }).end();
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

export const getCompanyById = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  try {
    const companyById = await companyModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(companyId) } },
      {
        $lookup: {
          from: 'services', // Service collection нэр
          localField: '_id',
          foreignField: 'companyId',
          as: 'services',
        },
      },
    ]);

    if (companyById.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    return res
      .status(200)
      .send({ success: true, companyInformationById: companyById })
      .end();
  } catch (error) {
    console.error(error, 'Aggregate error');
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};
