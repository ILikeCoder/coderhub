import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Moment } from '../../moment/entities/moment.entity';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column()
  momentId: number;

  @ManyToOne(() => Moment, (moment) => moment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  moment: Moment;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comment: Comment;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
