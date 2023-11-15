import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matches.controller';
import Validation from '../middlewares/validateToken';

const matchesController = new MatchesController();
const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:matchId/finish',
  Validation.validateToken,
  (req: Request, res: Response) => matchesController.endMatch(req, res),
);

export default router;
