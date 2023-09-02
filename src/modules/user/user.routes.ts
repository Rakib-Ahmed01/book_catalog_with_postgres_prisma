import express from 'express';
import { auth } from '../../middlewares/auth';
import { getAllUsers } from './user.controller';

export const userRouter = express.Router();

userRouter.route('/').get(auth(['admin', 'customer']), getAllUsers);
