import prisma from '../../lib/prisma';
import { ICategory } from './category.interface';

export const createCategoryService = async (category: ICategory) => {
  return await prisma.category.create({
    data: category,
  });
};

export const getAllCategoriesService = async () => {
  return await prisma.category.findMany();
};
