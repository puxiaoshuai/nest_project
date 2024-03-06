import { Module } from '@nestjs/common';
import { TodoListModule } from './todo-list/todo-list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [TodoListModule, TypeOrmModule.forRoot(databaseConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
