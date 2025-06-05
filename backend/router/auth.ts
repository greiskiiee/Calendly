import { Router } from 'express';
import { loginCompany, sendMailer, signupCompany } from '../controllers/auth';

export const authRouter = Router();
authRouter
  .post('/loginCompany', loginCompany as any)
  .post('/signupCompany', signupCompany as any)
  .get("/mail", sendMailer);
