import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { createOrder, getAllOrders, getSingleOrder } from './order.controller';
import { createOrderZodSchema } from './order.validation';

export const orderRouter = express.Router();

orderRouter.post(
  '/create-order',
  auth(['customer']),
  validateRequest(createOrderZodSchema),
  createOrder,
);

orderRouter.get('/:id', auth(['admin', 'customer']), getSingleOrder);

orderRouter.route('/').get(auth(['admin', 'customer']), getAllOrders);
