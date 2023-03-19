import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
import { LeaderboarsService } from '../api/services';
import Team from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';

const { expect } = chai;

describe('Testa a classe LeaderboardService', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Se retorna a classificacao total dos times com partidas finalizadas', async function() {
    const team1: Team = new Team ({ id: 1, teamName: 'Corintia' });
    const team2: Team = new Team ({ id: 2, teamName: 'Vasco' });
    const mockedTeams: Team[] = [team1, team2];

    const match1: Matches = new Matches({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const match2: Matches = new Matches({
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 2,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const mockedReturn = [
      {
        "name": "Vasco",
        "totalPoints": 4,
        "totalGames": 2,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 2,
        "goalsBalance": 1,
        "efficiency": "66.67"
      },
      {
        "name": "Corintia",
        "totalPoints": 1,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 2,
        "goalsOwn": 3,
        "goalsBalance": -1,
        "efficiency": "16.67"
      },
    ];

    const mockedMatchs: Matches[] = [match1, match2];
    const path = '/leaderboard';

    sinon.stub(Model, 'findAll')
      .onFirstCall().resolves(mockedMatchs)
      .onSecondCall().resolves(mockedTeams);

    const service = new LeaderboarsService();
    const result = await service.getBoard(path);

    expect(result).to.be.deep.equal(mockedReturn);
  });

  it('Se retorna a classificacao dos times mandantes com partidas finalizadas', async function() {
    const team1: Team = new Team ({ id: 1, teamName: 'Corintia' });
    const team2: Team = new Team ({ id: 2, teamName: 'Vasco' });
    const mockedTeams: Team[] = [team1, team2];

    const match1: Matches = new Matches({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const match2: Matches = new Matches({
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 2,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const mockedReturn = [
      {
        "name": "Vasco",
        "totalPoints": 3,
        "totalGames": 1,
        "totalVictories": 1,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 2,
        "goalsOwn": 1,
        "goalsBalance": 1,
        "efficiency": "100.00"
      },
      {
        "name": "Corintia",
        "totalPoints": 1,
        "totalGames": 1,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 1,
        "goalsOwn": 1,
        "goalsBalance": 0,
        "efficiency": "33.33"
      },
    ];

    const mockedMatchs: Matches[] = [match1, match2];
    const path = '/home';

    sinon.stub(Model, 'findAll')
      .onFirstCall().resolves(mockedMatchs)
      .onSecondCall().resolves(mockedTeams);

    const service = new LeaderboarsService();
    const result = await service.getBoard(path);

    expect(result).to.be.deep.equal(mockedReturn);
  });

  it('Se retorna a classificacao dos times visitantes com partidas finalizadas', async function() {
    const team1: Team = new Team ({ id: 1, teamName: 'Corintia' });
    const team2: Team = new Team ({ id: 2, teamName: 'Vasco' });
    const mockedTeams: Team[] = [team1, team2];

    const match1: Matches = new Matches({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const match2: Matches = new Matches({
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 2,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const mockedReturn = [
      {
        "name": "Vasco",
        "totalPoints": 1,
        "totalGames": 1,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 1,
        "goalsOwn": 1,
        "goalsBalance": 0,
        "efficiency": "33.33"
      },
      {
        "name": "Corintia",
        "totalPoints": 0,
        "totalGames": 1,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 1,
        "goalsOwn": 2,
        "goalsBalance": -1,
        "efficiency": "0.00"
      },
    ];

    const mockedMatchs: Matches[] = [match1, match2];
    const path = '/away';

    sinon.stub(Model, 'findAll')
      .onFirstCall().resolves(mockedMatchs)
      .onSecondCall().resolves(mockedTeams);

    const service = new LeaderboarsService();
    const result = await service.getBoard(path);

    expect(result).to.be.deep.equal(mockedReturn);
  });
})
