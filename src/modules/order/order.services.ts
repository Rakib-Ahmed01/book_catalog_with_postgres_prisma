import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { JwtPayload } from '../../types/JwtPayload';
import throwApiError from '../../utils/throwApiError';
import { IOrder } from './order.interface';

export const createOrderService = async (order: IOrder, userId: string) => {
  console.log({ order: order });
  return await prisma.order.create({
    data: {
      userId,
      orderedBooks: order.orderedBooks,
    },
  });
};

export const getAllOrdersService = async (jwtPayload: JwtPayload) => {
  const { role, userId } = jwtPayload;
  if (role === 'admin') return await prisma.order.findMany();

  return await prisma.order.findMany({
    where: {
      userId,
    },
  });
};

export const getSingleOrderService = async (id: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id,
    },
  });

  if (!order) {
    throwApiError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return order;
};
