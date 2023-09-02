import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { GenericErrorMessage } from '../types/GenericErrorMessage';
import { ValidationErrorResponse } from '../types/ValidationErrorResponse';

export const handlePrismaClientError = (
  error: Prisma.PrismaClientKnownRequestError,
): ValidationErrorResponse => {
  const errors: GenericErrorMessage[] = [];

  if (error.code === 'P2002') {
    ((error?.meta?.target as []) || []).map((path: string) => {
      errors.push({
        path,
        message: `${path} already exists`,
      });
    });
  }

  if (error.code === 'P2025') {
    errors.push({
      path: '',
      message: (error.meta?.cause as string) || 'Record not found!',
    });
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation')) {
      errors.push({
        path: '',
        message: 'Delete failed. Refrential error.',
      });
    } else if (error.message.includes('create()` invocation')) {
      errors.push({
        path: '',
        message: 'Invalid foreign key',
      });
    }
  }

  return {
    status: StatusCodes.BAD_REQUEST,
    message: 'Bad Request',
    errors: errors,
  };
};
