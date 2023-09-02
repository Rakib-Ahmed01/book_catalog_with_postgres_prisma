import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from './category.controller';
import { createCategoryZodSchema } from './category.validation';

export const categoryRouter = express.Router();

categoryRouter
  .route('/:id')
  .get(auth(['admin']), getSingleCategory)
  .patch(auth(['admin']), updateCategory)
  .delete(auth(['admin']), deleteCategory);

categoryRouter
  .route('/')
  .post(
    validateRequest(createCategoryZodSchema),
    auth(['admin']),
    createCategory,
  )
  .get(getAllCategories);
