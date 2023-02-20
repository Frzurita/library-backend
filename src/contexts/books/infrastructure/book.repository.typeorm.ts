import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nullable } from '../../../shared/domain/utility_types/nullable.utility_type';
import { Book } from '../domain/book.aggregate';
import { BookRepository } from '../domain/book.repository';
import { BookId } from '../domain/object_values/book.id.value_object';
import { Book as BookTypeOrm } from './book.entity.typeorm';
import { UserScope } from '../../../shared/domain/user.scope';

@Injectable()
export class BookRepositoryTypeOrm implements BookRepository {
  constructor(
    @InjectRepository(BookTypeOrm)
    private bookEntity: Repository<BookTypeOrm>,
  ) {}

  async create(book: Book): Promise<void> {
    await this.bookEntity.insert(book.toPrimitives());
  }

  async update(book: Book): Promise<void> {
    await this.bookEntity.update(book.id.value, book.toPrimitives());
  }

  async get(id: BookId, scope: UserScope): Promise<Nullable<Book>> {
    const data = await this.bookEntity.findOneBy({ id: id.value, ...scope });
    return data ? Book.fromPrimitives(data) : null;
  }

  async getAll(scope: UserScope): Promise<Book[]> {
    const data = await this.bookEntity.findBy(scope);

    return data.map((entity) => Book.fromPrimitives(entity));
  }

  async delete(id: BookId, scope: UserScope): Promise<void> {
    await this.bookEntity.delete({ id: id.value, ...scope });
  }
}
