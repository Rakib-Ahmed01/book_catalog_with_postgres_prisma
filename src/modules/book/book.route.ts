import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createBook,
  deleteCategory,
  getAllBooks,
  getSingleCategory,
  updateCategory,
} from './book.controller';
import { createBookZodSchema } from './book.validation';

export const bookRouter = express.Router();

bookRouter
  .route('/:id')
  .get(auth(['admin']), getSingleCategory)
  .patch(auth(['admin']), updateCategory)
  .delete(auth(['admin']), deleteCategory);

bookRouter
  .route('/')
  .post(validateRequest(createBookZodSchema), auth(['admin']), createBook)
  .get(getAllBooks);
