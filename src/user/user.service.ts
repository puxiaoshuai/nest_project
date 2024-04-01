import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const currentTime = Math.floor(Date.now() / 1000);
    createUserDto.ctime = currentTime;
    createUserDto.utime = currentTime;
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return {
      data: null,
      message: '注册成功',
    };
  }

  async findAll(query): Promise<any> {
    const userQuery = this.userRepository.createQueryBuilder('user');
    const count = await userQuery.getCount();
    const { pageNum = 1, pageSize = 2, ...params } = query;
    userQuery.innerJoin('user.logs', 'logs') //联合查询出 log日志
    
    
    userQuery.limit(pageSize);
    userQuery.offset(pageSize * (pageNum - 1));
    
    const users = await userQuery.getMany();
    return {
      data: { list: users, total: count },
    };
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async getUser(user: any) {
    return await this.userRepository.findOne({ where: { id: user.id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
