import {Router} from 'express';
import {ValidationId} from "../middleware/validationId";
import {Schemas, ValidationSchemaMDW} from "../middleware/validationSchema";

export const ClientRoute = (clientController) => {
  const router = Router();
  router.get('/', clientController.get);
  router.get('/:id', ValidationId, clientController.get);
  router.post('/', ValidationSchemaMDW(Schemas.clientCreate), clientController.create.bind(clientController));
  router.patch('/:id', ValidationId, clientController.update);
  router.delete('/:id', ValidationId, clientController.delete);
  return router;
}
