import Team from '../../database/models/TeamModel';
import {
  IMatch,
  IResultMatch,
  IServiceLeaderboard,
  IStatictsSchema,
  ITeamStatistcs,
  inputStatistcs } from '../interfaces';
import MatchService from './MatchService';
import TeamService from './TeamService';

class LeaderboarsService implements IServiceLeaderboard {
  private static calcResultMatches(finishedMatches: IMatch[]): IResultMatch[] {
    const resultMatches = finishedMatches.map((match) => {
      const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;
      const fixedMatch = { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };

      if (match.homeTeamGoals === match.awayTeamGoals) {
        const result = { ...fixedMatch, homeTeamResult: 'Empate', awayTeamResult: 'Empate' };
        return result;
      }

      if (match.homeTeamGoals > match.awayTeamGoals) {
        const result = { ...fixedMatch, homeTeamResult: 'Vitória', awayTeamResult: 'Derrota' };
        return result;
      }

      const result = { ...fixedMatch, homeTeamResult: 'Derrota', awayTeamResult: 'Vitória' };
      return result;
    });

    return resultMatches as IResultMatch[];
  }

  private static setStatistcsSchema(teams: Team[]): IStatictsSchema[] {
    const teamStatistcsSchema = teams.map((team) => {
      const { id, teamName } = team;
      const statistcs = {
        id,
        teamName,
        games: [],
        victories: [],
        draws: [],
        losses: [],
        goalsFavor: [],
        goalsOwn: [],
      };

      return statistcs;
    });

    return teamStatistcsSchema;
  }

  private static inputStatistcs(schema: IStatictsSchema[], inputs: inputStatistcs) {
    const { index, positiveGoals, negativeGoals, result } = inputs;
    const teamStatistcsSchema = [...schema];

    teamStatistcsSchema[index].games.push(1);
    teamStatistcsSchema[index].goalsFavor.push(positiveGoals);
    teamStatistcsSchema[index].goalsOwn.push(negativeGoals);
    if (result === 'Empate') {
      teamStatistcsSchema[index].draws.push(1);
    }

    if (result === 'Vitória') {
      teamStatistcsSchema[index].victories.push(1);
    }

    if (result === 'Derrota') {
      teamStatistcsSchema[index].losses.push(1);
    }

    return teamStatistcsSchema;
  }

  private static calcStatistcsHome(
    teams: IStatictsSchema[],
    calcResultMatches: IResultMatch[],
  ): IStatictsSchema[] {
    const teamSchema = [...teams];

    calcResultMatches.forEach((match) => {
      const homeTeamIndex = teamSchema.findIndex((team) => team.id === match.homeTeamId);

      const homeStatistcsSchema = LeaderboarsService.inputStatistcs(
        teamSchema,
        {
          index: homeTeamIndex,
          positiveGoals: match.homeTeamGoals,
          negativeGoals: match.awayTeamGoals,
          result: match.homeTeamResult,
        },
      );

      return homeStatistcsSchema;
    });

    return teamSchema;
  }

  private static calcStatistcsAway(
    teams: IStatictsSchema[],
    calcResultMatches: IResultMatch[],
  ): IStatictsSchema[] {
    const teamSchema = [...teams];

    calcResultMatches.forEach((match) => {
      const awayteamIndex = teamSchema.findIndex((team) => team.id === match.awayTeamId);

      const awayStatistcsSchema = LeaderboarsService.inputStatistcs(
        teamSchema,
        {
          index: awayteamIndex,
          positiveGoals: match.awayTeamGoals,
          negativeGoals: match.homeTeamGoals,
          result: match.awayTeamResult,
        },
      );

      return awayStatistcsSchema;
    });

    return teamSchema;
  }

  private static formatStatistcs(statistcs: IStatictsSchema[]): ITeamStatistcs[] {
    const teamStatistcs = statistcs.map((team) => {
      const reducedKeys = Object.entries(team).map((key) => {
        if (Array.isArray(key[1])) return [key[0], key[1].reduce((acc, curr) => acc + curr, 0)];
        return [key[0], key[1]];
      });
      const obj = Object.fromEntries(reducedKeys);

      const pointsAndGame = { totalPoints: (obj.victories * 3) + obj.draws, totalGames: obj.games };
      const res = { totalVictories: obj.victories, totalDraws: obj.draws, totalLosses: obj.losses };
      const goals = { goalsFavor: obj.goalsFavor, goalsOwn: obj.goalsOwn };
      const efficiency = {
        goalsBalance: obj.goalsFavor - obj.goalsOwn,
        efficiency: ((pointsAndGame.totalPoints / (pointsAndGame.totalGames * 3)) * 100).toFixed(2),
      };

      return { name: obj.teamName, ...pointsAndGame, ...res, ...goals, ...efficiency };
    });

    return teamStatistcs;
  }

  private static rankTeams(statistcs: ITeamStatistcs[]) {
    const sort = statistcs.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return b.goalsOwn - a.goalsOwn;
    });
    return sort;
  }

  getBoard = async (path: string): Promise<ITeamStatistcs[]> => {
    const matchService = new MatchService();
    const finishedMatches = await matchService.getByProgress('false');

    const teamService = new TeamService();
    const teams = await teamService.getAll();

    const calcResultMatches:IResultMatch[] = LeaderboarsService.calcResultMatches(finishedMatches);

    const teamStatistcsShape = LeaderboarsService.setStatistcsSchema(teams);
    const teamStatistcsSchema = teamStatistcsShape;

    if (path === '/home') {
      LeaderboarsService.calcStatistcsHome(teamStatistcsShape, calcResultMatches);
    } else if (path === '/away') {
      LeaderboarsService.calcStatistcsAway(teamStatistcsShape, calcResultMatches);
    } else {
      LeaderboarsService.calcStatistcsHome(teamStatistcsShape, calcResultMatches);
      LeaderboarsService.calcStatistcsAway(teamStatistcsShape, calcResultMatches);
    }

    const teamStatistcs = LeaderboarsService.formatStatistcs(teamStatistcsSchema);
    const sortedStatistcs = LeaderboarsService.rankTeams(teamStatistcs);

    return sortedStatistcs;
  };
}

export default LeaderboarsService;
