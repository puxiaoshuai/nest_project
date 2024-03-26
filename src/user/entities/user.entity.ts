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
  @Column({ length: 20 })
  username: string;
  @Column({ length: 20 })
  nickname: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  avatar: string;
  @Column('simple-enum', { enum: USER_ROLE, default: USER_ROLE.VISITOR })
  //root有所以权限，author有写权限，visitor只能do文章， 注册的用户默认是visitor,root权限的账号可以修改用户角色
  role: string;
  @Column({ type: 'bigint' })
  ctime: number;
  @Column({ type: 'bigint' })
  utime: number;
  @BeforeInsert()
  async encryptPwd() {
    console.log('获取的到密码', this.password);

    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
