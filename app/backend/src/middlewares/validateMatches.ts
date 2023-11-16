import { Request, Response, NextFunction } from 'express';

// 21 - Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times
// Será validado que não é possível inserir uma partida em que o homeTeam e o awayTeam sejam iguais, por exemplo: Barcelona x Barcelona;

// Caso isso ocorra, deve-se retornar, com um status 422, a seguinte mensagem:

// { "message": "It is not possible to create a match with two equal teams" }
// Será validado que não é possível inserir uma partida com um time que não existe na tabela teams;

// Caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar, com um status 404, a seguinte mensagem:

// { "message": "There is no team with such id!" }

export default class ValidateMatches {
  static validateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    const validateHomeId = homeTeamId < 0 || homeTeamId > 16;
    const validateAwayId = awayTeamId < 0 || awayTeamId > 16;
    const finalValidate = validateHomeId || validateAwayId;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    if (finalValidate) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}
