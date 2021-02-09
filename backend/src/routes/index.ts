import express from 'express';
import userRouter from './userRouter';

const router = express.Router();

// Map REST routes to routers
router.use('/users', userRouter);

export default router;
