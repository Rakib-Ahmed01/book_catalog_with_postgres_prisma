export type JwtPayload = {
  role: 'admin' | 'customer';
  userId: string;
  iat?: number;
  exp?: number;
};
