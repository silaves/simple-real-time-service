import {Router} from 'express';

export const ClientRoute = (clientController) => {
  const router = Router();
  router.get('/', clientController.get);
  router.get('/:id', clientController.get);
  router.post('/', clientController.create.bind(clientController),);
  router.patch('/:id', clientController.update);
  router.delete('/:id', clientController.delete);
  return router;
}
