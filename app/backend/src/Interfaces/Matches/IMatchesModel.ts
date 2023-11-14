import { IMatch } from './IMatches';

export interface IMatchesModel{
  findAll(): Promise<IMatch[]>;
}
