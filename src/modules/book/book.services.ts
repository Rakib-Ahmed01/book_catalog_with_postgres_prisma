import { StatusCodes } from 'http-status-codes';
import prisma from '../../lib/prisma';
import { BookFilterOptions } from '../../types/FilterOptions';
import { PaginationOptions } from '../../types/PaginationOption';
import { calculateSkip } from '../../utils/calculateSkip';
import { handleSearch } from '../../utils/handleSearch';
import { handleSortByAndSortOrder } from '../../utils/handleSortByAndSortOrder';
import { isEmptyObject } from '../../utils/isEmptyObject';
import throwApiError from '../../utils/throwApiError';
import { IBook } from './book.interface';

export const createBookService = async (book: IBook) => {
  return await prisma.book.create({
    data: book,
  });
};

export const getAllBooksService = async (
  paginationOption: PaginationOptions,
  filterOption: BookFilterOptions,
) => {
  const { page, size, skip } = calculateSkip(paginationOption);
  const { sortBy, sortOrder } = handleSortByAndSortOrder(paginationOption);
  const { search, ...filters } = filterOption;
  const searchCondition = handleSearch(search, ['author', 'title', 'genre']);

  console.log({ page, size, skip, sortBy, sortOrder, search, filters });

  return await prisma.book.findMany({
    include: {
      category: true,
    },
    take: size,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: {
      AND: [searchCondition],
    },
  });
};

export const getSingleBookService = async (id: string) => {
  const book = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!book) {
    throwApiError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  return book;
};

export const getBooksByCategoryService = async (categoryId: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throwApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
  });

  return books;
};

export const updateBookService = async (
  id: string,
  payload: Partial<IBook>,
) => {
  if (isEmptyObject(payload)) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  }

  const book = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!book) {
    throwApiError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  return await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteBookService = async (id: string) => {
  const book = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!book) {
    throwApiError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  return await prisma.book.delete({
    where: {
      id,
    },
  });
};
