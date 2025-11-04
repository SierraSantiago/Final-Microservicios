import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DisciplineKind } from '../enum/kind.enum';

@Entity('disciplines')
export class Discipline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DisciplineKind,
    enumName: 'discipline_kind',
  })
  kind: DisciplineKind;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column('int')
  points: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'daemon_user_id', type: 'uuid' })
  daemonUserId: string;

  @Column({ name: 'issued_by_user_id', type: 'uuid' })
  issuedByUserId: string;
}
