import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces';

const secret = process.env.JWT_SECRET as string;

export default function tokenGenerate(payload: JwtPayload) {
  const token = jwt.sign(
    payload,
    secret,
    { expiresIn: '6h' },
  );

  return token;
}
