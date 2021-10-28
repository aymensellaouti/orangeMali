import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { TimestampEntity } from "../../Generics/timestamp.entity";
@Entity('user')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany((TargetEntity) => Cv, (cv) => cv.user, {})
  cvs: Cv[];
}
