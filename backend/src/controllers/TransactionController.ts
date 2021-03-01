import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Account from '../models/Account';
import Transaction, {
  ITransaction,
  validateFields,
} from '../models/Transaction';
import User from '../models/User';
import stringEquals from '../utils/stringEquals';
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
    const transFields: ITransaction = req.body;

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
      return res.json(createSuccess({ transaction: { ...newTransaction } }));
    } catch (error) {
      return res.json(
        createFailure('Could not save account or transaction', { error })
      );
    }
  }

  /**
   * Return a single transaction from its id in the route params
   */
  async show(req: Request, res: Response) {
    const { _id } = req.params;

    if (!_id) return res.json(createFailure('Bad request: No Transaction Id'));

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const transaction = await Transaction.findById(_id).exec();

    if (!transaction) return res.json(failures.NO_TRANSACTION);

    if (!stringEquals(user.account, transaction.account)) {
      return res.json(failures.UNAUTHORIZED);
    }

    return res.json(createSuccess({ transaction }));
  }

  /**
   * Update a transaction from its id in the route params
   */
  async update(req: Request, res: Response) {
    const fields = req.body;
    const { _id } = req.params;

    if (!fields) {
      return res.json(createFailure('Bad request: no transaction fields'));
    }

    const { amount, category, date, description, title, type } = fields;

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const transaction = await Transaction.findById(_id).exec();

    if (!transaction) return res.json(failures.NO_TRANSACTION);

    if (!stringEquals(user.account, transaction.account)) {
      return res.json(failures.UNAUTHORIZED);
    }

    if (amount) transaction.amount = amount;
    if (category) transaction.category = category;
    if (date) transaction.date = date;
    if (description) transaction.description = description;
    if (title) transaction.title = title;
    if (type) transaction.type = type;

    try {
      await transaction.save();
      return res.json(createSuccess({ transaction }));
    } catch (error) {
      return res.json(createFailure('Could not save transaction', { error }));
    }
  }

  /**
   * Delete a transaction from the database from its id in the route params
   */
  async destroy(req: Request, res: Response) {
    const { _id } = req.params;

    if (!_id) return res.json(createFailure('Bad request: No Transaction Id'));

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const transaction = await Transaction.findById(_id).exec();

    if (!transaction) return res.json(failures.NO_TRANSACTION);

    if (!stringEquals(user.account, transaction.account)) {
      return res.json(failures.UNAUTHORIZED);
    }

    try {
      await transaction.remove();
      return res.json(
        createSuccess({ message: 'Transaction removed from database', _id })
      );
    } catch (error) {
      return res.json(createFailure('Could not delete transaction', { error }));
    }
  }
}

export default TransactionController;
