import SequelizeMatch from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { IMatch } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async findByProgress(inProgress: string): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: {
        inProgress: inProgress === 'true',
      },
    });
    return matches;
  }

  async endMatch(matchId: number): Promise<IMatch> {
    const match = await this.model.findOne({
      where: { id: matchId },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (!match) {
      throw new Error(`Match with id ${matchId} not found`);
    }

    await match.update({ inProgress: false });

    return match;
  }
  //   18 - Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento
  //   O endpoint deve ser do tipo PATCH;

  //   Será recebido o id pelo parâmetro da URL;

  //   Será validado que não é possível alterar uma partida sem um token;

  //   Será avaliado que é possível alterar o resultado de uma partida.

  //   O corpo da requisição terá o seguinte formato:

  //   {
  //     "homeTeamGoals": 3,
  //     "awayTeamGoals": 1
  //   }

  async updateMatch(matchId: number, match: IMatch): Promise<IMatch> {
    const matchToUpdate = await this.model.findOne({
      where: { id: matchId },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (!matchToUpdate) {
      throw new Error(`Match with id ${matchId} not found`);
    }

    const { homeTeamGoals, awayTeamGoals } = match;

    await matchToUpdate.update({ homeTeamGoals, awayTeamGoals });

    return matchToUpdate;
  }
}
