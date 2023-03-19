import { Request, Response } from 'express';
import { IServiceTeam } from '../interfaces';

class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async getAll(_req: Request, res:Response) {
    const result = await this._service.getAll();
    return res.status(200).json(result);
  }

  async getById(req: Request, res:Response) {
    const result = await this._service.getById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async create(req: Request, res:Response) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }
}

export default TeamController;
