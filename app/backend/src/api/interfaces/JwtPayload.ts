import IUser from './IUser';

type JwtPayload = Omit<IUser, 'password'>;

export default JwtPayload;
