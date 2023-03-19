export default interface ITeamStatistcs {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface IStatictsSchema {
  id: number;
  teamName: string;
  games: number[];
  victories: number[];
  draws: number[];
  losses: number[];
  goalsFavor: number[];
  goalsOwn: number[];
}

export type inputStatistcs = {
  index: number;
  positiveGoals: number;
  negativeGoals: number;
  result: string;
};
