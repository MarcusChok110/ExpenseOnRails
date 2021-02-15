import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Account from '../models/Account';
import Transaction, {
  ITransaction,
  validateFields,
} from '../models/Transaction';
import User from '../models/User';
import RestController, {
  failures,
  createFailure,
  createSuccess,
} from './index';

class TransactionController implements RestController {
  /**
   * Returns all transactions for the given user
   */
  async index(req: Request, res: Response) {
    // check if user object is in the request
    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const account = await Account.findById(user.account)
      .populate('transactions')
      .exec();

    if (!account) return res.json(failures.NO_ACCOUNT);

    return res.json(createSuccess({ transactions: account.transactions }));
  }

  /**
   * Create a new transaction in the database
   */
  async create(req: Request, res: Response) {
    const transFields: ITransaction = req.body.transaction;

    if (!validateFields(transFields)) {
      return res.json(
        createFailure('Bad request: Invalid fields', { fields: transFields })
      );
    }

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const account = await Account.findById(user.account).exec();

    if (!account) return res.json(failures.NO_ACCOUNT);

    const newTransaction = new Transaction({
      ...transFields,
      account: account._id,
      _id: new mongoose.Types.ObjectId(),
    });

    account.transactions.push(newTransaction._id);

    try {
      await account.save();
      await newTransaction.save();
      return res.json(createSuccess({ transaction: newTransaction._id }));
    } catch (error) {
      return res.json(
        createFailure('Could not save account or transaction', { error })
      );
    }
  }

  /**
   * Return a single transaction from its id in the route params
   */
  async show(req: Request, res: Response, next: NextFunction) {
    const transactionId = req.body.transaction;

    if (!req.body.transaction) {
      return res.json(createFailure('Bad request: No Transaction Id'));
    }

    const transaction = await Transaction.findById(transactionId).exec();

    if (!transaction) return res.json(createFailure('Transaction not found'));

    return res.json(createSuccess({ transaction }));
  }

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
