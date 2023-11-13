import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UsersModel from '../models/UsersModel';
import { Token } from '../Interfaces/Users/IToken';

export default class UsersService {
  constructor(private usersModel: UsersModel = new UsersModel()) {}

  public async login(email: string, password: string): Promise<ServiceResponse<Token>> {
    const user = await this.usersModel.findByEmail(email);

    if (!email || !password) {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }

    if (!user) {
      return { status: 'UNAUTHORIZED',
        data: {
          message: 'Invalid email or password' } };
    }

    const token = jwt.sign({ email: user?.email }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h' });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
