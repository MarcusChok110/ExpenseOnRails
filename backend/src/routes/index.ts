import express from 'express';
import ExpenseController from '../controllers/ExpenseController';
import UserController from '../controllers/UserController';
import RestRouter from './RestRouter';
import authRouter from './authRouter';

// Initialize routers for each resource
const router = express.Router();
const userRouter = express.Router();
const expenseRouter = express.Router();

// Create controllers for each router
const userController = new UserController();
const expenseController = new ExpenseController();

// Map REST routes to routers
RestRouter.mapRoutes(userRouter, userController);
RestRouter.mapRoutes(expenseRouter, expenseController);

// Configure custom behaviours
userRouter.use('/:userId/expenses', expenseRouter);

// Wrap all routes in one router
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
