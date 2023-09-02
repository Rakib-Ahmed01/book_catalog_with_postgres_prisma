import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { loginUser, refreshToken, registerUser } from './auth.controller';
import {
  loginUserZodSchema,
  refreshTokenZodSchema,
  registerUserZodSchema,
} from './auth.validation';

export const authRouter = express.Router();

authRouter.post(
  '/signup',
  validateRequest(registerUserZodSchema),
  registerUser,
);

authRouter.post('/signin', validateRequest(loginUserZodSchema), loginUser);

authRouter.get(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  refreshToken,
);
