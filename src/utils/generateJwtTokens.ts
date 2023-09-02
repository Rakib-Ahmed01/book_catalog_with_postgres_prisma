import jwt from 'jsonwebtoken';
import env from '../config';
import { JwtPayload } from '../types/JwtPayload';

export const generateJwtTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, env.accessTokenSecret, {
    expiresIn: '365d',
  });

  const refreshToken = jwt.sign(payload, env.refreshTokenSecret, {
    expiresIn: '365d',
  });

  return { accessToken, refreshToken };
};
