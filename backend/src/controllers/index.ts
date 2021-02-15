import { Request, Response, NextFunction } from 'express';
import TransactionController from './TransactionController';
import AccountController from './AccountController';
import UserController from './UserController';

// export controllers
const accountController = new AccountController();
const userController = new UserController();
const transactionController = new TransactionController();

export const controllers = {
  accountController,
  userController,
  transactionController,
};

/** Type of Express middleware functions */
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

/** Interface for REST Controllers */
export default interface RestController {
  /** GET /items to display a list of all items */
  index: Middleware;

  /** GET /items/new to show form to make new items */
  new?: Middleware;

  /** POST /items to add new item to database */
  create: Middleware;

  /** GET /items/:id to show info about one item */
  show: Middleware;

  /** GET /items/:id/edit to show edit form of one blog */
  edit?: Middleware;

  /** PUT /items/:id to update a particular item */
  update: Middleware;

  /** DELETE /items/:id to delete a particular item */
  destroy: Middleware;
}

/**
 * Returns an object with a success property set to false
 * @param message message property for client
 * @param options additional JSON to be returned in response
 */
export function createFailure(message: string, options?: object) {
  if (!options) {
    return {
      success: false,
      message,
    };
  }

  return {
    success: false,
    message,
    ...options,
  };
}

/**
 * Returns an object with a success property set to true
 * @param options additional JSON to be returned in response
 */
export function createSuccess(options?: object) {
  if (options) {
    return {
      success: true,
      ...options,
    };
  } else {
    return {
      success: true,
    };
  }
}

/**
 * Common failure objects
 */
export const failures = {
  BAD_USER: createFailure('Bad request: No User'),
  NO_USER: createFailure('User not found'),
  NO_ACCOUNT: createFailure('Account not found'),
  NO_TRANSACTION: createFailure('Transaction not found'),
  UNAUTHORIZED: createFailure('You are unauthorized to edit this transaction'),
  UNIMPLEMENTED: createFailure('Route unimplemented.'),
};
