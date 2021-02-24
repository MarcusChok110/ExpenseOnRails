import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Account from '../models/Account';
import mongoose from 'mongoose';
import { createFailure, createSuccess, failures } from '../controllers';
import Transaction from '../models/Transaction';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'test';

// Register route to create new User
router.post('/register', (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return next(err);

    User.findOne({ email: email }).then((user): any => {
      if (user) {
        // Make sure account doesn't already exist
        return res.json({
          success: false,
          message: 'An account with that email already exists',
          email,
        });
      }

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hashedPassword,
      });
      if (firstName) newUser.firstName = firstName;
      if (lastName) newUser.lastName = lastName;

      const newAccount = new Account({ _id: new mongoose.Types.ObjectId() });

      newUser.account = newAccount._id;
      newAccount.user = newUser._id;

      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        newAccount.save((err) => {
          if (err) {
            return next(err);
          }
          res.json({
            success: true,
            message: 'Your account has been created',
            email: newUser.email,
            account: newAccount,
          });
        });
      });
    });
  });
});

// Login route to authenticate User
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info): any => {
    if (err || !user) {
      return res.status(400).json({ success: false, ...info });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send(err);
      }
      const token = jwt.sign({ user }, JWT_SECRET);
      return res.json({ success: true, ...info, token });
    });
  })(req, res);
});

// Delete route to delete user account
router.delete(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.body)
      return res.json(createFailure('Bad request: No email / password'));

    const { email, password } = req.body;

    if (!req.user || req.user.email !== email) {
      return res.json(failures.BAD_USER);
    }

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) return res.json(failures.UNAUTHORIZED);

    const account = await Account.findById(user.account).exec();

    if (!account) return res.json(failures.NO_ACCOUNT);

    const transactions = await Transaction.find({
      account: account._id,
    }).exec();

    try {
      for (const transaction of transactions) {
        await transaction.delete();
      }
      await account.delete();
      await user.delete();
      return res.json(createSuccess({ user, account, transactions }));
    } catch (error) {
      return res.json(
        createFailure('Failed to delete user / account / transactions', {
          error,
        })
      );
    }
  }
);

// ping route for testing token validity
router.use(
  '/ping',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
  }
);

export default router;
