import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../errors';
import { JwtPayload } from '../interfaces';

const secret = process.env.JWT_SECRET as string;

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) throw new Unauthorized('Token not found');

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    const { role } = payload;
    req.body.role = role;
    return next();
  } catch (err) {
    throw new Unauthorized('Token must be a valid token');
  }
}
