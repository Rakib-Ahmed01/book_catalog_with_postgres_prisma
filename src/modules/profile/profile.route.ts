import express from 'express';
import { auth } from '../../middlewares/auth';
import { getProfile } from './profile.controller';

export const profileRouter = express.Router();

profileRouter.route('/').get(auth(['admin', 'customer']), getProfile);
