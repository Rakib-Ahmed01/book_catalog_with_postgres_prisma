import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { createOrder, getAllOrders } from './order.controller';
import { createOrderZodSchema } from './order.validation';

export const orderRouter = express.Router();

orderRouter
  .route('/')
  .post(auth(['customer']), validateRequest(createOrderZodSchema), createOrder)
  .get(auth(['admin']), getAllOrders);
