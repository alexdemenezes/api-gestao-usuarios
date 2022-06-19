import { Model, DataTypes } from 'sequelize';
import db from '../../database';
import User from '../users/User';

class PsRecovery extends Model {
  public id?: number;
  public token: string;
  public user_id: number;
  public used: number;
}

PsRecovery.init({
  token: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  used: DataTypes.INTEGER,
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'ps_recoveries'
});

PsRecovery.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });
User.hasMany(PsRecovery, { foreignKey: 'user_id', onDelete: 'cascade'});


export default PsRecovery;