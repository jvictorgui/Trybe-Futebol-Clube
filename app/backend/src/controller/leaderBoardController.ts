import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderBoard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  getLeaderBoard = async (_req: Request, res: Response) => {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard();
    res.status(mapStatusHTTP(leaderBoard.status)).json(leaderBoard.data);
  };

  getLeaderBoardAway = async (_req: Request, res: Response) => {
    const leaderBoard = await this.leaderBoardService.getLeaderBoardAway();
    res.status(mapStatusHTTP(leaderBoard.status)).json(leaderBoard.data);
  };
}
