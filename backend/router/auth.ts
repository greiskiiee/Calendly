import { Router } from 'express';
import { loginCompany } from '../controllers/auth';

export const authRouter = Router();
authRouter.post('/loginCompany', loginCompany as any);
