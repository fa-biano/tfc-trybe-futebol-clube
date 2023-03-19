import { Router, Request, Response, NextFunction } from 'express';
import { LoginController } from '../controllers';
import auth from '../middlewares/Auth';
import { LoginService } from '../services';

const loginRouter = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', (req: Request, res: Response) => loginController.getLogin(req, res));
loginRouter.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => auth(req, res, next),
  (req: Request, res: Response) => loginController.getLoginRole(req, res),
);

export default loginRouter;
