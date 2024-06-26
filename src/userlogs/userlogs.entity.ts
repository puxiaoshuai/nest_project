import { User } from '../user/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Logs {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    path: string;
    @Column()
    result: string;
    @ManyToOne(() => User, (user) => user.logs)
    @JoinColumn()
    user: User;
  }
  