import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamsService.getAllTeams();
    res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
