import {Router} from 'express';

export const AuthRoute = (authController) => {
  const router = Router();
  router.post('/sign-in', authController.signIn);
  router.post('/sign-up', authController.signUp);
  return router;
}
