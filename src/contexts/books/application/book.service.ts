import { Injectable, Logger, Inject } from '@nestjs/common';
import { UserScope } from '../../../shared/domain/user.scope';
import { Nullable } from '../../../shared/domain/utility_types/nullable.utility_type';
import { Book } from '../domain/book.aggregate';
import { BookRepository, BOOK_REPOSITORY } from '../domain/book.repository';
import { BookId } from '../domain/object_values/book.id.value_object';

@Injectable()
export class BookService {
  private logger = new Logger('BookService');

  constructor(
    @Inject(BOOK_REPOSITORY)
    private bookRepository: BookRepository,
  ) {}

  async create(book: Book): Promise<void> {
    return this.bookRepository.create(book);
  }

  async update(book: Book): Promise<void> {
    return this.bookRepository.update(book);
  }

  async get(id: BookId, scope: UserScope): Promise<Nullable<Book>> {
    return this.bookRepository.get(id, scope);
  }

  async getAll(scope: UserScope): Promise<Book[]> {
    return this.bookRepository.getAll(scope);
  }

  async delete(id: BookId, scope: UserScope): Promise<void> {
    return this.bookRepository.delete(id, scope);
  }
}
