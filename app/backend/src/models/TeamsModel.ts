import { ITeamModel } from '../Interfaces/Teams/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/Teams/ITeams';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeams;
  public async findAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
