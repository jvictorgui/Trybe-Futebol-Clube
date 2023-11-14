import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/Matches/IMatches';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) {}

  async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async getMatchByProgress(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
