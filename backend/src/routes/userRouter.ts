import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const controller = new UserController();

// Map REST Routes to Express Router
router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/id', controller.destroy);

export default router;
