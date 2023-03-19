import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/', (req: Request, res: Response) => teamController.getAll(req, res));
teamRouter.get('/:id', (req: Request, res: Response) => teamController.getById(req, res));
teamRouter.post('/', (req: Request, res: Response) => teamController.create(req, res));

export default teamRouter;
