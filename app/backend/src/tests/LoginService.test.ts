import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
import { ILogin } from '../api/interfaces';
import { LoginService } from '../api/services';
import User from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';

const { expect } = chai;

describe('Testa a classe LoginService', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Se realiza login com usuario existente', async function() {
    const mockedLogin: ILogin = { email: 'tfc@projeto.com', password: 'secret_admin' };
    const mockedReturn: User = new User({
      id: 1,
      email: 'tfc@projeto.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      role: 'user',
      username: 'tfc_user',
    });
    const mockedToken = 'mockedInvalidToken';
    
    sinon.stub(Model, 'findOne').resolves(mockedReturn);
    sinon.stub(jwt, 'sign').resolves(mockedToken);

    const service = new LoginService();
    const result = await service.getLogin(mockedLogin);

    expect(result).to.be.deep.equal(mockedToken);
  });
})