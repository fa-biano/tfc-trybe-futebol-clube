import { Request, Response } from 'express';
import { IServiceLogin } from '../interfaces';

class LoginController {
  private service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this.service = service;
  }

  async getLogin(req: Request, res:Response) {
    const token = await this.service.getLogin(req.body);
    return res.status(200).json({ token });
  }

  getLoginRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    return res.status(200).json({ role });
  };
}

export default LoginController;
