import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboarsService from '../services/LeaderboardService';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboarsService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getBoard(req, res),
);

leaderboardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getBoard(req, res),
);

leaderboardRouter.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getBoard(req, res),
);

export default leaderboardRouter;
