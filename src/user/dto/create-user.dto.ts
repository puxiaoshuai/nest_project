import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @MaxLength(40, { message: '名称长度6-10' })
  @MinLength(6, { message: '名称长度6-10' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(40, { message: '密码长度6-10' })
  @MinLength(6, { message: '密码长度6-10' })
  password: string;

  ctime:number;
  utime:number;
}
