import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { TimestampEntity } from '../../Generics/timestamp.entity';

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user',
}

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
  @Column()
  salt: string;
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
  })
  role: UserRoleEnum;
  @OneToMany((TargetEntity) => Cv, (cv) => cv.user, {})
  cvs: Cv[];
}
