import express from 'express';
import { auth } from '../../middlewares/auth';

export const profileRouter = express.Router();

profileRouter.route('/').get(auth(['admin', 'customer']));
