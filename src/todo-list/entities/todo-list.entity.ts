import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}
// 作用于 数据库存储
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ default: TodoStatus.TODO })
  status: number;
}
