import express, { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { categoryrouter } from '../modules/category/category.route';
import { userRouter } from '../modules/user/user.route';

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
  {
    path: '/categories',
    router: categoryrouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));
