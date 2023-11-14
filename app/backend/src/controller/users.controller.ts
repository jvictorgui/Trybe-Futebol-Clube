import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../service/users.service';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
    private role: string = '',
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.usersService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getRole(req: Request, res: Response) {
    const data = res.locals;
    const { role } = data;
    this.role = role;
    return res.status(mapStatusHTTP('SUCCESSFUL')).json({ role: this.role });
  }
}
