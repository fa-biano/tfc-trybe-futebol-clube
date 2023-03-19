import ITeamStatistcs from './ITeamStatistcs';

export default interface IServiceLeaderboard {
  getBoard(path: string): Promise<ITeamStatistcs[]>;
}
