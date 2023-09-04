import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  updateBook,
} from './book.controller';
import { createBookZodSchema } from './book.validation';

export const bookRouter = express.Router();

bookRouter.get('/:categoryId/category', getBooksByCategory);

bookRouter
  .route('/:id')
  .get(getSingleBook)
  .patch(auth(['admin']), updateBook)
  .delete(auth(['admin']), deleteBook);

bookRouter
  .route('/')
  .post(auth(['admin']), validateRequest(createBookZodSchema), createBook)
  .get(getAllBooks);
