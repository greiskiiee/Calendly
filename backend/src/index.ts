import express, { json } from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { companyRouter } from '../router/company';
import { orderRouter } from '../router/order';
import { connectMongoDB } from './connectDb';
import { serviceRouter } from '../router/service';
import { authRouter } from '../router/auth';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    // origin: 'http://localhost:3000',
  })
);
app.use(json());

connectMongoDB();
console.log('yes');

app.use('/company', companyRouter);
app.use('/order', orderRouter);
app.use('/service', serviceRouter);
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(8000, () => {
  console.log(`server running at http://localhost:8000`);
});
