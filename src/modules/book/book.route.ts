import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from './book.controller';
import { createBookZodSchema } from './book.validation';

export const bookRouter = express.Router();

bookRouter
  .route('/:id')
  .get(auth(['admin']), getSingleBook)
  .patch(auth(['admin']), updateBook)
  .delete(auth(['admin']), deleteBook);

bookRouter
  .route('/')
  .post(validateRequest(createBookZodSchema), auth(['admin']), createBook)
  .get(getAllBooks);
