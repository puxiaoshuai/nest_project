import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListDto } from './create-todo-list.dto';
import { IsString, IsNumber } from 'class-validator';
import { TodoStatus } from '../entities/todo-list.entity';

// 作用于请求数据传递
export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  @IsString()
  title: string;
  @IsString()
  description?: string;
  @IsNumber()
  status?: TodoStatus;
}
