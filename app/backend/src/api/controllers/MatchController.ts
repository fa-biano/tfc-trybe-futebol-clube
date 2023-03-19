import { Request, Response } from 'express';
import { IServiceMatch } from '../interfaces';

class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    let matches;
    if (inProgress) {
      const query = inProgress.toString();
      matches = await this._service.getByProgress(query);
    } else {
      matches = await this._service.getAll();
    }

    return res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this._service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._service.updateMatchGoals(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json({ message: 'Match Updated' });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await this._service.createMatch({
      homeTeamId: Number(homeTeamId),
      awayTeamId: Number(awayTeamId),
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
    });

    return res.status(201).json(newMatch);
  }
}

export default MatchController;
