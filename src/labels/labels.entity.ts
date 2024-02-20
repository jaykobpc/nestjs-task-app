import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('labels')
export class Labels {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  labelName: string;

  @Column({
    length: 60,
    nullable: false,
    default: '#dde',
  })
  labelColor: string;

  @Column({
    nullable: false,
    default: false,
  })
  isDefault: boolean;

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt: Date;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.label)
  user: User;

  @OneToMany(() => Task, (task) => task.label)
  task: Task[];
}
