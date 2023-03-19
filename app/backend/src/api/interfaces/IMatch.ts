export default interface IMatch {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

type NewMatch = Omit<IMatch, 'inProgress'>;

interface IResultMatch extends IMatch {
  homeTeamResult: 'string';
  awayTeamResult: 'string';
}

export { NewMatch, IResultMatch };
