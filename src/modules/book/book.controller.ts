import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { ICategory } from '../category/category.interface';
import { IBook } from './book.interface';
import {
  createBookService,
  deleteCategoryService,
  getAllCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
} from './book.services';

export const createBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const book = await createBookService(req.body);

    sendResponse<IBook>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Book created successfully',
      success: true,
      data: book,
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
      data: category,
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
