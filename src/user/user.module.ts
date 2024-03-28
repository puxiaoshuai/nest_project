import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStorage } from './jwt.strategy';

const jwtModule = JwtModule.register({
  secret: 'puxiaoshuai',
  signOptions: { expiresIn: '1h' },
});
// imports,controllers,providers,exports的区别?
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [UserController],
  providers: [UserService, LocalStorage, JwtStorage],
  exports: [jwtModule],
})
export class UserModule {}
