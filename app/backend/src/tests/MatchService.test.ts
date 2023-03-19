import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
import { IMatch, NewMatch } from '../api/interfaces';
import { MatchService } from '../api/services';
import Matches from '../database/models/MatchesModel';

const { expect } = chai;

describe('Testa a classe MatchService', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Se retorna todas as partidas', async function() {
    const mockedMatch: Matches = new Matches({
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 8,
        awayTeamGoals: 1,
        inProgress: false,
    });

    const mockedReturn: Matches[] = [mockedMatch];
    
    sinon.stub(Model, 'findAll').resolves(mockedReturn);

    const service = new MatchService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(mockedReturn);
  });

  it('Se cria nova partida', async function() {
    const mockedMatch: NewMatch = {
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
    };

    const mockedReturn: Matches = new Matches({ id: 1, ...mockedMatch, inProgress: true, });
    
    sinon.stub(Model, 'create').resolves(mockedReturn);

    const service = new MatchService();
    const result = await service.createMatch(mockedMatch);

    expect(result).to.be.deep.equal(mockedReturn);
  });
})
