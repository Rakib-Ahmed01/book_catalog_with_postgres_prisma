import { z } from 'zod';
import { validateEmail } from '../../utils/validateEmail';

export const roles = ['customer', 'admin'] as const;

export const registerUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(6, 'Password must be at least 6 characters long'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .refine(validateEmail, 'Please provide a valid email'),
    contactNo: z.string({
      required_error: 'Contact number is required',
      invalid_type_error: 'Contact number must be string',
    }),
    address: z.string({
      required_error: 'Address is required',
      invalid_type_error: 'Address must be string',
    }),
    profileImg: z.string({
      required_error: 'Profile image is required',
      invalid_type_error: 'Profile image must be string',
    }),
    role: z.enum(roles, {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be a string',
    }),
  }),
});

export const loginUserZodSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(6, 'Password must be at least 6 characters long'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .refine(validateEmail, 'Invalid email'),
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
      invalid_type_error: 'Refresh Token must be a string',
    }),
  }),
});
