import { UserScope } from '../../../shared/domain/user.scope';
import { Nullable } from '../../../shared/domain/utility_types/nullable.utility_type';
import { Book } from './book.aggregate';
import { BookId } from './object_values/book.id.value_object';

export interface BookRepository {
  create(book: Book): Promise<void>;

  update(book: Book): Promise<void>;

  get(id: BookId, scope: UserScope): Promise<Nullable<Book>>;

  getAll(scope: UserScope): Promise<Book[]>;

  delete(id: BookId, scope: UserScope): Promise<void>;
}

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';
