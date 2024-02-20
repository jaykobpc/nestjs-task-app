import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import * as dotenv from 'dotenv';
import { Labels } from 'src/labels/labels.entity';

dotenv.config({
  path: '../.env',
});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'taskmanagement',
  entities: [Task, User, Labels],
  synchronize: process.env.APP_ENV !== 'production',
  logging: process.env.APP_ENV !== 'production',
  migrations: [],
  subscribers: [],
};
