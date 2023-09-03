import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import env from '../config';
import { JwtPayload } from '../types/JwtPayload';
import throwApiError from '../utils/throwApiError';

export const auth = (roles: ('admin' | 'customer')[]) => {
  return expressAsyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!authHeader || !token) {
        throwApiError(StatusCodes.UNAUTHORIZED, 'Missing Bearer Token');
      }

      let decodedData = {} as JwtPayload;

      try {
        decodedData = jwt.verify(token, env.accessTokenSecret) as JwtPayload;
        req.jwtPayload = decodedData;
      } catch (error) {
        throwApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized Access');
      }

      if (roles.includes('admin') && decodedData.role === 'admin') {
        return next();
      }

      if (roles.includes('customer') && decodedData.role === 'customer') {
        return next();
      }

      if (!roles.includes('customer') && decodedData.role === 'customer') {
        return throwApiError(StatusCodes.FORBIDDEN, 'Forbidden Access');
      }

      if (!roles.includes('admin') && decodedData.role === 'admin') {
        return throwApiError(StatusCodes.FORBIDDEN, 'Forbidden Access');
      }
    },
  );
};

// ['admin']
// ['customer']
// ['admin', 'customer']
