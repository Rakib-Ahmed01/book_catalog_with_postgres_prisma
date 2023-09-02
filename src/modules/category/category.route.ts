import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { createCategory, getAllCategories } from './category.controller';
import { createCategoryZodSchema } from './category.validation';

export const categoryrouter = express.Router();

// userRouter
//   .route('/:id')
//   .get(auth(['admin']), getSingleUser)
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
