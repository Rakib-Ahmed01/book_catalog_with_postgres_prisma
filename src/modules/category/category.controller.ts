import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { ICategory } from './category.interface';
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
} from './category.services';

export const createCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const category = await createCategoryService(req.body);

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Category created successfully',
      success: true,
      data: category,
    });
  },
);

export const getAllCategories = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await getAllCategoriesService();

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Categories retrieved successfully',
      success: true,
      data: categories,
    });
  },
);

export const getSingleCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await getSingleCategoryService(id);

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Category retrieved successfully',
      success: true,
      data: category as ICategory,
    });
  },
);

export const updateCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCategory = await updateCategoryService(id, req.body);

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.OK,
      message: 'Category updated successfully',
      success: true,
      data: updatedCategory,
    });
  },
);

export const deleteCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await deleteCategoryService(id);

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.OK,
      message: 'Category deleted successfully',
      success: true,
      data: deletedCategory,
    });
  },
);
