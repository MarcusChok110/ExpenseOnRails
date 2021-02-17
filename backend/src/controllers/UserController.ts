import { Request, Response } from 'express';
import User from '../models/User';
import RestController, {
  createFailure,
  createSuccess,
  failures,
} from './index';
import bcrypt from 'bcryptjs';

class UserController implements RestController {
  async index(req: Request, res: Response) {
    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    return res.json(
      createSuccess({
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          account: user.account,
          _id: user._id,
        },
      })
    );
  }

  /**
   * Unused: use auth register route instead
   */
  create(_req: Request, res: Response) {
    return res.json(failures.UNIMPLEMENTED);
  }

  /**
   * Get information about one user (excluding passwords)
   */
  async show(req: Request, res: Response) {
    const { _id } = req.params;

    if (!_id) return res.json(createFailure('Bad request: No User Id'));

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    if (user._id != _id) return res.json(failures.UNAUTHORIZED);

    return res.json(
      createSuccess({
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          account: user.account,
        },
      })
    );
  }

  /**
   * Update email, firstName, lastName, or password fields of user instance
   */
  async update(req: Request, res: Response) {
    const { _id } = req.params;

    if (!_id) return res.json(createFailure('Bad request: No User Id'));

    if (!req.user) return res.json(failures.BAD_USER);

    const user = await User.findOne({ email: req.user.email }).exec();

    if (!user) return res.json(failures.NO_USER);

    if (user._id != _id) return res.json(failures.UNAUTHORIZED);

    const { email, password, firstName, lastName } = req.body.user;

    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    let passwordUpdated = false;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!hashedPassword) {
        return res.json(createFailure('Could not hash password'));
      }

      passwordUpdated = true;
      user.password = hashedPassword;
    }

    try {
      await user.save();
      return res.json(
        createSuccess({
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            account: user.account,
            _id: user._id,
            passwordUpdated,
          },
        })
      );
    } catch (error) {
      return res.json(createFailure('Could not save user', { error }));
    }
  }

  /**
   * Unused: use auth delete route instead
   */
  destroy(_req: Request, res: Response) {
    return res.json(failures.UNIMPLEMENTED);
  }
}

export default UserController;
