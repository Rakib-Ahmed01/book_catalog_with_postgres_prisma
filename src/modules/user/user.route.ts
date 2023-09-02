import express from 'express';
import { auth } from '../../middlewares/auth';
import { getAllUsers, getSingleUser, updateUser } from './user.controller';

export const userRouter = express.Router();

userRouter
  .route('/:id')
  .get(auth(['admin']), getSingleUser)
  .patch(auth(['admin']), updateUser);

userRouter.route('/').get(auth(['admin']), getAllUsers);
