import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import Matches from '../database/models/MatchesModel';
import * as jwt from 'jsonwebtoken';
import { NewMatch } from '../api/interfaces';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a classe MatchController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('Se retorna todas as partidas', async function() {
    const mockedMatch: Matches = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
    } as Matches;

    const mockedReturn = [mockedMatch];

    sinon.stub(Model, 'findAll').resolves(mockedReturn);
    
    const response = await chai.request(testApp.app).get('/matches').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });

  it('Se finaliza partida em andamento', async function() {
    const mockedToken = 'mockedInvalidToken';

    sinon.stub(Model, 'update').resolves();
    sinon.stub(jwt, 'verify').resolves(mockedToken);
    
    const response = await chai.request(testApp.app)
      .patch('/matches/40/finish').set({ authorization: mockedToken})
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Se atualiza resultado de partida', async function() {
    const mockedToken = 'mockedInvalidToken';

    sinon.stub(Model, 'update').resolves();
    sinon.stub(jwt, 'verify').resolves(mockedToken);
    
    const response = await chai.request(testApp.app)
      .patch('/matches/40').set({ authorization: mockedToken})
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Match Updated' });
  });

  it('Se cria nova partida', async function() {
    const mockedMatch: NewMatch = {
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
    };

    const mockedReturn: Matches = { id: 1, ...mockedMatch, inProgress: true, } as Matches;
    const mockedToken = 'mockedInvalidToken';

    sinon.stub(Model, 'create').resolves(mockedReturn);
    sinon.stub(jwt, 'verify').resolves(mockedToken);
    
    const response = await chai.request(testApp.app)
      .post('/matches').set({ authorization: mockedToken})
      .send(mockedMatch);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });
})
