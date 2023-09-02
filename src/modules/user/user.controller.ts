import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { IUser } from './user.interface';
import { getAllUsersService } from './user.services';

export const getAllUsers = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const users = await getAllUsersService();

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User retrieved successfully',
      success: true,
      data: users,
    });
  },
);
