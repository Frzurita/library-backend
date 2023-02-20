import { BookName } from '../../../../src/contexts/books/domain/object_values/book.name.value_object';
import { WordMother } from '../../../shared/domain/word.mother';

export class BookNameMother {
  static create(value: string): BookName {
    return new BookName(value);
  }

  static random(): BookName {
    return this.create(WordMother.random({ maxLength: 20 }));
  }

  static invalidName(): string {
    return 'e'.repeat(256);
  }
}
