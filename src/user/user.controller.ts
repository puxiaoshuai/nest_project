import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { USER_ROLE, User } from './entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  @UseGuards(AuthGuard('local')) //这里使用local策略,返回token
  //login这里不用获取用户 username and password ,应该是直接在AuthGuard中间件中获取
  login(@Req() req) {
    const user = req.user;
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return {
      data: token,
    };
  }

  @ApiBearerAuth()
  @Roles([USER_ROLE.ROOT, USER_ROLE.VISITOR])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll(@Body() params, @Req() req) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
