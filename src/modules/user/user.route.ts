import express from 'express';
import { auth } from '../../middlewares/auth';
import { getAllUsers, getSingleUser } from './user.controller';

export const userRouter = express.Router();

userRouter.route('/:id').get(auth(['admin']), getSingleUser);

userRouter.route('/').get(auth(['admin']), getAllUsers);
