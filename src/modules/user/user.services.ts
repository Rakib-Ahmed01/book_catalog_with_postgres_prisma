import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { IUser } from './user.interface';

export const getAllUsersService = async () => {
  return await prisma.user.findMany();
};

export const getSingleUserService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};

export const updateUserService = async (
  id: string,
  payload: Partial<IUser>,
) => {
  if (isEmptyObject(payload)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  }

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
};
