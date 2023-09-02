import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
        params: req.params,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
