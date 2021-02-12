import { Request, Response, NextFunction } from 'express';

/** Type of Express middleware functions */
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

/** Interface for REST Controllers */
interface RestController {
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

export default RestController;
