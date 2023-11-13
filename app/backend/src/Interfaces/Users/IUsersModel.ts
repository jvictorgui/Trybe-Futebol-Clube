import { IUser } from './IUser';

export interface IUsersModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>
}
