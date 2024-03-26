import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { TodoListModule } from './todo-list/todo-list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodoListModule, TypeOrmModule.forRoot(databaseConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('AppModule进行初始化');
  }
  onApplicationBootstrap() {
    console.log('AppModule- onApplicationBootstrap');
  }
}
