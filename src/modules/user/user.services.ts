import prisma from '../../lib/prisma';

export const getAllUsersService = () => {
  return prisma.user.findMany();
};

export const getSingleUserService = (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};
