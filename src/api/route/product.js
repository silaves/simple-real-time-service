import {Router} from 'express';
import {ValidationId} from "../middleware/validationId";
import {Schemas, ValidationSchemaMDW} from "../middleware/validationSchema";

export const ProductRoute = (productController) => {
  const router = Router();
  router.get('/', productController.get);
  router.get('/:id', ValidationId, productController.get);
  router.post('/', ValidationSchemaMDW(Schemas.productCreate), productController.create.bind(productController));
  router.patch('/:id', ValidationId, productController.update);
  router.delete('/:id', ValidationId, productController.delete);
  return router;
}
