import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { ICategory } from '../category/category.interface';
import { IBook } from './book.interface';
import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBooksByCategoryService,
  getSingleBookService,
  updateBookService,
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

export const getAllBooks = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const books = await getAllBooksService();

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Books retrieved successfully',
      success: true,
      data: books,
    });
  },
);

export const getBooksByCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const books = await getBooksByCategoryService(categoryId);

    sendResponse<ICategory>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Books with associated category data fetched successfully',
      success: true,
      data: books,
    });
  },
);

export const getSingleBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await getSingleBookService(id);

    sendResponse<IBook>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Book retrieved successfully',
      success: true,
      data: book,
    });
  },
);

export const updateBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedBook = await updateBookService(id, req.body);

    sendResponse<IBook>(res, {
      statusCode: StatusCodes.OK,
      message: 'Book updated successfully',
      success: true,
      data: updatedBook,
    });
  },
);

export const deleteBook = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedBook = await deleteBookService(id);

    sendResponse<IBook>(res, {
      statusCode: StatusCodes.OK,
      message: 'Book deleted successfully',
      success: true,
      data: deletedBook,
    });
  },
);
