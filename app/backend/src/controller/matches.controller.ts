import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const { status, data } = await this.matchesService.getMatchByProgress(inProgress as string);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async endMatch(req: Request, res: Response) {
    const { matchId } = req.params;
    const { status, data } = await this.matchesService.endMatch(parseInt(matchId, 10));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
