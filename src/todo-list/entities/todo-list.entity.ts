import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}
// 作用于 数据库存储, 属性的任意修改，比如title length 改成了10，会导致数据库中的title都变成null
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  //length =5 进行创建，服务器会报超长error如何处理？
  @Column({ length: 10 })
  title: string;
  @Column()
  description: string;
  @Column({ default: TodoStatus.TODO })
  status: number;

  //如何返回时间搓？
  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  ctime: number
  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  utime: number
}
