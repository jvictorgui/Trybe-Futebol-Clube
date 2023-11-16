import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/leaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getLeaderBoard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getLeaderBoardAway(req, res),
);

export default router;
