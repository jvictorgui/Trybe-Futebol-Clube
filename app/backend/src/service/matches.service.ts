import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
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

  async endMatch(matchId: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.endMatch(matchId);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(matchId: number, match: IMatch): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updateMatch(matchId, match);
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  async createMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    try {
      const newMatch = await this.matchesModel.createMatch(match);
      if (newMatch !== null && newMatch !== undefined) {
        return { status: 'CREATED', data: newMatch };
      } return { status: 'BAD_REQUEST', data: { message: 'Match not created' } };
    } catch {
      return { status: 'BAD_REQUEST', data: { message: 'Match not created' } };
    }
  }
}
