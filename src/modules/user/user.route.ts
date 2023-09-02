import express from 'express';
import { auth } from '../../middlewares/auth';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './user.controller';

export const userRouter = express.Router();

userRouter
  .route('/:id')
  .get(auth(['admin']), getSingleUser)
  .patch(auth(['admin']), updateUser)
  .delete(auth(['admin']), deleteUser);

userRouter.route('/').get(auth(['admin']), getAllUsers);
