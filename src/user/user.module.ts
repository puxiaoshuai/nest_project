import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'puxiaoshuai',
  signOptions: { expiresIn: '1m' },
});
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [UserController],
  providers: [UserService, LocalStorage],
  exports: [jwtModule],
})
export class UserModule {}
