import ILogin from './ILogin';

export default interface IServiceLogin {
  getLogin(login: ILogin):Promise<string>
}
