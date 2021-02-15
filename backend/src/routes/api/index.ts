import express from 'express';
import RestController, { controllers } from '../../controllers/index';

// combined router for export
const router = express.Router();

// rest routers
const userRouter = express.Router();
const accountRouter = express.Router();
const transactionRouter = express.Router();

mapRoutes(userRouter, controllers.userController);
mapRoutes(accountRouter, controllers.accountController);
mapRoutes(transactionRouter, controllers.transactionController);

router.use('/users', userRouter);

router.use('./accounts', accountRouter);

router.use('./transactions', transactionRouter);

export default router;

/**
 * Maps the basic rest routes (index, create, show, update, destroy) to
 * router using the functions provided by the controller object
 *
 * @param router Express Router to map routes to
 * @param controller RestController instance containing methods
 */
function mapRoutes(router: express.Router, controller: RestController): void {
  router.get('/', controller.index);
  router.post('/', controller.create);
  router.get('/:id', controller.show);
  router.put('/:id', controller.update);
  router.delete('/id', controller.destroy);
}
