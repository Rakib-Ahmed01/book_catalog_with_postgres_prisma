import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import env from '../../config';
import prisma from '../../lib/prisma';
import { JwtPayload } from '../../types/JwtPayload';
import { exlcudeFields } from '../../utils/excludeFields';
import { generateJwtTokens } from '../../utils/generateJwtTokens';
import throwApiError from '../../utils/throwApiError';
import { IUser } from '../user/user.interface';

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

  return exlcudeFields(createdUser, ['password']);
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
  let decodedData = {} as JwtPayload;

  try {
    decodedData = jwt.verify(
      refreshToken,
      env.refreshTokenSecret,
    ) as JwtPayload;
  } catch (error) {
    throwApiError(StatusCodes.FORBIDDEN, 'Invalid token');
  }

  const { role, userId } = decodedData;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, `User not found`);
  }

  const { accessToken, refreshToken: newRefreshToken } = generateJwtTokens({
    role,
    userId,
  });

  return { accessToken, newRefreshToken };
};
