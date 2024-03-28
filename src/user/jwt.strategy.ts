import { UserService } from './user.service';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
export class JwtStorage extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //需要注入，不能少
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'puxiaoshuai',
    } as StrategyOptions);
  }
  async validate(user: User) {
    //好像根本不要进行existUser这个判断， jwt只是根据传递的token信息在内部就进行了判断，并返回了user ,想了下还是需要，万一用户被删除了，你找不到，但是token这时候还是表示删除的用户，这个时候就有问题
    const existUser = await this.userService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
    //return user
  }
}
