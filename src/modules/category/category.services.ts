import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { ICategory } from './category.interface';

export const createCategoryService = async (category: ICategory) => {
  return await prisma.category.create({
    data: category,
  });
};

export const getAllCategoriesService = async () => {
  return await prisma.category.findMany();
};

export const getSingleCategoryService = async (id: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!category) {
    throwApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return category;
};

export const updateCategoryService = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  if (isEmptyObject(payload)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  }

  const category = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!category) {
    throwApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
};
