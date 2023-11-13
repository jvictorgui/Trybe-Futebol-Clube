import { IUser } from '../Interfaces/Users/IUser';
import SequelizeUsers from '../database/models/SequelizeUser';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password }: IUser = user;
    return { id, username, email, role, password };
  }
}
