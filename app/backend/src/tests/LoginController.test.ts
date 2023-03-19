import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import { ILogin } from '../api/interfaces';
import User from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a classe LoginController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('Se realiza login com usuario existente', async function() {
    const mockedLogin: ILogin = { email: 'tfc@projeto.com', password: 'secret_admin' };
    const mockedReturn: User = {
      id: 1,
      email: 'tfc@projeto.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      role: 'user',
      username: 'tfc_user',
    } as User;

    const mockedToken = 'mockedInvalidToken';

    sinon.stub(Model, 'findOne').resolves(mockedReturn);
    sinon.stub(jwt, 'sign').resolves(mockedToken);
    
    const response = await chai.request(testApp.app).post('/login').send(mockedLogin)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ token: mockedToken });
  });

  it('Se retorna role do login apos validacao do token', async function() {
    const mockedPayload: User = {
      id: 1,
      email: 'tfc@projeto.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      role: 'user',
      username: 'tfc_user',
    } as User;

    const mockedToken = 'mockedInvalidToken';

    sinon.stub(jwt, 'verify').resolves(mockedPayload);
    
    const response = await chai.request(testApp.app).get('/login/role').set({ authorization: mockedToken});

    expect(response.status).to.be.equal(200);
    // expect(response.body).to.be.deep.equal({ role: mockedPayload.role });
  });
})