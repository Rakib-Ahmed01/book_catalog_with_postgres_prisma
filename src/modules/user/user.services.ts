import prisma from '../../lib/prisma';

export const getAllUsersService = () => {
  return prisma.user.findMany();
};
