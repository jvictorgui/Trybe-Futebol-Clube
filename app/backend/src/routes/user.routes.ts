import { Request, Response, Router } from 'express';
import Validation from '../middlewares/validateToken';
import UsersController from '../controller/users.controller';
import ValidateLogin from '../middlewares/validateLogin';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  ValidateLogin.validateEmailnPassword,
  (req:Request, res:Response) => usersController.login(req, res),
);

router.get('/role', Validation.validateToken, (req: Request, res: Response) =>
  usersController.getRole(req, res));

export default router;
