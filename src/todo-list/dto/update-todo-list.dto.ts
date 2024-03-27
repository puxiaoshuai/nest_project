import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListDto } from './create-todo-list.dto';
import { IsString, IsNumber } from 'class-validator';
import { TodoStatus } from '../entities/todo-list.entity';
import { ApiProperty } from '@nestjs/swagger';

// 作用于请求数据传递
export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  // @ApiProperty({ description: '标题' })
  // @IsString()
  // title: string;
  // @ApiProperty({ description: '描述' })
  // @IsString()
  // description?: string;
  // @ApiProperty({ description: '代办默认状态' })
  // @IsNumber()
  // status?: TodoStatus;
}
