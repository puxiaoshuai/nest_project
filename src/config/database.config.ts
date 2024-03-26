//nestjs/typeorm中导入
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from '../todo-list/entities/todo-list.entity';
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'puhao',
  password: 'puhao123456',
  database: 'todo',
  autoLoadEntities: true, // 使用这个配置自动导入entities
  connectorPackage: 'mysql2', // 指定用什么驱动包
  synchronize: false, // 开发环境同步数据,有风险，最后设置为false
};
