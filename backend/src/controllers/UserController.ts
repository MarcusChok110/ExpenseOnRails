import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';

class UserController implements Controller {
  index(req: Request, res: Response, next: NextFunction) {}

  create(req: Request, res: Response, next: NextFunction) {}

  show(req: Request, res: Response, next: NextFunction) {}

  update(req: Request, res: Response, next: NextFunction) {}

  destroy(req: Request, res: Response, next: NextFunction) {}
}

export default UserController;
