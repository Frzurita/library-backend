import { BookId } from '../../../../src/contexts/books/domain/object_values/book.id.value_object';
import { UuidMother } from '../../../shared/domain/uuid.mother';

export class BookIdMother {
  static create(value: string): BookId {
    return new BookId(value);
  }
  static random(): BookId {
    return this.create(UuidMother.random());
  }
}
