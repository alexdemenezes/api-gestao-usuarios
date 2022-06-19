import { Sequelize }from 'sequelize';
import config from './config'

const connection = new Sequelize(config);

export default connection;