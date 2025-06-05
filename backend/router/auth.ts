import { Router } from 'express';
import { loginCompany, signupCompany } from '../controllers/auth';

export const authRouter = Router();
authRouter
  .post('/loginCompany', loginCompany as any)
  .post('/signupCompany', signupCompany as any);
