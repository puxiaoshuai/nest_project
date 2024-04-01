import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStorage } from './jwt.strategy';
import { Profile } from './entities/profile.entity';
import { Logs } from '../userlogs/userlogs.entity';
import { Roles } from '../roles/roles.entity';

const jwtModule = JwtModule.register({
  secret: 'puxiaoshuai',
  signOptions: { expiresIn: '1h' },
});
// imports,controllers,providers,exports的区别?
@Module({
  //多个数据库实体导入
  imports: [
    TypeOrmModule.forFeature([User, Profile, Logs, Roles]),
    PassportModule,
    jwtModule,
  ],
  controllers: [UserController],
  providers: [UserService, LocalStorage, JwtStorage],
  exports: [jwtModule],
})
export class UserModule {}
