import express from "express";
import {
  createService,
  getServicesByCompanyId,
  updateServiceById,
  deleteServiceById,
} from "../controllers/service";

export const serviceRouter = express.Router();

serviceRouter
  .post("/", createService as any)
  .get("/company/:companyId", getServicesByCompanyId as any)
  .put("/:id", updateServiceById as any)
  .delete("/:id", deleteServiceById as any);