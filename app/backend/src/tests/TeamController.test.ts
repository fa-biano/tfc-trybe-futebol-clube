import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import Team from '../database/models/TeamModel';
import { ITeam } from '../api/interfaces';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a classe TeamController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('Se retorna todos os times cadastrados', async function() {
    const team1: Team = { id: 1, teamName: 'Corintia' } as Team;
    const team2: Team = { id: 2, teamName: 'Vasco' } as Team;
    const mockedTeams = [team1, team2];

    sinon.stub(Model, 'findAll').resolves(mockedTeams);
    
    const response = await chai.request(testApp.app).get('/teams').send()

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedTeams);
  });

  it('Se retorna o time pelo id', async function() {
    const team1: Team = { id: 1, teamName: 'Corintia' } as Team;

    sinon.stub(Model, 'findByPk').resolves(team1);
    
    const response = await chai.request(testApp.app).get('/teams/:1').send()

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(team1);
  });

  // it('Se retorna erro quando o id do time nao existir', async function() {
  //   sinon.stub(Model, 'findByPk').resolves(null);
    
  //   const response = await chai.request(testApp.app).get('/teams/:20');
  //   const message = 'TEAM_NOT_FOUND';

  //   expect(response.status).to.be.equal(404);
  //   expect(response.body).to.be.deep.equal({ message });
  // });

  it('Se é criado um novo time', async function() {
    const mockedTeam: ITeam = { teamName: 'Tabajara' };
    const mockedReturn: Team = { id: 1, ...mockedTeam } as Team;
    
    sinon.stub(Model, 'create').resolves(mockedReturn);
    
    const response = await chai.request(testApp.app).post('/teams').send(mockedTeam);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });
})