import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
} from './category.controller';
import { createCategoryZodSchema } from './category.validation';

export const categoryrouter = express.Router();

categoryrouter.route('/:id').get(auth(['admin']), getSingleCategory);
//   .patch(auth(['admin']), updateUser)
//   .delete(auth(['admin']), deleteUser);

categoryrouter
  .route('/')
  .post(
    validateRequest(createCategoryZodSchema),
    auth(['admin']),
    createCategory,
  )
  .get(getAllCategories);
