import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { IUser } from './user.interface';

export const getAllUsersService = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      profileImg: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getSingleUserService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      profileImg: true,
      role: true,
      createdAt: true,
      updatedAt: true,
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
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      profileImg: true,
      role: true,
      createdAt: true,
      updatedAt: true,
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
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      profileImg: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      profileImg: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      profileImg: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
