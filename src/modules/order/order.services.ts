import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { JwtPayload } from '../../types/JwtPayload';
import throwApiError from '../../utils/throwApiError';
import { IOrder } from './order.interface';

export const createOrderService = async (order: IOrder, userId: string) => {
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

export const getSingleOrderService = async (
  id: string,
  jwtPayload: JwtPayload,
) => {
  const order = await prisma.order.findFirst({
    where: {
      id,
    },
  });

  if (order.userId !== jwtPayload.userId) {
    throwApiError(StatusCodes.FORBIDDEN, 'Forbidden');
  }

  if (!order) {
    throwApiError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  return order;
};
