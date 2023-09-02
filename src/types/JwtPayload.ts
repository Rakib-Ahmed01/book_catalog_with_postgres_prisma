export type JwtPayload = {
  role: 'admin' | 'customer';
  userId: string;
};
