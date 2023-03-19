import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
import { ITeam } from '../api/interfaces';
import { TeamService } from '../api/services';
import Team from '../database/models/TeamModel';

const { expect } = chai;

describe('Testa a classe TeamService', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Se retorna todos os times cadastrados', async function() {
    const team1: Team = new Team ({ id: 1, teamName: 'Corintia' });
    const team2: Team = new Team ({ id: 2, teamName: 'Vasco' });
    const mockedTeams: Team[] = [team1, team2];

    sinon.stub(Model, 'findAll').resolves(mockedTeams);
    const service = new TeamService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mockedTeams);
    expect(result.length).to.be.equal(2);
  });

  it('Se retorna o time pelo id', async function() {
    const team1: Team = new Team ({ id: 1, teamName: 'Corintia' });

    sinon.stub(Model, 'findByPk').resolves(team1);
    const service = new TeamService();
    const result = await service.getById(1);

    expect(result).to.be.deep.equal(team1);
  });

  it('Se é criado um novo time', async function() {
    const mockedTeam: ITeam = { teamName: 'Tabajara' };

    const mockedReturn: Team = new Team({ id: 1, ...mockedTeam });

    sinon.stub(Model, 'create').resolves(mockedReturn);
    const service = new TeamService();
    const result = await service.create(mockedTeam);

    expect(result).to.be.deep.equal(mockedReturn);
  });
})
