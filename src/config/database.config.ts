//nestjs/typeorm中导入
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Todo} from '../todo-list/entities/todo-list.entity'
console.log('xx', process.env.DATABASE_PASSWORD);

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'puhao',
  password: 'puhao123456',
  database: 'todo',
  autoLoadEntities: true, // 使用这个配置自动导入entities
  synchronize: true, // 开发环境同步数据
};
