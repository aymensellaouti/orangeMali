import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from "../../Generics/timestamp.entity";

@Entity('skill')
export class Skill extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  designation: string;
}
