import { Prisma } from '@prisma/client';
import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type IUser = Prisma.UserCreateInput;

export type UserModel = Model<TUser>;
