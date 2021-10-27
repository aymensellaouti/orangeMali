import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from '../Model/todo.model';
import { TimestampEntity } from '../../Generics/timestamp.entity';

@Entity('todo')
export class TodoEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 70,
  })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
}
