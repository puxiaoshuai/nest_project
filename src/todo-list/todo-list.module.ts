import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo-list.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule implements OnModuleInit,OnApplicationBootstrap {
  onModuleInit() {
      console.log('todo-module进行初始化');
      
  }
  onApplicationBootstrap() {
    console.log('todo-module- onApplicationBootstrap');
  }
}
