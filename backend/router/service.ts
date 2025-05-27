import express from 'express';
import {
  createService,
  deleteServiceByServiceId,
  getServicesByCompanyId,
  updateService,
} from '../controllers/service';
import { updateCompanyById } from '../controllers/company';
// import {} from "../controllers/company";

export const serviceRouter = express.Router();

serviceRouter
  .post('/', createService as any)
  .put('/:serviceId', updateService as any)
  .get('/:companyId', getServicesByCompanyId as any)
  .delete('/:serviceId', deleteServiceByServiceId as any);
