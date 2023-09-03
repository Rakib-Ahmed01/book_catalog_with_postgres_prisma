import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from '../../types/JwtPayload';
import { sendResponse } from '../../utils/sendResponse';
import { IOrder } from './order.interface';
import {
  createOrderService,
  getAllOrdersService,
  getSingleOrderService,
} from './order.services';

export const createOrder = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const jwtPayload = req.jwtPayload;
    const order = await createOrderService(
      req.body,
      jwtPayload?.userId as string,
    );

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Order created successfully',
      success: true,
      data: order as IOrder,
    });
  },
);

export const getAllOrders = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const jwtPayload = req.jwtPayload;
    const orders = await getAllOrdersService(jwtPayload as JwtPayload);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Orders retrieved successfully',
      success: true,
      data: orders as IOrder,
    });
  },
);

export const getSingleOrder = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const jwtPayload = req.jwtPayload;
    const order = await getSingleOrderService(id, jwtPayload as JwtPayload);

    sendResponse<IOrder>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Order retrieved successfully',
      success: true,
      data: order as IOrder,
    });
  },
);
