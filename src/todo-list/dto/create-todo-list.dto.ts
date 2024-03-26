import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  maxLength,
} from 'class-validator';
import { TodoStatus } from '../entities/todo-list.entity';
export class CreateTodoListDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '标题必填' })
  @MaxLength(10, { message: '标题长度不能超过10' })
  title: string;

  @ApiProperty({ description: '描述' })
  @IsNotEmpty({ message: 'desc必填' })
  description: string;

  //ApiPropertyOptional 可选参数，方便在swagger中展示
  @ApiPropertyOptional({ description: '代办默认状态' })
  @IsNumber()
  status?: TodoStatus;
}
