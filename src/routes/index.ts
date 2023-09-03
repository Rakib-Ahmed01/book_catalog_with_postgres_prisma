import express, { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { bookRouter } from '../modules/book/book.route';
import { categoryRouter } from '../modules/category/category.route';
import { orderRouter } from '../modules/order/order.route';
import { profileRouter } from '../modules/profile/profile.route';
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
    router: categoryRouter,
  },
  {
    path: '/books',
    router: bookRouter,
  },
  {
    path: '/orders',
    router: orderRouter,
  },
  {
    path: '/profile',
    router: profileRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));
