import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { ICategory } from '../category/category.interface';
import { IBook } from './book.interface';

export const createBookService = async (book: IBook) => {
  return await prisma.book.create({
    data: book,
  });
};

export const getAllBooksService = async () => {
  return await prisma.book.findMany();
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

export const deleteCategoryService = async (id: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!category) {
    throwApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  return await prisma.category.delete({
    where: {
      id,
    },
  });
};
