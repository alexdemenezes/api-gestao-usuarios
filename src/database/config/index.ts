import 'dotenv/config';
import {  Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'seattle6565301',
  database: process.env.DB_NAME || 'USERS_MANAGER',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306 ,
  dialect: 'mysql',
}

export default config;
