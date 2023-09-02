import { z } from 'zod';

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    author: z.string({
      required_error: 'Author is required',
      invalid_type_error: 'Author must be a string',
    }),
    genre: z.string({
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be a string',
    }),
    price: z.number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
      invalid_type_error: 'Publication date must be a string',
    }),
    categoryId: z.string({
      required_error: 'Category ID is required',
      invalid_type_error: 'Category ID must be a string',
    }),
  }),
});

export const updateBookZodSchema = createBookZodSchema.partial();
