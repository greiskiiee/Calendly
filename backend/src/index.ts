
import express, { json } from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { companyRouter } from '../router/company';
import { orderRouter } from '../router/order';
import { connectMongoDB } from './connectDb';
import { serviceRouter } from '../router/service';

const app = express();

app.use(cors());
app.use(json());

connectMongoDB();
console.log('yes');

app.use('/company', companyRouter);
app.use('/order', orderRouter);
app.use('/service', serviceRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(8000, () => {
  console.log(`server running at http://localhost:8000`);
});
