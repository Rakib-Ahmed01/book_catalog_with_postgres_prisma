import { JwtPayload } from './JwtPayload';

declare module 'express' {
  export interface Request {
    jwtPayload?: JwtPayload;
  }
}
