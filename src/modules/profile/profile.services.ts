import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { JwtPayload } from '../../types/JwtPayload';
import throwApiError from '../../utils/throwApiError';

export const getProfileService = async (jwtPayload: JwtPayload) => {
  const { userId } = jwtPayload;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throwApiError(StatusCodes.NOT_FOUND, 'Not found');
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...withoutPassword } = user;

  return withoutPassword;
};
