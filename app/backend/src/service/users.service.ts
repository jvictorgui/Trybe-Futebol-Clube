import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UsersModel from '../models/UsersModel';
import { Token } from '../Interfaces/Users/IToken';
import JwtService from '../utils/JWT';

export default class UsersService {
  constructor(
    private usersModel: UsersModel = new UsersModel(),

  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<Token>> {
    const user = await this.usersModel.findByEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED',
        data: {
          message: 'Invalid email or password' } };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { status: 'UNAUTHORIZED',
        data: {
          message: 'Invalid email or password' } };
    }

    const token = JwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
