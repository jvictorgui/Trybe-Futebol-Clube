import { Request, Response, Router } from 'express';
import TeamsController from '../controller/teams.controller';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req:Request, res:Response) => teamsController.getAllTeams(req, res));

export default router;
