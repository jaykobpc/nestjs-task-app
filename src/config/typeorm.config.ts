import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'taskmanagement',
  entities: [Task, User],
  synchronize: process.env.APP_ENV !== 'production',
  logging: true,
  migrations: [],
  subscribers: [],
};
