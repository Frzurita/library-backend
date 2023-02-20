import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Book } from '../../contexts/books/infrastructure/book.entity.typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Book, (book) => book.user, { eager: true })
  contacts: Book[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
