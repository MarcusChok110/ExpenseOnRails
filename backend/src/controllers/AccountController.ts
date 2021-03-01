import { Request, Response } from 'express';
import Account from '../models/Account';
import User from '../models/User';
import stringEquals from '../utils/stringEquals';
import RestController, {
  createFailure,
  createSuccess,
  failures,
} from './index';

class AccountController implements RestController {
  /**
   * Unused: use auth login route instead
   */
  index(_req: Request, res: Response) {
    return res.json(failures.UNIMPLEMENTED);
  }

  /**
   * Unused: use auth register route instead
   */
  create(_req: Request, res: Response) {
    return res.json(failures.UNIMPLEMENTED);
  }

  /**
   * Returns information on user account using _id in route params
   */
  async show(req: Request, res: Response) {
    const { _id } = req.params;

    if (!_id) return res.json(createFailure('Bad request: No Account Id'));

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const account = await Account.findById(_id).exec();

    if (!account) return res.json(failures.NO_ACCOUNT);

    if (!stringEquals(user.account, account._id)) {
      return res.json(failures.UNAUTHORIZED);
    }

    return res.json(createSuccess({ account }));
  }

  /**
   * Update user account information using _id in route params
   */
  async update(req: Request, res: Response) {
    const { _id } = req.params;

    if (!req.body.account) {
      return res.json(createFailure('Bad request: no account fields'));
    }

    if (!_id) return res.json(createFailure('Bad request: No Account Id'));

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    const account = await Account.findById(_id).exec();

    if (!account) return res.json(failures.NO_ACCOUNT);

    if (!stringEquals(user.account, account._id)) {
      return res.json(failures.UNAUTHORIZED);
    }

    const { categories, balance, budget, expenses } = req.body.account;

    if (categories) account.categories = categories;
    if (balance) account.balance = balance;
    if (budget) account.budget = budget;
    if (expenses) account.expenses = expenses;

    try {
      await account.save();
      return res.json(createSuccess({ account }));
    } catch (error) {
      return res.json(createFailure('Could not save account', { error }));
    }
  }

  /**
   * Unused: use auth delete route instead
   */
  destroy(_req: Request, res: Response) {
    return res.json(failures.UNIMPLEMENTED);
  }
}

export default AccountController;
