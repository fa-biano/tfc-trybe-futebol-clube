import { Request, Response } from 'express';
import { IServiceLeaderboard } from '../interfaces';

class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async getBoard(req: Request, res: Response) {
    const statistcs = await this._service.getBoard(req.path);
    return res.status(200).json(statistcs);
  }
}

export default LeaderboardController;
