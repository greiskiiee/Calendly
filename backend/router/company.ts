import express from "express";
import {
  // createCompany,
  updateCompanyById,
  deleteCompanyById,
  getCompanyById,
  getCompanies,
} from "../controllers/company";

export const companyRouter = express.Router();

companyRouter
  // .post('/', createCompany as any)
  .put("/:id", updateCompanyById as any)
  .delete("/:id", deleteCompanyById as any)
  .get("/allCompanies", getCompanies as any)
  .get("/:companyId", getCompanyById as any);
