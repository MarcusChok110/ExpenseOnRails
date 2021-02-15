import express from 'express';
import authRouter from './auth';
import apiRouter from './api';
import passport from 'passport';

// Initialize routers for each resource
const router = express.Router();

// Wrap all routes in one router
router.use('/auth', authRouter);
router.use('/api', passport.authenticate('jwt', { session: false }), apiRouter);

export default router;
