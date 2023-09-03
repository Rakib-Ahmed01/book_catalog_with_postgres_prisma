import { z } from 'zod';

export const createOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'Book id is required',
          invalid_type_error: 'Book id must be a string',
        }),
        quantity: z.number({
          required_error: 'Quantity is required',
          invalid_type_error: 'Quantity must be a number',
        }),
      }),
    ),
  }),
});
