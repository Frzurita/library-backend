import { User } from '../../../shared/infrastructure/user.entity.typeorm';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne((type) => User, (user) => user.contacts, { eager: false })
  user: User;

  @Column()
  userId: string;
}
