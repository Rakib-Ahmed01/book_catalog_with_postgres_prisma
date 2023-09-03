import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from '../../types/JwtPayload';
import { sendResponse } from '../../utils/sendResponse';
import { IUser } from '../user/user.interface';
import { getProfileService } from './profile.services';

export const getProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const jwtPayload = req.jwtPayload;
    const user = await getProfileService(jwtPayload as JwtPayload);

    sendResponse<Omit<IUser, 'password'>>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  },
);
