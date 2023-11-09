import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/Teams/ITeams';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: TeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { data: allTeams, status: 'SUCCESSFUL' };
  }
}
