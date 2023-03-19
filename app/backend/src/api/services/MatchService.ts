import { ModelStatic } from 'sequelize';
import Matches from '../../database/models/MatchesModel';
import Team from '../../database/models/TeamModel';
import { NotFound, Unprocessable } from '../errors';
import { IMatch, IServiceMatch, NewMatch } from '../interfaces';
import TeamService from './TeamService';

class MatchService implements IServiceMatch {
  private model: ModelStatic<Matches> = Matches;

  async getAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }

  async getByProgress(query: string): Promise<IMatch[]> {
    const inProgress = query === 'true';

    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      // raw: true,
    });
    return matches;
  }

  async finishMatch(id: number): Promise<[affectedCount: number]> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });
    return match;
  }

  async updateMatchGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(match: NewMatch): Promise<IMatch> {
    const { homeTeamId, awayTeamId } = match;

    if (homeTeamId === awayTeamId) {
      throw new Unprocessable('It is not possible to create a match with two equal teams');
    }

    const teamService = new TeamService();

    const teamsId = [homeTeamId, awayTeamId];
    const checkTeams = teamsId.map(async (team) => {
      const checkedTeam = await teamService.getById(team);
      return checkedTeam;
    });

    const isChecked = await Promise.all(checkTeams);
    const teamsExists = isChecked.every((team) => team !== null);

    if (!teamsExists) throw new NotFound('There is no team with such id!');

    const newMatch = await this.model.create({ ...match, inProgress: true });
    return newMatch;
  }
}

export default MatchService;
