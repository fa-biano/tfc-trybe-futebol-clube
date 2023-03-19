import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import Matches from '../database/models/MatchesModel';
import { NewMatch } from '../api/interfaces';
import Team from '../database/models/TeamModel';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a classe LeaderboardController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('Se retorna a classificacao total dos times com partidas finalizadas', async function() {
    const team1: Team = { id: 1, teamName: 'Corintia' } as Team;
    const team2: Team = { id: 2, teamName: 'Vasco' } as Team;
    const mockedTeams: Team[] = [team1, team2];

    const match1: Matches = {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    } as Matches;

    const match2: Matches = new Matches({
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 2,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const mockedMatchs: Matches[] = [match1, match2];

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

    sinon.stub(Model, 'findAll')
      .onFirstCall().resolves(mockedMatchs)
      .onSecondCall().resolves(mockedTeams);

    const response = await chai.request(testApp.app).get('/leaderboard').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });

  it('Se retorna a classificacao dos times mandantes com partidas finalizadas', async function() {
    const team1: Team = { id: 1, teamName: 'Corintia' } as Team;
    const team2: Team = { id: 2, teamName: 'Vasco' } as Team;
    const mockedTeams: Team[] = [team1, team2];

    const match1: Matches = {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    } as Matches;

    const match2: Matches = new Matches({
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 2,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const mockedMatchs: Matches[] = [match1, match2];

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

    sinon.stub(Model, 'findAll')
      .onFirstCall().resolves(mockedMatchs)
      .onSecondCall().resolves(mockedTeams);

    const response = await chai.request(testApp.app).get('/leaderboard/home').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });

  it('Se retorna a classificacao dos times visitantes com partidas finalizadas', async function() {
    const team1: Team = { id: 1, teamName: 'Corintia' } as Team;
    const team2: Team = { id: 2, teamName: 'Vasco' } as Team;
    const mockedTeams: Team[] = [team1, team2];

    const match1: Matches = {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
    } as Matches;

    const match2: Matches = new Matches({
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 2,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: false,
    });

    const mockedMatchs: Matches[] = [match1, match2];

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

    sinon.stub(Model, 'findAll')
      .onFirstCall().resolves(mockedMatchs)
      .onSecondCall().resolves(mockedTeams);

    const response = await chai.request(testApp.app).get('/leaderboard/away').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });
})
