import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import env from '../../config';
import prisma from '../../lib/prisma';
import { generateJwtTokens } from '../../utils/generateJwtTokens';
import throwApiError from '../../utils/throwApiError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';

export const registerUserService = async (user: IUser) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (userExists) {
    throwApiError(StatusCodes.CONFLICT, 'User already exists with the email');
  }

  user.password = await bcrypt.hash(user.password, 10);

  const createdUser = await prisma.user.create({
    data: user,
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...withoutPassword } = createdUser;

  return withoutPassword;
};

export const loginUserService = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, `User not found`);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throwApiError(StatusCodes.UNAUTHORIZED, 'Incorrect password');
  }

  const { accessToken, refreshToken } = generateJwtTokens({
    role: user.role,
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  let decodedData = {} as {
    name: string;
    email: string;
    _id: Schema.Types.ObjectId;
  };

  try {
    decodedData = jwt.verify(refreshToken, env.refreshTokenSecret) as {
      email: string;
      _id: Schema.Types.ObjectId;
      name: string;
    };
  } catch (error) {
    throwApiError(StatusCodes.FORBIDDEN, 'Invalid token');
  }

  const { _id, email } = decodedData;

  const user = await User.findOne({ _id, email });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, `User not found`);
  }

  const { accessToken, refreshToken: newRefreshToken } = generateJwtTokens({
    email,
    _id,
  });

  return { accessToken, newRefreshToken };
};
