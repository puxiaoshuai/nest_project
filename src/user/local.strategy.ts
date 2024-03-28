import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

//用户名+密码策略
export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') //把密码暴露出来
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    //如果不暴露，查询的user的password是被  在entry中select隐藏过的， 所以 user.password 是undefined
    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('密码不正确');
    }
    //密码校验成功后返回当前查询的用户，然后根据id，username进行 生成token
    return user;
  }
}
