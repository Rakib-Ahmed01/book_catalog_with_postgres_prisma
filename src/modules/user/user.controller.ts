import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { IUser } from './user.interface';
import { getAllUsersService, getSingleUserService } from './user.services';

export const getAllUsers = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const users = await getAllUsersService();

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Users retrieved successfully',
      success: true,
      data: users,
    });
  },
);

export const getSingleUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getSingleUserService(id);

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  },
);
