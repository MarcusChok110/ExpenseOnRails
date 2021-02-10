import { Router } from 'express';
import RestController from '../controllers/Controller';

/**
 * Maps the basic rest routes (index, create, show, update, destroy) to
 * router using the functions provided by the controller object
 *
 * @param router Express Router to map routes to
 * @param controller RestController instance containing methods
 */
const mapRoutes = (router: Router, controller: RestController): void => {
  router.get('/', controller.index);
  router.post('/', controller.create);
  router.get('/:id', controller.show);
  router.put('/:id', controller.update);
  router.delete('/id', controller.destroy);
};

export default { mapRoutes };
