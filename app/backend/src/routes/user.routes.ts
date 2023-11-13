import { Request, Response, Router } from 'express';
import UsersController from '../controller/users.controller';

const usersController = new UsersController();

const router = Router();

router.post('/', (req:Request, res:Response) => usersController.login(req, res));

export default router;
