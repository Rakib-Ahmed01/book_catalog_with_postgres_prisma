import prisma from '../../lib/prisma';
import { ICategory } from './category.interface';

export const createCategoryService = async (category: ICategory) => {
  return await prisma.category.create({
    data: category,
  });
};
