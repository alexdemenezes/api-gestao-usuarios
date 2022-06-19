import { Model, DataTypes } from 'sequelize';
import db from '../../database';

class User extends Model {
  public readonly id: number;
  public username: string;
  public email: string;
  public password: string;
  public token: string;
  public role: number;
  public verified: number;
}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  role: DataTypes.INTEGER,
  verified: DataTypes.INTEGER
}, {
  timestamps: false,
  underscored: false,
  sequelize: db,
  modelName: 'users'
});

export default User;