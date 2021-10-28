import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../Generics/timestamp.entity';

@Entity('cv')
export class Cv extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  job: string;
  @Column()
  path: string;
  @Column()
  cin: string;
  @Column()
  age: number;
}
