import { PaginationOptions } from '../types/PaginationOption';

export const calculateSkip = (
  paginationOptions: Pick<PaginationOptions, 'size' | 'page'>,
) => {
  const { page, size } = paginationOptions;
  const numberedPage = Number(page) || 1;
  const numberedPageSize = Number(size) || 10;
  const skip = (numberedPage - 1) * numberedPageSize;
  return { page: numberedPage, skip, size: numberedPageSize };
};
