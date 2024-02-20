import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Labels } from 'src/labels/labels.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    nullable: false,
    default: 'OPEN',
  })
  status: TaskStatus;

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    nullable: false,
  })
  userId: number;

  @Column({
    nullable: false,
  })
  labelId: number;

  @ManyToOne(() => User, (user) => user.task)
  user: User;

  @ManyToOne(() => Labels, (label) => label.task)
  label: Labels;
}
