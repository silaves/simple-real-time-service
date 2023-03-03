import {Router} from 'express';
import {Schemas, ValidationSchemaMDW} from "../middleware/validationSchema";
import {ValidationId} from "../middleware/validationId";

export const ItemRoute = (ItemController) => {
  const router = Router();
  router.get('/', ItemController.get);
  router.get('/:id', ValidationId, ItemController.get);
  router.post('/', ValidationSchemaMDW(Schemas.item), ItemController.create.bind(ItemController),);
  router.patch('/:id', ValidationId, ItemController.update);
  router.delete('/:id', ValidationId, ItemController.delete);
  return router;
}
