import IMatch, { NewMatch } from './IMatch';

export default interface IServiceMatch {
  getAll():Promise<IMatch[]>
  getByProgress(query: string):Promise<IMatch[]>
  finishMatch(id: number): Promise<[affectedCount: number]>
  updateMatchGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  createMatch(match: NewMatch): Promise<IMatch>
}
