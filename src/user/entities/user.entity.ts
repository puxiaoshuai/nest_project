import { maxLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

export enum USER_ROLE {
  ROOT = 'root',
  AUTHOR = 'author',
  VISITOR = 'visitor',
}
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ length: 40 })
  username: string;
  @Column({ length: 40, default: '' })
  nickname: string;
  //密码加密有 60长度。 select: false 查询默认隐藏此列
  @Column({ length: 100, select: false })
  password: string;
  @Column({ length: 20, default: '' })
  email: string;
  @Column({ default: '' })
  avatar?: string;
  @Column('simple-enum', { enum: USER_ROLE, default: USER_ROLE.VISITOR })
  //root有所以权限，author有写权限，visitor只能do文章， 注册的用户默认是visitor,root权限的账号可以修改用户角色
  role: string;
  @Column({ type: 'bigint' })
  ctime: number;
  @Column({ type: 'bigint' })
  utime: number;
  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password, 10);
    console.log('获取的到密码', this.password);
  }
}
