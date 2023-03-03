import {Router} from 'express';
import {Schemas, ValidationSchemaMDW} from "../middleware/validationSchema";
import {ValidationId} from "../middleware/validationId";

export const CategoryRoute = (CategoryController) => {
  const router = Router();
  router.get('/', CategoryController.get);
  router.get('/:id', ValidationId, CategoryController.get);
  router.post('/', ValidationSchemaMDW(Schemas.category), CategoryController.create.bind(CategoryController));
  router.patch('/:id', ValidationId, CategoryController.update);
  router.delete('/:id', ValidationId, CategoryController.delete);
  return router;
}
