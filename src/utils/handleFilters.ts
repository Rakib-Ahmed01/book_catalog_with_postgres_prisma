import { BookFilterOptions } from '../types/FilterOptions';

export const handleBookFilter = (
  filters: Omit<BookFilterOptions, 'search'>,
) => {
  const filterObj = {} as Record<string, unknown>;
  const { author, genre, maxPrice, minPrice, title } = filters;

  if (Object.keys(filters).length === 0) {
    return filterObj;
  }

  if (author) {
    filterObj['author'] = {
      contains: author,
      mode: 'insensitive',
    };
  }

  if (title) {
    filterObj['title'] = {
      contains: title,
      mode: 'insensitive',
    };
  }

  if (genre) {
    filterObj['genre'] = {
      contains: genre,
      mode: 'insensitive',
    };
  }

  if (maxPrice) {
    filterObj.price = {
      lte: +maxPrice,
    };
  }

  if (minPrice) {
    filterObj.price = {
      gte: +minPrice,
    };
  }

  return filterObj;
};
