import { ILeaderboard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import MatchesModel from './MatchesModel';
import TeamsModel from './TeamsModel';

export default class LeaderBoardModel {
  constructor(private matchModel = new MatchesModel(), private teamModel = new TeamsModel()) {}

  getFinishedMatches = async () => {
    const matches = await this.matchModel.findByProgress('false');
    return matches;
  };

  getTeams = async () => {
    const teams = await this.teamModel.findAll();
    return teams;
  };

  //   getLeaderBoardHome = async (): Promise<ILeaderboard[]> => {
  //     const leaderboard = (await this.getTeams()).map(async (team) => {
  //       const teamMatches = (await this.getFinishedMatches())
  //         .filter((match) => match.homeTeamId === team.id);

  //       const wins = teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  //       const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  //       const losses = teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

  //       return {
  //         name: team.teamName,
  //         totalPoints: wins.length * 3 + draws.length,
  //         totalGames: teamMatches.length,
  //         totalVictories: wins.length,
  //         totalDraws: draws.length,
  //         totalLosses: losses.length,
  //         goalsFavor: teamMatches.reduce((total, match) => total + match.homeTeamGoals, 0),
  //         goalsOwn: teamMatches.reduce((total, match) => total + match.awayTeamGoals, 0),
  //       };
  //     });

  //     return Promise.all(leaderboard);
  //   };
  getLeaderBoardHome = async (): Promise<ILeaderboard[]> => {
    const teams = await this.getTeams();
    const finishedMatches = await this.getFinishedMatches();

    const leaderboard = teams.map((team) => {
      const teamMatches = finishedMatches.filter((match) => match.homeTeamId === team.id);
      const wins = teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
      const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
      const losses = teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

      return {
        name: team.teamName,
        totalPoints: wins.length * 3 + draws.length,
        totalGames: teamMatches.length,
        totalVictories: wins.length,
        totalDraws: draws.length,
        totalLosses: losses.length,
        goalsFavor: teamMatches.reduce((total, match) => total + match.homeTeamGoals, 0),
        goalsOwn: teamMatches.reduce((total, match) => total + match.awayTeamGoals, 0) };
    });

    return leaderboard;
  };
}
