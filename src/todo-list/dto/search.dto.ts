import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 作用于请求数据传递
export class SearchTodoListDto {
  @ApiProperty({ description: 'id' })
  @IsNumber({}, { message: '请输入数字1' })
  id: number;
}
