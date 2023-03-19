import { ILogin } from '../../interfaces';
import { BadRequest, Unauthorized } from '../../errors';

class LoginValidate {
  private static checkEmailAndPassword(email: string, password: string): void {
    if (!email || !password) {
      throw new BadRequest('All fields must be filled');
    }
  }

  private static validateEmail(email: string): void {
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      throw new Unauthorized('Invalid email or password');
    }
  }

  private static validatePassword(password: string): void {
    if (password.length < 6) {
      throw new Unauthorized('Invalid email or password');
    }
  }

  public static validateFields(login: ILogin): void {
    const { email, password } = login;
    LoginValidate.checkEmailAndPassword(email, password);
    LoginValidate.validateEmail(email);
    LoginValidate.validatePassword(password);
  }
}

export default LoginValidate;
