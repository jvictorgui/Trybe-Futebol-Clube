import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Users extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,

  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});
