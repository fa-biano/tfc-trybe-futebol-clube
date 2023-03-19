import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/UserModel';
import { Unauthorized } from '../errors';
import { ILogin, IServiceLogin, JwtPayload } from '../interfaces';
import tokenGenerate from '../utils/tokenGenerate';
import LoginValidate from './validations/LoginValidate';

class LoginService implements IServiceLogin {
  protected model: ModelStatic<User> = User;

  async getLogin(login: ILogin): Promise<string> {
    LoginValidate.validateFields(login);

    const { email, password } = login;
    const loginDb = await this.model.findOne({ where: { email } });

    if (!loginDb) throw new Unauthorized('Invalid email or password');

    const { id, username, role, password: passwordDB } = loginDb;
    const isValidPassword = bcrypt.compareSync(password, passwordDB);
    if (!isValidPassword) throw new Unauthorized('Invalid email or password');

    const payload: JwtPayload = {
      id,
      email,
      username,
      role,
    };

    const token = tokenGenerate(payload);
    return token;
  }
}

export default LoginService;
