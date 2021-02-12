import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Account from '../models/Account';
import Transaction, {
  ITransaction,
  validateFields,
} from '../models/Transaction';
import User from '../models/User';
import RestController from './Controller';

class TransactionController implements RestController {
  /**
   * Returns all transactions for the given user
   */
  async index(req: Request, res: Response) {
    // check if user object is in the request
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: 'Bad request: No User' });
    }

    const user = await User.findOne({ email: req.user.email }).exec();

    if (user) {
      const account = await Account.findById(user.account)
        .populate('transactions')
        .exec();

      if (account) {
        return res.json({ success: true, transactions: account.transactions });
      } else {
        return res.json({ success: false, message: 'Account not found' });
      }
    } else {
      return res.json({ success: false, message: 'User not found' });
    }
  }

  /**
   * Create a new transaction in the database
   */
  async create(req: Request, res: Response) {
    let transFields: ITransaction = req.body.transaction;

    if (!validateFields(transFields)) {
      return res.json({
        success: false,
        message: 'Bad request: Invalid fields',
        fields: transFields,
      });
    }

    if (!req.user) {
      return res.json({ success: false, message: 'Bad request: No User' });
    }

    const user = await User.findOne({ email: req.user.email }).exec();

    if (user) {
      const account = await Account.findById(user.account).exec();

      if (account) {
        const newTransaction = new Transaction({
          ...transFields,
          account: account._id,
          _id: new mongoose.Types.ObjectId(),
        });

        account.transactions.push(newTransaction._id);

        try {
          await account.save();
          await newTransaction.save();
          return res.json({
            success: true,
            message: 'Saved successfully',
            transaction: newTransaction._id,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Could not save account or transaction',
            error,
          });
        }
      } else {
        return res.json({ success: false, message: 'Account not found' });
      }
    } else {
      return res.json({ success: false, message: 'User not found' });
    }
  }

  /**
   * Return a single transaction from its id in the route params
   */
  async show(req: Request, res: Response, next: NextFunction) {}

  /**
   * Update a transaction from its id in the route params
   */
  async update(req: Request, res: Response, next: NextFunction) {}

  /**
   * Delete a transaction from the database from its id in the route params
   */
  async destroy(req: Request, res: Response, next: NextFunction) {}
}

export default TransactionController;
