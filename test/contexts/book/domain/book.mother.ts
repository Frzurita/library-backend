import { UserId } from '../../../../src/shared/domain/user/object_values/user.id.value_object';
import { Book } from '../../../../src/contexts/books/domain/book.aggregate';
import { BookId } from '../../../../src/contexts/books/domain/object_values/book.id.value_object';
import { BookName } from '../../../../src/contexts/books/domain/object_values/book.name.value_object';
import { BookIdMother } from './book.id.mother';
import { BookNameMother } from './book.name.mother';
import { UserIdMother } from './user.id.mother';

export class BookMother {
  static create(id: BookId, name: BookName, userId: UserId): Book {
    return new Book(id, name, userId);
  }

  static random(userId?: UserId): Book {
    return this.create(
      BookIdMother.random(),
      BookNameMother.random(),
      userId || UserIdMother.random(),
    );
  }
}
