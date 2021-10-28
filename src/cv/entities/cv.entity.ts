import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable
} from 'typeorm';
import { TimestampEntity } from '../../Generics/timestamp.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';

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
  @ManyToMany((TargetEntity) => Skill)
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
  @ManyToOne((TargetEntity) => User, (user) => user.cvs, {})
  user: User;
}
