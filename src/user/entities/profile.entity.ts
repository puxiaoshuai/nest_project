import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

//形象 数据，用户1对1
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  gender: number;
  @Column()
  phone: string;

  //你设置@JoinColumn的哪一方，哪一方的表将包含一个"relation id"和目标实体表的外键
  @OneToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  user: User;
}
