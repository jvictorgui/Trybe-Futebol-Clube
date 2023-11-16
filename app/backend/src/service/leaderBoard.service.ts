import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderBoardModel from '../models/LeaderBoardModel';
import { ILeaderboard } from '../Interfaces/LeaderBoard/ILeaderBoard';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = new LeaderBoardModel()) {}

  getLeaderBoard = async (): Promise<ServiceResponse<ILeaderboard[]>> => {
    const leaderBoard = await this.leaderBoardModel.getLeaderBoardHome();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  };

  getLeaderBoardAway = async (): Promise<ServiceResponse<ILeaderboard[]>> => {
    const leaderBoard = await this.leaderBoardModel.getLeaderBoardAway();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  };
}
