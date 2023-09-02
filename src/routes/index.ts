import express, { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { userRouter } from '../modules/user/user.routes';

export const router = express.Router();

type Route = {
  path: `/${string}`;
  router: Router;
};

const routes: Route[] = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/users',
    router: userRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));
