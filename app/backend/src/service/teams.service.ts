import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/Teams/ITeams';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: TeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
