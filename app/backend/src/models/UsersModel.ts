import { IUser } from '../Interfaces/Users/IUser';
import SequelizeUsers from '../database/models/SequelizeUser';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, email, role, password };
  }

  async getRole(id: number): Promise<string> {
    try {
      const user = await this.model.findByPk(id);

      if (!user) {
        console.error(`User not found for ID: ${id}`);
        throw new Error('User not found');
      }

      return user.role;
    } catch (error) {
      console.error('Error in getRole:', error);
      throw error; // Rethrow the error to maintain consistency in error handling
    }
  }
}
