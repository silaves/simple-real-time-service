import {Router} from 'express';

export const UserRoute = (userController) => {
  const router = Router();
  router.get('/', userController.get);
  router.get('/:id', userController.get);
  router.post('/', userController.create.bind(userController),);
  router.patch('/:id', userController.update);
  router.delete('/:id', userController.delete);
  return router;
}
