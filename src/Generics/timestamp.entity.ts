import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class TimestampEntity {
  @CreateDateColumn({
    name: 'created_at',
    update: false,
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
