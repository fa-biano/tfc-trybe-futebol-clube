import { Router, Request, Response, NextFunction } from 'express';
import { MatchController } from '../controllers';
import auth from '../middlewares/Auth';
import { MatchService } from '../services';

const matchRouter = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
matchRouter.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => auth(req, res, next),
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => auth(req, res, next),
  (req: Request, res: Response) => matchController.updateMatchGoals(req, res),
);

matchRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => auth(req, res, next),
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default matchRouter;
