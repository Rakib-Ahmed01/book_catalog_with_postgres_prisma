import { registerUserZodSchema } from '../auth/auth.validation';

export const updateUserZodSchema = registerUserZodSchema.partial().strict();
