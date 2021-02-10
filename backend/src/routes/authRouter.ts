import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'test';

// Register route to create new User
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email: email, password: hashedPassword });
    const saved = await user.save();

    if (saved === user) {
      res.json({ message: 'Your account has been created' });
    } else {
      return next(saved);
    }
  } catch (error) {
    return next(error);
  }
});

// Login route to authenticate User
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        message: 'Something went wrong',
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return res.send(err);

      const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '60m' });
      return res.json({ token, user });
    });
  });
});

// Logout route to end user session
router.get('/logout', (req) => req.logout());

export default router;
