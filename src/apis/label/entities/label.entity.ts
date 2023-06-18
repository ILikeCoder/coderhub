import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Moment } from '../../moment/entities/moment.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}

@Entity()
export class MomentLabel {
  @PrimaryColumn({ type: 'int' })
  momentId: number;

  @PrimaryColumn({ type: 'int' })
  labelId: number;

  @ManyToOne(() => Moment, (moment) => moment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  moment: Moment;

  @ManyToOne(() => Label, (label) => label.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  label: Label;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
